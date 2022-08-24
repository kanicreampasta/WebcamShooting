const blazeface = require('@tensorflow-models/blazeface');
import '@tensorflow/tfjs-backend-cpu';

// Load the model.
let model;

async function initML() {
    model = await blazeface.load();
}

async function predict(imageData) {
    if (model === undefined) {
        console.log('model is undefined');
        return;
    }
    // console.log('foo');
    const returnTensors = false; // Pass in `true` to get tensors back, rather than values.
    const predictions = await model.estimateFaces(imageData, returnTensors);

    let rects = [];
    if (predictions.length > 0) {
        /*
        `predictions` is an array of objects describing each detected face, for example:
     
        [
          {
            topLeft: [232.28, 145.26],
            bottomRight: [449.75, 308.36],
            probability: [0.998],
            landmarks: [
              [295.13, 177.64], // right eye
              [382.32, 175.56], // left eye
              [341.18, 205.03], // nose
              [345.12, 250.61], // mouth
              [252.76, 211.37], // right ear
              [431.20, 204.93] // left ear
            ]
          }
        ]
        */

        for (let i = 0; i < predictions.length; i++) {
            const start = predictions[i].topLeft;
            const end = predictions[i].bottomRight;
            const size = [end[0] - start[0], end[1] - start[1]];

            // Render a rectangle over each detected face.
            rects.push([start[0], start[1], size[0], size[1]]);
        }
    }
    return rects;
}

onmessage = async function (e) {
    if (typeof (e.data) === 'string') {
        switch (e.data) {
            case 'init':
                await initML();
                this.postMessage('ready');
                break;
        }
    } else {
        const rects = await predict(e.data);
        if (rects !== undefined) {
            this.postMessage(rects);
        }
    }
}