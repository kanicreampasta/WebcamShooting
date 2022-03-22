import Janus from './janus.es';
import adapter from './adapter';

const roomName = 1234;

export const videoTags: HTMLVideoElement[] = [];

export function initJanus(): Promise<void> {
    return new Promise(resolve => {
        Janus.init({
            debug: true,
            dependencies: Janus.useDefaultDependencies({
                adapter: adapter
            }),
            callback: function () {
                console.log("initialize done!");
                resolve();
            }
        });
    });
}

export function initiateSession(server: string) {
    const janus = new Janus(
        {
            server: server, //'http://localhost:8088/janus'
            success: function () {
                startVideoRoom(janus);
            },
            error: function (cause: any) {
                console.log('error: cause:', cause);
            },
            destroyed: function () {
                console.log('destroyed gg');
            }
        }
    )
}

const feedStreams: {
    [key: string]: {
        id: any,
        display: string,
        streams: any[]
    }[]
} = {};

const localTracks: any = {};
const remoteTracks: any = {};

function startVideoRoom(janus: Janus) {
    let pHandle: any = null;
    let myid: any = null;
    let mypvtid: any = null;
    let username = "tinax";
    janus.attach({
        plugin: "janus.plugin.videoroom",
        success: function (handle: any) {
            console.log('attach success');
            pHandle = handle;
            joinRoom(pHandle, username, roomName);
        },
        error: function (cause: any) {
            console.log('attach error:', cause);
        },
        consentDialog: function (on: boolean) {
            console.log('consentDialog: ' + on);
        },
        onmessage: function (msg: any, jsep: any) {
            console.log('attach (publisher) onmessage ' + msg + ' ' + jsep);
            const event = msg['videoroom'];
            console.log('event: ' + event);
            if (event) {
                if (event === 'joined') {
                    myid = msg["id"];
                    mypvtid = msg["private_id"];
                    // publish feed
                    publishOwnFeed(pHandle);
                    if (msg["publishers"]) {
                        // new feed to attach to
                        const list = msg["publishers"];
                        console.log('got a list of available pubs/feeds:', list);
                        for (const f in list) {
                            const id = list[f]["id"];
                            const display = list[f]["display"];
                            const streams = list[f]["streams"];
                            for (const i in streams) {
                                const stream = streams[i];
                                stream["id"] = id;
                                stream["display"] = display;
                            }
                            feedStreams[id] = streams;
                            console.log(`>> [${id}] ${display}:`, streams);
                            newRemoteFeed(janus, id, display, streams, mypvtid);
                        }
                    }
                } else if (event === "destroyed") {
                    console.warn("the room has been destroyed");
                } else if (event === "event") {
                    if (msg["streams"]) {
                        // new info on our streams
                        const streams = msg["streams"];
                        for (const i in streams) {
                            const stream = streams[i];
                            stream["id"] = myid;
                            stream["display"] = username;
                        }
                        feedStreams[myid] = streams;
                    } else if (msg["publishers"]) {
                        const list = msg["publishers"];
                        console.log('got a list of available pubs/feeds:', list);
                        for (const f in list) {
                            const id = list[f]["id"];
                            const display = list[f]["display"];
                            const streams = list[f]["streams"];
                            for (const i in streams) {
                                const stream = streams[i];
                                stream["id"] = id;
                                stream["display"] = display;
                            }
                            feedStreams[id] = streams;
                            console.log(`>> [${id}] ${display}:`, streams);
                            newRemoteFeed(janus, id, display, streams, mypvtid);
                        }
                    } else if (msg["leaving"]) {
                        const leaving = msg["leaving"];
                        console.log('publisher left: ' + leaving);
                    } else if (msg["unpublished"]) {
                        const unpublished = msg["unpublished"];
                        console.log('publisher left: ' + unpublished);
                        if (unpublished === 'ok') {
                            // that's us
                            pHandle.hangup();
                            return;
                        }
                    } else if (msg["error"]) {
                        if (msg["error_code"] === 426) {
                            console.warn('no such room');
                        }
                        console.warn(msg["error"]);
                    }
                }
            }
            if (jsep) {
                console.log('handling SDP...', jsep);
                pHandle.handleRemoteJsep({ jsep: jsep });
                const audio = msg["audio_codec"];
                // TODO: check if media has been refused
            }
        },
        webrtcState: function (on: boolean) {
            console.log('webrtcState is ' + on);
        },
        iceState: function (state: any) {
            console.log('iceState changed to ' + state);
        },
        onlocaltrack: function (track: any, added: any) {
            console.log('attach onlocaltrack');
            const trackId = track.id.replace(/[{}]/g, "");
            // local track added or removed
            if (!added) {
                const stream = localTracks[trackId];
                if (stream) {
                    try {
                        const tracks = stream.getTracks();
                        for (const i in tracks) {
                            const mst = tracks[i];
                            if (mst != null) {
                                mst.stop();
                            }
                        }
                    } catch (e) { }
                }
                if (track.kind === 'video') {
                    videoTags[0].srcObject = null;
                }
                delete localTracks[trackId];
            } else {
                const stream = localTracks[trackId];
                if (stream) {
                    // already have
                    return;
                }
                if (track.kind === 'video') {
                    const stream = new MediaStream();
                    stream.addTrack(track.clone());
                    localTracks[trackId] = stream;
                    console.log('created local stream:', stream);
                    console.log(stream.getTracks());
                    console.log(stream.getVideoTracks());
                    videoTags[0].srcObject = stream;
                    videoTags[0].play();
                }
            }
        },
        onremotetrack: function (track: any, mid: any, added: any) {
            console.log('attach onremotetrack');
        },
        oncleanup: function () {
            console.log('attach oncleanup');
            pHandle.detach();
        },
        detached: function () {
            console.log('attach detached');
        }
    })
}

