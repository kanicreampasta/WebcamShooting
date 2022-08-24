export class AudioManager {
  private audioContext: AudioContext;
  private sounds: Map<string, AudioBuffer>;
  constructor() {
    const AudioContext =
      window.AudioContext || (window as any).webkitAudioContext;
    this.audioContext = new AudioContext();
    this.sounds = new Map();
  }

  async fetchSound(name: string, url: string) {
    if (this.sounds.has(name)) {
      return;
    }
    const res = await fetch(url);
    const dat = await res.arrayBuffer();
    const buf = await this.audioContext.decodeAudioData(dat);
    this.sounds.set(name, buf);
  }

  playSound(name: string) {
    if (!this.sounds.has(name)) {
      console.warn(`not found: audio ${name}`);
      return;
    }
    const buf = this.sounds.get(name);
    const source = this.audioContext.createBufferSource();
    source.connect(this.audioContext.destination);
    source.buffer = buf!;
    source.start();
  }

  playSound3D(name: string, relativePosition: [number, number, number]) {
    if (!this.sounds.has(name)) {
      console.warn(`not found: audio ${name}`);
      return;
    }
    const buf = this.sounds.get(name);
    const source = this.audioContext.createBufferSource();

    const panner = this.audioContext.createPanner();
    panner.coneInnerAngle = 360;
    panner.positionX.value = relativePosition[0];
    panner.positionY.value = relativePosition[1];
    panner.positionZ.value = relativePosition[2];
    panner.rolloffFactor = 0.15;

    source.connect(panner);
    panner.connect(this.audioContext.destination);
    source.buffer = buf!;
    source.start();
  }
}
