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

import {
  VIDEO_SERVER_SIGNALING_WS as wsServer,
  VIDEO_SERVER_SIGNALING_HTTP as httpServer,
} from "../network";

export const initializeVideo = function (pid: string, stream: MediaStream) {
  const pc = new RTCPeerConnection();
  pc.ontrack = async (event) => {
    console.log("got ontrack event", event);
    if (event.track.kind === "audio") {
      return;
    }

    // TODO: attach remote stream
    const srcObject = event.streams[0];
    const sid = srcObject.id;
    try {
      const ids = await fetch(httpServer + "/ids");
      const idsJson = (await ids.json()) as {
        ids: { sid: string; pid: string }[];
      };
      // find pid of sid
      const pid = idsJson.ids.find(({ sid }) => sid === sid)?.pid;
      if (pid === undefined) {
        console.error("pid not found for sid: sid=" + sid);
      } else {
        onvideostream(srcObject, pid);
      }
    } catch (e) {
      console.error(e);
    }

    event.track.onmute = (event) => {
      console.log("track muted", event);
    };

    event.streams[0].onremovetrack = (ev) => {
      console.log("track removed", ev.track);
    };
  };

  console.log(`my stream id is ${stream.id}`);
  stream.getTracks().forEach((track) => pc.addTrack(track, stream));

  const ws = new WebSocket(wsServer + "/websocket");
  pc.onicecandidate = (e) => {
    if (!e.candidate) {
      return;
    }
    ws.send(
      JSON.stringify({ event: "candidate", data: JSON.stringify(e.candidate) })
    );
  };

  ws.onclose = (evt) => {
    console.log("video server signaling ws closed");
  };

  ws.onmessage = async (evt) => {
    const msg = JSON.parse(evt.data);
    console.log("signaling message", msg);
    if (!msg) {
      console.error("failed to parse msg");
      return;
    }

    switch (msg.event) {
      case "offer":
        const offer = JSON.parse(msg.data);
        if (!offer) {
          console.error("failed to parse offer");
          return;
        }
        await pc.setRemoteDescription(offer);
        const answer = await pc.createAnswer();
        await pc.setLocalDescription(answer);
        ws.send(
          JSON.stringify({ event: "answer", data: JSON.stringify(answer) })
        );
        return;

      case "candidate":
        const candidate = JSON.parse(msg.data);
        if (!candidate) {
          console.error("failed to parse candidate");
          return;
        }
        await pc.addIceCandidate(candidate);
        return;
    }
  };

  ws.onerror = (evt) => {
    console.error("signaling ws error", evt);
  };

  ws.onopen = () => {
    // send my stream id and pid to server
    ws.send(
      JSON.stringify({
        event: "pid",
        pid: pid,
      })
    );
  };
};
