import Janus from "./janus.es";
import adapter from "./adapter";

const roomName = 1234;
let myStream: MediaStream | null;

export type VideoSetter = (stream: MediaStream | null, pid?: string) => void;
let onvideostream: VideoSetter;
export function setOnVideoStream(
  callback: (stream: MediaStream, pid?: string) => void
) {
  onvideostream = (stream, pid) => {
    if (stream) {
      callback(stream, pid);
    }
  };
}

export function setVideoStream(stream: MediaStream) {
  myStream = stream;
}

import { VIDEO_SERVER as server } from "../network";

let janus: any | null = null;
let sfutest: any | null = null;
let opaqueId = "videoroomtest-" + Janus.randomString(12);

let myroom = 1234; // Demo room
// if (getQueryStringValue("room") !== "")
//   myroom = parseInt(getQueryStringValue("room"));
let myusername: string | null = null;
let myid: string | null = null;
// We use this other ID just to map our subscriptions to us
let mypvtid: any | null = null;

let localTracks: { [key: string]: any } = {},
  localVideos = 0;
let feeds: any[] = [],
  feedStreams: { [key: string]: any } = {};
let bitrateTimer: any[] = [];

export const initializeVideo = function (username: string) {
  myusername = username;
  // Initialize the library (all console debuggers enabled)
  Janus.init({
    debug: "all",
    dependencies: Janus.useDefaultDependencies({
      adapter: adapter,
    }),
    callback: function () {
      // Use a button to start the demo
      (function () {
        if (!Janus.isWebrtcSupported()) {
          console.error("No WebRTC support... ");
          return;
        }
        // Create session
        janus = new Janus({
          server: server,
          // TODO: ice server
          // iceServers: iceServers,
          // Should the Janus API require authentication, you can specify either the API secret or user token here too
          //		token: "mytoken",
          //	or
          //		apisecret: "serversecret",
          success: function () {
            // Attach to VideoRoom plugin
            janus.attach({
              plugin: "janus.plugin.videoroom",
              opaqueId: opaqueId,
              success: function (pluginHandle: any) {
                sfutest = pluginHandle;
                console.log(
                  "Plugin attached! (" +
                    sfutest.getPlugin() +
                    ", id=" +
                    sfutest.getId() +
                    ")"
                );
                console.log("  -- This is a publisher/manager");
                // Prepare the username registration
                registerUsername(myusername!);
              },
              error: function (error: any) {
                console.error("  -- Error attaching plugin...", error);
              },
              consentDialog: function (on: any) {
                console.log(
                  "Consent dialog should be " + (on ? "on" : "off") + " now"
                );
                if (on) {
                  // TODO: consent dialog
                }
              },
              iceState: function (state: any) {
                console.log("ICE state changed to " + state);
              },
              mediaState: function (medium: any, on: any, mid: any) {
                console.log(
                  "Janus " +
                    (on ? "started" : "stopped") +
                    " receiving our " +
                    medium +
                    " (mid=" +
                    mid +
                    ")"
                );
              },
              webrtcState: function (on: any) {
                console.log(
                  "Janus says our WebRTC PeerConnection is " +
                    (on ? "up" : "down") +
                    " now"
                );
                if (!on) return;
                // This controls allows us to override the global room bitrate cap
                sfutest.send({
                  message: { request: "configure", bitrate: 64 },
                });
              },
              slowLink: function (uplink: any, lost: any, mid: any) {
                console.warn(
                  "Janus reports problems " +
                    (uplink ? "sending" : "receiving") +
                    " packets on mid " +
                    mid +
                    " (" +
                    lost +
                    " lost packets)"
                );
              },
              onmessage: function (msg: any, jsep: any) {
                console.log(" ::: Got a message (publisher) :::", msg);
                let event = msg["videoroom"];
                console.log("Event: " + event);
                if (event) {
                  if (event === "joined") {
                    // Publisher/manager created, negotiate WebRTC and attach to existing feeds, if any
                    myid = msg["id"];
                    mypvtid = msg["private_id"];
                    console.log(
                      "Successfully joined room " +
                        msg["room"] +
                        " with ID " +
                        myid
                    );
                    publishOwnFeed(false /* no audio */);
                    // Any new feed to attach to?
                    if (msg["publishers"]) {
                      let list = msg["publishers"];
                      console.log(
                        "Got a list of available publishers/feeds:",
                        list
                      );
                      for (let f in list) {
                        if (list[f]["dummy"]) continue;
                        let id = list[f]["id"];
                        let streams = list[f]["streams"];
                        const display = list[f]["display"];
                        for (let i in streams) {
                          let stream = streams[i];
                          stream["id"] = id;
                          stream["display"] = display;
                        }
                        feedStreams[id] = streams;
                        console.log(
                          "  >> [" + id + "] " + display + ":",
                          streams
                        );
                        newRemoteFeed(id, display, streams);
                      }
                    }
                  } else if (event === "destroyed") {
                    // The room has been destroyed
                    console.warn("The room has been destroyed!");
                  } else if (event === "event") {
                    // Any info on our streams or a new feed to attach to?
                    if (msg["streams"]) {
                      let streams = msg["streams"];
                      for (let i in streams) {
                        let stream = streams[i];
                        stream["id"] = myid;
                        stream["display"] = myusername;
                      }
                      feedStreams[myid!] = streams;
                    } else if (msg["publishers"]) {
                      let list = msg["publishers"];
                      console.log(
                        "Got a list of available publishers/feeds:",
                        list
                      );
                      for (let f in list) {
                        if (list[f]["dummy"]) continue;
                        let id = list[f]["id"];
                        let display = list[f]["display"];
                        let streams = list[f]["streams"];
                        for (let i in streams) {
                          let stream = streams[i];
                          stream["id"] = id;
                          stream["display"] = display;
                        }
                        feedStreams[id] = streams;
                        console.log(
                          "  >> [" + id + "] " + display + ":",
                          streams
                        );
                        newRemoteFeed(id, display, streams);
                      }
                    } else if (msg["leaving"]) {
                      // One of the publishers has gone away?
                      let leaving = msg["leaving"];
                      console.log("Publisher left: " + leaving);
                      let remoteFeed = null;
                      for (let i = 1; i < 6; i++) {
                        if (feeds[i] && feeds[i].rfid == leaving) {
                          remoteFeed = feeds[i];
                          break;
                        }
                      }
                      if (remoteFeed) {
                        console.log(
                          "Feed " +
                            remoteFeed.rfid +
                            " (" +
                            remoteFeed.rfdisplay +
                            ") has left the room, detaching"
                        );
                        feeds[remoteFeed.rfindex] = null;
                        remoteFeed.detach();
                      }
                      delete feedStreams[leaving];
                    } else if (msg["unpublished"]) {
                      // One of the publishers has unpublished?
                      let unpublished = msg["unpublished"];
                      console.log("Publisher left: " + unpublished);
                      if (unpublished === "ok") {
                        // That's us
                        sfutest.hangup();
                        return;
                      }
                      let remoteFeed = null;
                      for (let i = 1; i < 6; i++) {
                        if (feeds[i] && feeds[i].rfid == unpublished) {
                          remoteFeed = feeds[i];
                          break;
                        }
                      }
                      if (remoteFeed) {
                        console.log(
                          "Feed " +
                            remoteFeed.rfid +
                            " (" +
                            remoteFeed.rfdisplay +
                            ") has left the room, detaching"
                        );
                        feeds[remoteFeed.rfindex] = null;
                        remoteFeed.detach();
                      }
                      delete feedStreams[unpublished];
                    } else if (msg["error"]) {
                      if (msg["error_code"] === 426) {
                        // This is a "no such room" error: give a more meaningful description
                        console.error("janus: no such room error");
                      } else {
                        console.error(msg["error"]);
                      }
                    }
                  }
                }
                if (jsep) {
                  console.log("Handling SDP as well...", jsep);
                  sfutest.handleRemoteJsep({ jsep: jsep });
                  // Check if any of the media we wanted to publish has
                  // been rejected (e.g., wrong or unsupported codec)
                  let audio = msg["audio_codec"];
                  if (
                    myStream &&
                    myStream.getAudioTracks() &&
                    myStream.getAudioTracks().length > 0 &&
                    !audio
                  ) {
                    // Audio has been rejected
                    console.warn(
                      "Our audio stream has been rejected, viewers won't hear us"
                    );
                  }
                  let video = msg["video_codec"];
                  if (
                    myStream &&
                    myStream.getVideoTracks() &&
                    myStream.getVideoTracks().length > 0 &&
                    !video
                  ) {
                    // Video has been rejected
                    console.warn(
                      "Our video stream has been rejected, viewers won't see us"
                    );
                    // TODO: Hide the webcam video
                  }
                }
              },
              onlocaltrack: function (track: any, on: any) {
                console.log(
                  "Local track " + (on ? "added" : "removed") + ":",
                  track
                );
                // We use the track ID as name of the element, but it may contain invalid characters
                let trackId = track.id.replace(/[{}]/g, "");
                if (!on) {
                  // Track removed, get rid of the stream and the rendering
                  let stream = localTracks[trackId];
                  if (stream) {
                    try {
                      let tracks = stream.getTracks();
                      for (let i in tracks) {
                        let mst = tracks[i];
                        if (mst !== null && mst !== undefined) mst.stop();
                      }
                    } catch (e) {}
                  }
                  if (track.kind === "video") {
                    // TODO: remove trackId from video list
                    localVideos--;
                  }
                  delete localTracks[trackId];
                  return;
                }
                // If we're here, a new track was added
                let stream = localTracks[trackId];
                if (stream) {
                  // We've been here already
                  return;
                }
                if (track.kind === "audio") {
                  // We ignore local audio tracks, they'd generate echo anyway
                  if (localVideos === 0) {
                    // No video, at least for now: show a placeholder
                  }
                } else {
                  // New video track: create a stream out of it
                  localVideos++;
                  stream = new MediaStream([track]);
                  localTracks[trackId] = stream;
                  console.log("Created local stream:", stream);
                  console.log(stream.getTracks());
                  console.log(stream.getVideoTracks());
                  // TODO: add trackId to video list
                  // local stream なので attach しなくてよい？
                  // (Janus as any).attachMediaStream(
                  //   undefined /* TODO: specify video surface here */,
                  //   stream
                  // );
                }
                // if (
                //   sfutest.webrtcStuff.pc.iceConnectionState !== "completed" &&
                //   sfutest.webrtcStuff.pc.iceConnectionState !== "connected"
                // ) {
                //   $("#videolocal")
                //     .parent()
                //     .parent()
                //     .block({
                //       message: "<b>Publishing...</b>",
                //       css: {
                //         border: "none",
                //         backgroundColor: "transparent",
                //         color: "white",
                //       },
                //     });
                // }
              },
              onremotetrack: function (track: any, mid: any, on: any) {
                // The publisher stream is sendonly, we don't expect anything here
              },
              oncleanup: function () {
                console.log(
                  " ::: Got a cleanup notification: we are unpublished now :::"
                );
                myStream = null;
                delete feedStreams[myid!];
                localTracks = {};
                localVideos = 0;
              },
            });
          },
          error: function (error: any) {
            console.error(error);
          },
          destroyed: function () {
            window.location.reload();
          },
        });
      })();
    },
  });
};

