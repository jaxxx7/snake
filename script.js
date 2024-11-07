const canvas = document.getElementById("snakeboard");
const score = document.getElementById("score");
const record = document.getElementById("record");
const ctx = canvas.getContext("2d");
const box = 20;
let direction = "RIGHT";
let currentScore = 0;
let currentRecord = 0;
let intervalId;

let snake = [{
    x: 20,
    y: 20,
    color: "green"
}];




let food = {
    x: 20 * Math.floor(Math.random() * 25),
    y: 20 * Math.floor(Math.random() * 25),
    width: 20,
    height: 20,
    color: "red"
};

let head = { x: snake[0].x, y: snake[0].y, color: "green" };


// Dessiner le serpent
const drawSnake = () => {
    snake.forEach(segment => {
        ctx.fillStyle = segment.color;
        ctx.fillRect(segment.x, segment.y, box, box);
    });
    
}

// Dessiner la nourriture
const drawFood = () => {
    ctx.clearRect(0, 0, snake.width, snake.height);
    ctx.fillStyle = food.color;
    ctx.fillRect(food.x, food.y, food.width, food.height);
}


document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowRight' && direction !== 'LEFT') {
        direction = 'RIGHT'
    }
    else if (event.key === 'ArrowLeft' && direction !== 'RIGHT') {
        direction = 'LEFT'
    }
    else if (event.key === 'ArrowUp' && direction !== 'DOWN') {
        direction = 'UP'
    }
    else if (event.key === 'ArrowDown' && direction !== 'UP') {
        direction = 'DOWN'
    }
})

function moveSnake() {
    let head = { x: snake[0].x, y: snake[0].y, color: "green" };

    if (direction === 'RIGHT') {
        head.x += box;
    }
    else if (direction === 'LEFT') {
        head.x -= box;
    }
    else if (direction === 'UP') {
        head.y -= box;
    }
    else if (direction === 'DOWN') {
        head.y += box;
    }

    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        updateScore();
        generateFood();
        updateRecord();
        
    } else {
        snake.pop()
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Effacer le canvas
    drawSnake(); // Dessiner le serpent
    drawFood(); // Dessiner la nourriture
    failed();
}

const updateScore = () => {
    currentScore += 1;
    score.textContent = currentScore
}

const updateRecord = () => {
    if (currentScore > currentRecord) {
        currentRecord = currentScore;
        record.textContent = currentRecord
    }
}

const generateFood = () => {    
    food.x = box * Math.floor(Math.random() * 25);
    food.y = box * Math.floor(Math.random() * 25);
}

function failed() {
    const head = snake[0];
    if (head.x >= canvas.width || head.x < 0 || head.y >= canvas.height || head.y < 0) {
        clearInterval(intervalId);  // Arrêter l'intervalle si le serpent est hors du canevas
        console.log("Jeu terminé : Le serpent est hors des limites !");
    }
}

drawFood(); // Initialisation de la nourriture
drawSnake(); // Initialisation du serpent
intervalId = setInterval(moveSnake, 200);



