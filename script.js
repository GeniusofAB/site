
let clicks = 0;
let multiplier = 1;
let interval = null;

document.getElementById("clicker").addEventListener("click", () => {
    clicks += multiplier;
    updateDisplay();
});

function updateDisplay() {
    document.getElementById("clicks").innerText = clicks;
}

function buyMultiplier() {
    if (clicks >= 100) {
        clicks -= 100;
        multiplier *= 2;
        updateDisplay();
    } else {
        alert("Недостаточно кликов!");
    }
}

function buyAutoClicker() {
    if (clicks >= 500) {
        clicks -= 500;
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

function buyMusic(path) {
    if (clicks >= 200) {
        clicks -= 200;
        updateDisplay();
        const music = document.getElementById("background-music");
        music.src = path;
        music.play();
    } else {
        alert("Недостаточно кликов!");
    }
}
