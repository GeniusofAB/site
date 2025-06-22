let clicks = 0;
let multiplier = 1;
let interval = null;
let captchaActive = false;

// Цены
let multiplierPrice = 100;
let autoClickerPrice = 500;
let musicPrice = 200;

// Музыка
const musicTracks = [
    "assets/music/track1.mp3",
    "assets/music/track2.mp3",
    "assets/music/track3.mp3"
];
let currentTrackIndex = 0;

const clicker = document.getElementById("clicker");
const clicksDisplay = document.getElementById("clicks");
const multiplierBtn = document.getElementById("multiplier-btn");
const autoClickerBtn = document.getElementById("autoclicker-btn");
const musicBtn = document.getElementById("music-btn");

const captcha = document.getElementById("fake-captcha");
const captchaBox = document.getElementById("captcha-box");
const captchaCheckbox = document.getElementById("captcha-checkbox");

clicker.addEventListener("click", () => {
    if (captchaActive) return; // Пока капча не пройдена — блокируем кликер

    clicks += multiplier;
    updateDisplay();

    // Каждые 10 кликов показывать капчу
    if (clicks % 10 === 0) {
        showCaptcha();
    }
});

function updateDisplay() {
    clicksDisplay.innerText = clicks;
    multiplierBtn.innerText = `Купить 2x клики (${multiplierPrice} кликов)`;
    autoClickerBtn.innerText = `Купить автокликер на 10 минут (${autoClickerPrice} кликов)`;
    musicBtn.innerText = `Сменить музыку (${musicPrice} кликов)`;
}

function buyMultiplier() {
    if (captchaActive) return;

    if (clicks >= multiplierPrice) {
        clicks -= multiplierPrice;
        multiplier *= 2;
        multiplierPrice *= 2;
        updateDisplay();
    } else {
        alert("Недостаточно кликов!");
    }
}

function buyAutoClicker() {
    if (captchaActive) return;

    if (clicks >= autoClickerPrice) {
        clicks -= autoClickerPrice;
        autoClickerPrice *= 2;
        updateDisplay();
        if (interval) clearInterval(interval);
        interval = setInterval(() => {
            clicks += multiplier;
            updateDisplay();
        }, 1000);
        setTimeout(() => clearInterval(interval), 600000); // 10 минут
    } else {
        alert("Недостаточно кликов!");
    }
}

function buyMusic() {
    if (captchaActive) return;

    if (clicks >= musicPrice) {
        clicks -= musicPrice;
        updateDisplay();

        currentTrackIndex = (currentTrackIndex + 1) % musicTracks.length;
        const music = document.getElementById("background-music");
        music.src = musicTracks[currentTrackIndex];
        music.play();
    } else {
        alert("Недостаточно кликов!");
    }
}

function showCaptcha() {
    captcha.classList.remove("hidden");
    captchaActive = true;

    // Начинаем "убегать" от курсора 10 секунд
    let escapeTime = 10000; // 10 сек
    let startTime = Date.now();

    function moveBox(e) {
        if (Date.now() - startTime > e