// function checkEnter(field, event) {
//   let theCode = event.keyCode
//     ? event.keyCode
//     : event.which
//     ? event.which
//     : event.charCode;
//   if (theCode == 13) {
//     registerUsername();
//     return false;
//   } else {
//     return true;
//   }
// }

function registerUsername(username: string) {
  let register = {
    request: "join",
    room: myroom,
    ptype: "publisher",
    display: username,
  };
  sfutest.send({ message: register });
}

function publishOwnFeed(useAudio: boolean) {
  // Publish our stream
  // $("#publish").attr("disabled", true).unbind("click");

  // We want sendonly audio and video (uncomment the data track
  // too if you want to publish via datachannels as well)
  let tracks = [];
  if (useAudio) tracks.push({ type: "audio", capture: true, recv: false });
  tracks.push({
    type: "video",
    capture: true,
    recv: false,
    simulcast: /*doSimulcast*/ false,
  });
  //~ tracks.push({ type: 'data' });

  sfutest.createOffer({
    tracks: tracks,
    media: {
      audioRecv: false,
      videoRecv: false,
      audioSend: false,
      videoSend: true,
    },
    stream: myStream,
    customizeSdp: function (jsep: any) {
      // If DTX is enabled, munge the SDP
      // if (doDtx) {
      //   jsep.sdp = jsep.sdp.replace(
      //     "useinbandfec=1",
      //     "useinbandfec=1;usedtx=1"
      //   );
      // }
    },
    success: function (jsep: any) {
      console.log("Got publisher SDP!", jsep);
      let publish = { request: "configure", audio: useAudio, video: true };
      // You can force a specific codec to use when publishing by using the
      // audiocodec and videocodec properties, for instance:
      // 		publish["audiocodec"] = "opus"
      // to force Opus as the audio codec to use, or:
      // 		publish["videocodec"] = "vp9"
      // to force VP9 as the videocodec to use. In both case, though, forcing
      // a codec will only work if: (1) the codec is actually in the SDP (and
      // so the browser supports it), and (2) the codec is in the list of
      // allowed codecs in a room. With respect to the point (2) above,
      // refer to the text in janus.plugin.videoroom.jcfg for more details.
      // We allow people to specify a codec via query string, for demo purposes
      // if (acodec) publish["audiocodec"] = acodec;
      // if (vcodec) publish["videocodec"] = vcodec;
      sfutest.send({ message: publish, jsep: jsep });
    },
    error: function (error: any) {
      console.error("WebRTC error:", error);
      if (useAudio) {
        publishOwnFeed(false);
      } else {
        console.error("WebRTC error... " + error.message);
        // bootbox.alert("WebRTC error... " + error.message);
        // $("#publish")
        //   .removeAttr("disabled")
        //   .click(function () {
        //     publishOwnFeed(true);
        //   });
      }
    },
  });
}

