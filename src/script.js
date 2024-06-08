const item = document.getElementById('item');

let fonts = [];
let nextFont = "mono";

let width = window.innerWidth;
let height = window.innerHeight;

let excempt = "";

const motion = {
    x: Math.sign(Math.random() - 0.5),
    y: Math.sign(Math.random() - 0.5)
}

async function init() {
    fonts = await fetch("gfonts.json").then(res => res.json());
}

function loadGFont(font) {
    document.head.innerHTML += `<link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css?family=${font}:wght@400;500;600,800&display=swap">`;
}

function onBounce(origin) {
    if (excempt == origin && origin == "h") return true;

    excempt = origin;

    const font = fonts[Math.floor(Math.random() * fonts.length)];

    item.style.transitionDuration = "0.1s";
    item.style.filter = "blur(8px)";
    item.style.scale = 0.9;

    loadGFont(font);
    nextFont = font;

    setTimeout(() => {
        item.style.fontFamily = nextFont;
        item.style.transitionDuration = "0.5s";
        item.style.scale = 1;
        item.style.filter = "blur(0px)";
    }, 100);
}

item.style.top = height / 2 - item.clientHeight + "px";
item.style.left = width / 2 - item.clientWidth / 2 + "px";

function render() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    if (width < 800) return setTimeout(render, 50);

    const top = parseInt(item.style.top.replace('px', ''));
    const left = parseInt(item.style.left.replace('px', ''));

    item.style.top = top + motion.y + "px";
    item.style.left = left + motion.x + "px";

    if ((top < 0 || top > height - item.clientHeight) && !onBounce("v")) {
        motion.y *= -1;
        item.style.top = Math.min(height - item.clientHeight - motion.y, Math.max(0, top + motion.y)) + "px";
    }

    if ((left < 0 || left > width - item.clientWidth) && !onBounce("h")) {
        motion.x *= -1;
        item.style.left = Math.min(width - item.clientWidth - motion.x, Math.max(0, left + motion.x)) + "px";
    }

    requestAnimationFrame(render);
}

render();

init();