function publishOwnFeed(handle: any) {
    handle.createOffer({
        media: {
            audioRecv: false,
            videoRecv: false,
            audioSend: false,
            videoSend: true
        },
        simulcast: false,
        success: function (jsep: any) {
            console.log('got publisher sdp', jsep);
            const publish = {
                request: 'configure',
                audio: false,
                video: true
            };
            // set codec here if want
            handle.send({
                message: publish,
                jsep: jsep
            });
        },
        error: function (error: any) {
            console.log('WebRTC error:', error);
        }
    });
}

function newRemoteFeed(janus: Janus, id: string, display: string, streams0: any[], mypvtid: any) {
    // a new feed has been published, create a new plugin handle and attach to it as a subscriber
    let streams = streams0;
    let remoteFeed: any = null;
    if (!streams) {
        streams = feedStreams[id];
    }

    janus.attach({
        plugin: "janus.plugin.videoroom",
        success: function (pluginHandle: any) {
            remoteFeed = pluginHandle;
            remoteFeed.remoteTracks = {};
            remoteFeed.remoteVideos = 0;
            remoteFeed.simulcastStarted = false;
            console.log('plugin attached (subscriber) id=' + remoteFeed.getId());

            // streams to subscribe to
            const subscription = [];
            for (const i in streams) {
                const stream = streams[i];
                subscription.push({
                    feed: stream.id,
                    mid: stream.mid
                });
                remoteFeed.rfid = stream.id;
                remoteFeed.rfdisplay = stream.display;
            }
            const subscribe = {
                request: "join",
                ptype: "subscriber",
                room: roomName,
                streams: subscription,
                private_id: mypvtid
            };
            remoteFeed.send({
                message: subscribe
            });
        },
        error: function (error: any) {
            console.log('error attaching plugin (subscriber)', error);
        },
        iceState: function (state: any) {
            console.log(`ICE state (feed ${remoteFeed.rfindex}) changed to ${state}`);
        },
        webrtcState: function (on: boolean) {
            console.log(`Janus says this WebRTC PeerConnection (feed ${remoteFeed.rfindex}) is ${on}`);
        },
        onmessage: function (msg: any, jsep: any) {
            console.log(`got a message (subscriber)`, msg);
            const event = msg["videoroom"];
            console.log('event: ' + event);
            if (msg["error"]) {
                console.warn(msg["error"]);
            } else if (event) {
                if (event === 'attached') {
                    //subscriber created and attached
                    console.log(`successfully attached to feed in room ${msg["room"]}`);
                } else if (event === 'event') {
                    // TODO: simulcast
                } else {
                    // ???
                }
            }
            if (jsep) {
                console.log('handling SDP... (subscriber)', jsep);
                // answer and attach
                remoteFeed.createAnswer({
                    jsep: jsep,
                    media: {
                        audioSend: false,
                        videoSend: false
                    },
                    success: function (jsep: any) {
                        console.log('got SDP', jsep);
                        const body = {
                            request: 'start',
                            room: roomName
                        };
                        remoteFeed.send({
                            message: body,
                            jsep: jsep
                        });
                    },
                    error: function (error: any) {
                        console.log('WebRTC error:', error);
                    }
                })
            }
        },
        onlocaltrack: function (track: any, on: any) {
            // not expected
        },
        onremotetrack: function (track: any, mid: any, on: boolean) {
            console.log(`remote feed ${remoteFeed.rfindex}, remote track (mid=${mid}) added=${on}`);
            if (!on) {
                // track removed, get rid of the stream
                const stream = remoteFeed.remoteTracks[mid];
                if (stream) {
                    // TODO
                }
                return;
            }
            // if we're here, on=true, a new track was added
            if (track.kind === 'audio') {
                // ignore audio track
            } else {
                // video track
                const stream = new MediaStream();
                stream.addTrack(track.clone());
                remoteFeed.remoteTracks[mid] = stream;
                console.log("created remote video stream:", stream);
                // attach stream
                videoTags[1].srcObject = stream;
                videoTags[1].play();
            }
        },
        oncleanup: function () {
            console.log('got a cleanup notification');
            remoteFeed.remoteTracks = {};
            remoteFeed.remoteVideos = 0;
        }
    })
}

