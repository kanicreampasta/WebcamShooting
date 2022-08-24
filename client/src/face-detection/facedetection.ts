export class FaceDetector {
    private worker: Worker;
    private isProcessing: boolean;

    public get isReady() {
        return !this.isProcessing;
    }

    constructor() {
        this.worker = new Worker(new URL('./worker.js', import.meta.url));
        this.worker.onmessage = (e) => {
            if (typeof (e.data) === 'string') {
                console.log('face detection worker is ready');
                this.isProcessing = false;
            } else {
                if (this.onfacedetection !== undefined) {
                    const rects = e.data;
                    if (rects.length > 0) {
                        const rect = rects[0];
                        this.onfacedetection(rect);
                    } else {
                        this.onfacedetection(undefined);
                    }
                } else {
                    console.warn('onfacedetection is not set');
                }
                this.isProcessing = false;
            }
        };
    }

    onfacedetection: (rect?: [number, number, number, number]) => void;

    init() {
        this.isProcessing = true;
        this.worker.postMessage('init');
    }

    processImageIfReady(imageData: ImageData) {
        if (!this.isProcessing) {
            this.worker.postMessage(imageData);
            this.isProcessing = true;
        }
    }

    destroy() {
        if (this.worker !== undefined) {
            this.worker.terminate();
            this.worker = undefined;
        }
    }
}
