const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const endGame = document.querySelector(".Game-Over");
const bird = new Image();
const bg = new Image();
const PipesTop = new Image();
const PipesButton = new Image();
const logo = new Image();
const scores = new Image();
const Spreed = -9;

bird.src = "img/bird.png";
logo.src = "img/logo.png";
bg.src = "img/menu.png";
PipesTop.src = "img/pipeTop.png";
PipesButton.src = "img/pipeButton.png";
scores.src = "img/score.png";

let birdX = 50;
let birdY = 50;
let birdVelocity = 0;
let birdAccelaration = 0.48;
let gap = 260;
let score = 0;
let gameStarted = false;

canvas.style.display = "none";
const menu = document.querySelector(".menue");
menu.style.display = "block";
endGame.style.visibility = "hidden";

document.body.addEventListener("keydown", (e) => {
    e.stopPropagation();
    if (e.code === "Space") {
        birdVelocity = Spreed;
    }
});

document.querySelector(".restart").addEventListener("click", () => {
    endGame.classList.remove("Game-Over_open");
    endGame.style.visibility = "hidden"
    restart();
});

document.querySelector('.BactToMenu').addEventListener('click', () => {
    endGame.classList.remove('Game-Over_open');
    endGame.style.visibility = "hidden";
    const menu = document.querySelector('.menue');
    menu.style.display = "block";
    canvas.style.display = "none";
    gameStarted = false;
});

function restart() {
    birdVelocity = 0;
    birdX = 50;
    birdY = 50;
    birdVelocity = 0;
    pipes = [];
    pipes.push({
        x: canvas.width,
        y: 0,
    });
    score = 0;
    draw();
}

let pipes = [];
document.getElementById("Start").addEventListener("click", () => {
    const menu = document.querySelector('.menue');
    menu.style.display = "none";
    canvas.style.display = "block";
    gameStarted = true;
    endGame.style.visibility = "hidden";
    restart();
});

function GameOver(score) {
    endGame.style.visibility = "visible";
    if (gameStarted) {
        endGame.classList.add('Game-Over_open');
        const scoreElement = document.querySelector('.scope');
        scoreElement.textContent = "Score: " + score;
    } else {
        endGame.classList.remove('Game-Over_open');
    }
}

const scoreWidth = 170;
const scoreX = (canvas.width - scoreWidth) / 2;

function draw() {
    if (gameStarted) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(bird, birdX, birdY);
        for (let i = 0; i < pipes.length; i++) {
            ctx.drawImage(PipesTop, pipes[i].x, pipes[i].y);
            ctx.drawImage(PipesButton, pipes[i].x, pipes[i].y + PipesTop.height + gap);
            pipes[i].x--;

            if (pipes[i].x === 125) {
                pipes.push({
                    x: canvas.width,
                    y: Math.floor(Math.random() * PipesTop.height - PipesTop.height),
                });
            }
            if (
                birdX + bird.width >= pipes[i].x &&
                birdX <= pipes[i].x + PipesTop.width &&
                (birdY <= pipes[i].y + PipesTop.height ||
                    birdY + bird.height >= pipes[i].y + PipesTop.height + gap)
            ) {
                GameOver(score);
                return true;
            }
            if (birdY < 0 || birdY + bird.height > canvas.height) {
                GameOver(score);
                return true;
            }
            if (pipes[i].x === 5) {
                score++;
            }
        }
        ctx.drawImage(scores, scoreX - 35, 10, scoreWidth, 40);
        ctx.fillStyle = "orange";
        ctx.fillStyle = "white";
        ctx.font = "20px Arial";
        const text = +score;
        const textWidth = ctx.measureText(text).width;
        const textX = scoreX + (scoreWidth - textWidth) / 2;
        ctx.fillText(text, textX, 35);
        birdVelocity += birdAccelaration;
        birdY += birdVelocity;
    }
    requestAnimationFrame(draw);
}