// function toggleMute() {
//   let muted = sfutest.isAudioMuted();
//   Janus.log((muted ? "Unmuting" : "Muting") + " local stream...");
//   if (muted) sfutest.unmuteAudio();
//   else sfutest.muteAudio();
//   muted = sfutest.isAudioMuted();
//   $("#mute").html(muted ? "Unmute" : "Mute");
// }

function unpublishOwnFeed() {
  // Unpublish our stream
  // $("#unpublish").attr("disabled", true).unbind("click");
  let unpublish = { request: "unpublish" };
  sfutest.send({ message: unpublish });
}

function newRemoteFeed(id: any, display: string, streams: any[]) {
  // A new feed has been published, create a new plugin handle and attach to it as a subscriber
  let remoteFeed: any = null;
  if (!streams) streams = feedStreams[id];
  janus.attach({
    plugin: "janus.plugin.videoroom",
    opaqueId: opaqueId,
    success: function (pluginHandle: any) {
      remoteFeed = pluginHandle;
      remoteFeed.remoteTracks = {};
      remoteFeed.remoteVideos = 0;
      remoteFeed.simulcastStarted = false;
      console.log(
        "Plugin attached! (" +
          remoteFeed.getPlugin() +
          ", id=" +
          remoteFeed.getId() +
          ")"
      );
      console.log("  -- This is a subscriber");
      // Prepare the streams to subscribe to, as an array: we have the list of
      // streams the feed is publishing, so we can choose what to pick or skip
      let subscription = [];
      for (let i in streams) {
        let stream = streams[i];
        // If the publisher is VP8/VP9 and this is an older Safari, let's avoid video
        if (
          stream.type === "video" &&
          (Janus as any).webRTCAdapter.browserDetails.browser === "safari" &&
          (stream.codec === "vp9" ||
            (stream.codec === "vp8" && !(Janus as any).safariVp8))
        ) {
          console.warn(
            "Publisher is using " +
              stream.codec.toUpperCase +
              ", but Safari doesn't support it: disabling video stream #" +
              stream.mindex
          );
          continue;
        }
        subscription.push({
          feed: stream.id, // This is mandatory
          mid: stream.mid, // This is optional (all streams, if missing)
        });
        // FIXME Right now, this is always the same feed: in the future, it won't
        remoteFeed.rfid = stream.id;
        // TODO: ?
        // remoteFeed.rfdisplay = escapeXmlTags(stream.display);
      }
      // We wait for the plugin to send us an offer
      let subscribe = {
        request: "join",
        room: myroom,
        ptype: "subscriber",
        streams: subscription,
        // use_msid: use_msid,
        use_msid: false,
        private_id: mypvtid,
      };
      remoteFeed.send({ message: subscribe });
    },
    error: function (error: any) {
      console.error("  -- Error attaching plugin...", error);
    },
    iceState: function (state: any) {
      console.log(
        "ICE state (feed #" + remoteFeed.rfindex + ") changed to " + state
      );
    },
    webrtcState: function (on: any) {
      console.log(
        "Janus says this WebRTC PeerConnection (feed #" +
          remoteFeed.rfindex +
          ") is " +
          (on ? "up" : "down") +
          " now"
      );
    },
    slowLink: function (uplink: any, lost: any, mid: any) {
      console.warn(
        "Janus reports problems " +
          (uplink ? "sending" : "receiving") +
          " packets on mid " +
          mid +
          " (" +
          lost +
          " lost packets)"
      );
    },
    onmessage: function (msg: any, jsep: any) {
      console.log(" ::: Got a message (subscriber) :::", msg);
      let event = msg["videoroom"];
      console.log("Event: " + event);
      if (msg["error"]) {
        console.error(msg["error"]);
      } else if (event) {
        if (event === "attached") {
          // Subscriber created and attached
          for (let i = 1; i < 6; i++) {
            if (!feeds[i]) {
              feeds[i] = remoteFeed;
              remoteFeed.rfindex = i;
              break;
            }
          }
          if (!remoteFeed.spinner) {
            let target = document.getElementById(
              "videoremote" + remoteFeed.rfindex
            );
            // remoteFeed.spinner = new Spinner({ top: 100 }).spin(target);
          } else {
            // remoteFeed.spinner.spin();
          }
          console.log("Successfully attached to feed in room " + msg["room"]);
          // $("#remote" + remoteFeed.rfindex)
          //   .removeClass("hide")
          //   .html(remoteFeed.rfdisplay)
          //   .show();
        } else if (event === "event") {
          // Check if we got a simulcast-related event from this publisher
          let substream = msg["substream"];
          let temporal = msg["temporal"];
          if (
            (substream !== null && substream !== undefined) ||
            (temporal !== null && temporal !== undefined)
          ) {
            if (!remoteFeed.simulcastStarted) {
              remoteFeed.simulcastStarted = true;
              // Add some new buttons
              // addSimulcastButtons(remoteFeed.rfindex, true);
            }
            // We just received notice that there's been a switch, update the buttons
            // updateSimulcastButtons(remoteFeed.rfindex, substream, temporal);
          }
        } else {
          // What has just happened?
        }
      }
      if (jsep) {
        console.log("Handling SDP as well...", jsep);
        let stereo = jsep.sdp.indexOf("stereo=1") !== -1;
        // Answer and attach
        remoteFeed.createAnswer({
          jsep: jsep,
          // We only specify data channels here, as this way in
          // case they were offered we'll enable them. Since we
          // don't mention audio or video tracks, we autoaccept them
          // as recvonly (since we won't capture anything ourselves)
          tracks: [{ type: "data" }],
          customizeSdp: function (jsep: any) {
            if (stereo && jsep.sdp.indexOf("stereo=1") == -1) {
              // Make sure that our offer contains stereo too
              jsep.sdp = jsep.sdp.replace(
                "useinbandfec=1",
                "useinbandfec=1;stereo=1"
              );
            }
          },
          success: function (jsep: any) {
            console.log("Got SDP!", jsep);
            let body = { request: "start", room: myroom };
            remoteFeed.send({ message: body, jsep: jsep });
          },
          error: function (error: any) {
            console.error("WebRTC error:", error);
          },
        });
      }
    },
    onlocaltrack: function (track: any, on: any) {
      // The subscriber stream is recvonly, we don't expect anything here
    },
    onremotetrack: function (track: any, mid: any, on: any) {
      console.log(
        "Remote feed #" +
          remoteFeed.rfindex +
          ", remote track (mid=" +
          mid +
          ") " +
          (on ? "added" : "removed") +
          ":",
        track
      );
      if (!on) {
        // Track removed, get rid of the stream and the rendering
        let stream = remoteFeed.remoteTracks[mid];
        console.log("remote track removed: ", stream);
        if (stream) {
          try {
            let tracks = stream.getTracks();
            for (let i in tracks) {
              let mst = tracks[i];
              if (mst !== null && mst !== undefined) mst.stop();
            }
          } catch (e) {}
        }
        // $("#remotevideo" + remoteFeed.rfindex + "-" + mid).remove();
        if (track.kind === "video") {
          remoteFeed.remoteVideos--;
          if (remoteFeed.remoteVideos === 0) {
            // No video, at least for now: show a placeholder
            // if (
            //   $("#videoremote" + remoteFeed.rfindex + " .no-video-container")
            //     .length === 0
            // ) {
            //   $("#videoremote" + remoteFeed.rfindex).append(
            //     '<div class="no-video-container">' +
            //       '<i class="fa fa-video-camera fa-5 no-video-icon"></i>' +
            //       '<span class="no-video-text">No remote video available</span>' +
            //       "</div>"
            //   );
            // }
          }
        }
        delete remoteFeed.remoteTracks[mid];
        return;
      }
      // If we're here, a new track was added
      // if (remoteFeed.spinner) {
      //   remoteFeed.spinner.stop();
      //   remoteFeed.spinner = null;
      // }
      // if ($("#remotevideo" + remoteFeed.rfindex + "-" + mid).length > 0) return;
      if (track.kind === "audio") {
        // New audio track: create a stream out of it, and use a hidden <audio> element
        const stream = new MediaStream([track]);
        remoteFeed.remoteTracks[mid] = stream;
        console.log("Created remote audio stream:", stream);
        // $("#videoremote" + remoteFeed.rfindex).append(
        //   '<audio class="hide" id="remotevideo' +
        //     remoteFeed.rfindex +
        //     "-" +
        //     mid +
        //     '" autoplay playsinline/>'
        // );
        // (Janus as any).attachMediaStream(asssss
        //   // TODO: specify audio speaker here
        //   //  $("#remotevideo" + remoteFeed.rfindex + "-" + mid).get(0)
        //   undefined,
        //   stream
        // );
        if (remoteFeed.remoteVideos === 0) {
          // No video, at least for now: show a placeholder
          // if (
          //   $("#videoremote" + remoteFeed.rfindex + " .no-video-container")
          //     .length === 0
          // ) {
          //   $("#videoremote" + remoteFeed.rfindex).append(
          //     '<div class="no-video-container">' +
          //       '<i class="fa fa-video-camera fa-5 no-video-icon"></i>' +
          //       '<span class="no-video-text">No remote video available</span>' +
          //       "</div>"
          //   );
          // }
        }
      } else {
        // New video track: create a stream out of it
        remoteFeed.remoteVideos++;
        // $(
        //   "#videoremote" + remoteFeed.rfindex + " .no-video-container"
        // ).remove();
        const stream = new MediaStream([track]);
        remoteFeed.remoteTracks[mid] = stream;
        console.log("Created remote video stream:", stream);
        // $("#videoremote" + remoteFeed.rfindex).append(
        //   '<video class="rounded centered" id="remotevideo' +
        //     remoteFeed.rfindex +
        //     "-" +
        //     mid +
        //     '" width=100% autoplay playsinline/>'
        // );
        // $("#videoremote" + remoteFeed.rfindex).append(
        //   '<span class="label label-primary hide" id="curres' +
        //     remoteFeed.rfindex +
        //     '" style="position: absolute; bottom: 0px; left: 0px; margin: 15px;"></span>' +
        //     '<span class="label label-info hide" id="curbitrate' +
        //     remoteFeed.rfindex +
        //     '" style="position: absolute; bottom: 0px; right: 0px; margin: 15px;"></span>'
        // );
        // specify video surface here
        onvideostream(stream, display);
        // Note: we'll need this for additional videos too
        if (!bitrateTimer[remoteFeed.rfindex]) {
          // $("#curbitrate" + remoteFeed.rfindex)
          //   .removeClass("hide")
          //   .show();
          // bitrateTimer[remoteFeed.rfindex] = setInterval(function () {
          //   if (!$("#videoremote" + remoteFeed.rfindex + " video").get(0))
          //     return;
          //   // Display updated bitrate, if supported
          //   let bitrate = remoteFeed.getBitrate();
          //   $("#curbitrate" + remoteFeed.rfindex).text(bitrate);
          //   // Check if the resolution changed too
          //   let width = $("#videoremote" + remoteFeed.rfindex + " video").get(0)
          //     .videoWidth;
          //   let height = $("#videoremote" + remoteFeed.rfindex + " video").get(
          //     0
          //   ).videoHeight;
          //   if (width > 0 && height > 0)
          //     $("#curres" + remoteFeed.rfindex)
          //       .removeClass("hide")
          //       .text(width + "x" + height)
          //       .show();
          // }, 1000);
        }
      }
    },
    oncleanup: function () {
      console.log(
        " ::: Got a cleanup notification (remote feed " + id + ") :::"
      );
      // if (remoteFeed.spinner) remoteFeed.spinner.stop();
      // remoteFeed.spinner = null;
      // $("#remotevideo" + remoteFeed.rfindex).remove();
      // $("#waitingvideo" + remoteFeed.rfindex).remove();
      // $("#novideo" + remoteFeed.rfindex).remove();
      // $("#curbitrate" + remoteFeed.rfindex).remove();
      // $("#curres" + remoteFeed.rfindex).remove();
      if (bitrateTimer[remoteFeed.rfindex])
        clearInterval(bitrateTimer[remoteFeed.rfindex]);
      bitrateTimer[remoteFeed.rfindex] = null;
      remoteFeed.simulcastStarted = false;
      // $("#simulcast" + remoteFeed.rfindex).remove();
      remoteFeed.remoteTracks = {};
      remoteFeed.remoteVideos = 0;
    },
  });
}

