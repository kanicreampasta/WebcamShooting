let respawnCounter: HTMLParagraphElement;
let respawnCounterText: HTMLSpanElement;

window.addEventListener('load', () => {
    respawnCounter = document.querySelector('.respawn-message');
    respawnCounterText = document.querySelector('#respawnCounter');
});

export function showRespawnCounter() {
    respawnCounter.classList.remove('off');
    respawnCounter.classList.add('on');
}

export function hideRespawnCounter() {
    respawnCounter.classList.remove('on');
    respawnCounter.classList.add('off');
}

export function updateRespawnCounter(remMilli: number) {
    respawnCounterText.innerText = (remMilli / 1000).toString();
}