/*
function subscribeTo(janus: Janus, sources: any[]) {
    if (remoteFeed) {
        const subscription: any[] = [];
        for (const s in sources) {
            const streams = sources[s];
            for (const i in streams) {
                const stream = streams[i];
                if (stream.disabled) {
                    console.log('disabled stream: ', stream);
                    continue;
                }
                if (subscriptions[stream.id] && subscriptions[stream.id][stream.mid]) {
                    console.log('already subscribed to stream, skipping:', stream);
                    continue;
                }

                subscription.push({
                    feed: stream.id,
                    mid: stream.mid
                });
                if (!subscriptions[stream.id]) {
                    subscriptions[stream.id] = {};
                }
                subscriptions[stream.id][stream.mid] = true;
            }
        }
        if (subscription.length === 0) {
            return;
        }
        remoteFeed.send({
            message: {
                request: 'subscribe',
                streams: subscription
            }
        });
        return;
    }

    if (creatingFeed) {
        setTimeout(function() {
            subscribeTo(sources);
        }, 500);
        return;
    }
    creatingFeed = true;
    janus.attach({
        plugin: 'janus.plugin.videoroom',
        success: function(pluginHandle: any) {
            remoteFeed = pluginHandle;
            
        }
    })
}
*/

function joinRoom(handle: any, username: string, room: number) {
    handle.send({
        message: {
            request: "join",
            room: room,
            ptype: "publisher",
            display: username
        }
    });
}

// export function initAndStart(server: string) {
//     initJanus()
//         .then(() => initiateSession());
// }