// Helper to parse query string
// function getQueryStringValue(name) {
//   name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
//   let regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
//     results = regex.exec(location.search);
//   return results === null
//     ? ""
//     : decodeURIComponent(results[1].replace(/\+/g, " "));
// }

// Helper to escape XML tags
// function escapeXmlTags(value) {
//   if (value) {
//     let escapedValue = value.replace(new RegExp("<", "g"), "&lt");
//     escapedValue = escapedValue.replace(new RegExp(">", "g"), "&gt");
//     return escapedValue;
//   }
// }

// Helpers to create Simulcast-related UI, if enabled
// function addSimulcastButtons(feed, temporal) {
//   let index = feed;
//   $("#remote" + index)
//     .parent()
//     .append(
//       '<div id="simulcast' +
//         index +
//         '" class="btn-group-vertical btn-group-vertical-xs pull-right">' +
//         '	<div class"row">' +
//         '		<div class="btn-group btn-group-xs" style="width: 100%">' +
//         '			<button id="sl' +
//         index +
//         '-2" type="button" class="btn btn-primary" data-toggle="tooltip" title="Switch to higher quality" style="width: 33%">SL 2</button>' +
//         '			<button id="sl' +
//         index +
//         '-1" type="button" class="btn btn-primary" data-toggle="tooltip" title="Switch to normal quality" style="width: 33%">SL 1</button>' +
//         '			<button id="sl' +
//         index +
//         '-0" type="button" class="btn btn-primary" data-toggle="tooltip" title="Switch to lower quality" style="width: 34%">SL 0</button>' +
//         "		</div>" +
//         "	</div>" +
//         '	<div class"row">' +
//         '		<div class="btn-group btn-group-xs hide" style="width: 100%">' +
//         '			<button id="tl' +
//         index +
//         '-2" type="button" class="btn btn-primary" data-toggle="tooltip" title="Cap to temporal layer 2" style="width: 34%">TL 2</button>' +
//         '			<button id="tl' +
//         index +
//         '-1" type="button" class="btn btn-primary" data-toggle="tooltip" title="Cap to temporal layer 1" style="width: 33%">TL 1</button>' +
//         '			<button id="tl' +
//         index +
//         '-0" type="button" class="btn btn-primary" data-toggle="tooltip" title="Cap to temporal layer 0" style="width: 33%">TL 0</button>' +
//         "		</div>" +
//         "	</div>" +
//         "</div>"
//     );
//   if (Janus.webRTCAdapter.browserDetails.browser !== "firefox") {
//     // Chromium-based browsers only have two temporal layers
//     $("#tl" + index + "-2").remove();
//     $("#tl" + index + "-1").css("width", "50%");
//     $("#tl" + index + "-0").css("width", "50%");
//   }
//   // Enable the simulcast selection buttons
//   $("#sl" + index + "-0")
//     .removeClass("btn-primary btn-success")
//     .addClass("btn-primary")
//     .unbind("click")
//     .click(function () {
//       toastr.info(
//         "Switching simulcast substream, wait for it... (lower quality)",
//         null,
//         { timeOut: 2000 }
//       );
//       if (!$("#sl" + index + "-2").hasClass("btn-success"))
//         $("#sl" + index + "-2")
//           .removeClass("btn-primary btn-info")
//           .addClass("btn-primary");
//       if (!$("#sl" + index + "-1").hasClass("btn-success"))
//         $("#sl" + index + "-1")
//           .removeClass("btn-primary btn-info")
//           .addClass("btn-primary");
//       $("#sl" + index + "-0")
//         .removeClass("btn-primary btn-info btn-success")
//         .addClass("btn-info");
//       feeds[index].send({ message: { request: "configure", substream: 0 } });
//     });
//   $("#sl" + index + "-1")
//     .removeClass("btn-primary btn-success")
//     .addClass("btn-primary")
//     .unbind("click")
//     .click(function () {
//       toastr.info(
//         "Switching simulcast substream, wait for it... (normal quality)",
//         null,
//         { timeOut: 2000 }
//       );
//       if (!$("#sl" + index + "-2").hasClass("btn-success"))
//         $("#sl" + index + "-2")
//           .removeClass("btn-primary btn-info")
//           .addClass("btn-primary");
//       $("#sl" + index + "-1")
//         .removeClass("btn-primary btn-info btn-success")
//         .addClass("btn-info");
//       if (!$("#sl" + index + "-0").hasClass("btn-success"))
//         $("#sl" + index + "-0")
//           .removeClass("btn-primary btn-info")
//           .addClass("btn-primary");
//       feeds[index].send({ message: { request: "configure", substream: 1 } });
//     });
//   $("#sl" + index + "-2")
//     .removeClass("btn-primary btn-success")
//     .addClass("btn-primary")
//     .unbind("click")
//     .click(function () {
//       toastr.info(
//         "Switching simulcast substream, wait for it... (higher quality)",
//         null,
//         { timeOut: 2000 }
//       );
//       $("#sl" + index + "-2")
//         .removeClass("btn-primary btn-info btn-success")
//         .addClass("btn-info");
//       if (!$("#sl" + index + "-1").hasClass("btn-success"))
//         $("#sl" + index + "-1")
//           .removeClass("btn-primary btn-info")
//           .addClass("btn-primary");
//       if (!$("#sl" + index + "-0").hasClass("btn-success"))
//         $("#sl" + index + "-0")
//           .removeClass("btn-primary btn-info")
//           .addClass("btn-primary");
//       feeds[index].send({ message: { request: "configure", substream: 2 } });
//     });
//   if (!temporal)
//     // No temporal layer support
//     return;
//   $("#tl" + index + "-0")
//     .parent()
//     .removeClass("hide");
//   $("#tl" + index + "-0")
//     .removeClass("btn-primary btn-success")
//     .addClass("btn-primary")
//     .unbind("click")
//     .click(function () {
//       toastr.info(
//         "Capping simulcast temporal layer, wait for it... (lowest FPS)",
//         null,
//         { timeOut: 2000 }
//       );
//       if (!$("#tl" + index + "-2").hasClass("btn-success"))
//         $("#tl" + index + "-2")
//           .removeClass("btn-primary btn-info")
//           .addClass("btn-primary");
//       if (!$("#tl" + index + "-1").hasClass("btn-success"))
//         $("#tl" + index + "-1")
//           .removeClass("btn-primary btn-info")
//           .addClass("btn-primary");
//       $("#tl" + index + "-0")
//         .removeClass("btn-primary btn-info btn-success")
//         .addClass("btn-info");
//       feeds[index].send({ message: { request: "configure", temporal: 0 } });
//     });
//   $("#tl" + index + "-1")
//     .removeClass("btn-primary btn-success")
//     .addClass("btn-primary")
//     .unbind("click")
//     .click(function () {
//       toastr.info(
//         "Capping simulcast temporal layer, wait for it... (medium FPS)",
//         null,
//         { timeOut: 2000 }
//       );
//       if (!$("#tl" + index + "-2").hasClass("btn-success"))
//         $("#tl" + index + "-2")
//           .removeClass("btn-primary btn-info")
//           .addClass("btn-primary");
//       $("#tl" + index + "-1")
//         .removeClass("btn-primary btn-info")
//         .addClass("btn-info");
//       if (!$("#tl" + index + "-0").hasClass("btn-success"))
//         $("#tl" + index + "-0")
//           .removeClass("btn-primary btn-info")
//           .addClass("btn-primary");
//       feeds[index].send({ message: { request: "configure", temporal: 1 } });
//     });
//   $("#tl" + index + "-2")
//     .removeClass("btn-primary btn-success")
//     .addClass("btn-primary")
//     .unbind("click")
//     .click(function () {
//       toastr.info(
//         "Capping simulcast temporal layer, wait for it... (highest FPS)",
//         null,
//         { timeOut: 2000 }
//       );
//       $("#tl" + index + "-2")
//         .removeClass("btn-primary btn-info btn-success")
//         .addClass("btn-info");
//       if (!$("#tl" + index + "-1").hasClass("btn-success"))
//         $("#tl" + index + "-1")
//           .removeClass("btn-primary btn-info")
//           .addClass("btn-primary");
//       if (!$("#tl" + index + "-0").hasClass("btn-success"))
//         $("#tl" + index + "-0")
//           .removeClass("btn-primary btn-info")
//           .addClass("btn-primary");
//       feeds[index].send({ message: { request: "configure", temporal: 2 } });
//     });
// }

// function updateSimulcastButtons(feed, substream, temporal) {
//   // Check the substream
//   let index = feed;
//   if (substream === 0) {
//     toastr.success("Switched simulcast substream! (lower quality)", null, {
//       timeOut: 2000,
//     });
//     $("#sl" + index + "-2")
//       .removeClass("btn-primary btn-success")
//       .addClass("btn-primary");
//     $("#sl" + index + "-1")
//       .removeClass("btn-primary btn-success")
//       .addClass("btn-primary");
//     $("#sl" + index + "-0")
//       .removeClass("btn-primary btn-info btn-success")
//       .addClass("btn-success");
//   } else if (substream === 1) {
//     toastr.success("Switched simulcast substream! (normal quality)", null, {
//       timeOut: 2000,
//     });
//     $("#sl" + index + "-2")
//       .removeClass("btn-primary btn-success")
//       .addClass("btn-primary");
//     $("#sl" + index + "-1")
//       .removeClass("btn-primary btn-info btn-success")
//       .addClass("btn-success");
//     $("#sl" + index + "-0")
//       .removeClass("btn-primary btn-success")
//       .addClass("btn-primary");
//   } else if (substream === 2) {
//     toastr.success("Switched simulcast substream! (higher quality)", null, {
//       timeOut: 2000,
//     });
//     $("#sl" + index + "-2")
//       .removeClass("btn-primary btn-info btn-success")
//       .addClass("btn-success");
//     $("#sl" + index + "-1")
//       .removeClass("btn-primary btn-success")
//       .addClass("btn-primary");
//     $("#sl" + index + "-0")
//       .removeClass("btn-primary btn-success")
//       .addClass("btn-primary");
//   }
//   // Check the temporal layer
//   if (temporal === 0) {
//     toastr.success("Capped simulcast temporal layer! (lowest FPS)", null, {
//       timeOut: 2000,
//     });
//     $("#tl" + index + "-2")
//       .removeClass("btn-primary btn-success")
//       .addClass("btn-primary");
//     $("#tl" + index + "-1")
//       .removeClass("btn-primary btn-success")
//       .addClass("btn-primary");
//     $("#tl" + index + "-0")
//       .removeClass("btn-primary btn-info btn-success")
//       .addClass("btn-success");
//   } else if (temporal === 1) {
//     toastr.success("Capped simulcast temporal layer! (medium FPS)", null, {
//       timeOut: 2000,
//     });
//     $("#tl" + index + "-2")
//       .removeClass("btn-primary btn-success")
//       .addClass("btn-primary");
//     $("#tl" + index + "-1")
//       .removeClass("btn-primary btn-info btn-success")
//       .addClass("btn-success");
//     $("#tl" + index + "-0")
//       .removeClass("btn-primary btn-success")
//       .addClass("btn-primary");
//   } else if (temporal === 2) {
//     toastr.success("Capped simulcast temporal layer! (highest FPS)", null, {
//       timeOut: 2000,
//     });
//     $("#tl" + index + "-2")
//       .removeClass("btn-primary btn-info btn-success")
//       .addClass("btn-success");
//     $("#tl" + index + "-1")
//       .removeClass("btn-primary btn-success")
//       .addClass("btn-primary");
//     $("#tl" + index + "-0")
//       .removeClass("btn-primary btn-success")
//       .addClass("btn-primary");
//   }
// }
