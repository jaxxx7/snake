const canvas = document.getElementById("snakeboard");
let score = document.getElementById("score")
const ctx = canvas.getContext("2d");
const box = 20;
let direction = "RIGHT";
let currentScore = 0;

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
        drawFood();
        
    } else {
        snake.pop()
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Effacer le canvas
    drawSnake(); // Dessiner le serpent
    drawFood(); // Dessiner la nourriture
}

const updateScore = () => {
    currentScore += 1;
    score.textContent = currentScore
}

function generateFood() {
    food.x = box * Math.floor(Math.random() * 25);
    food.y = box * Math.floor(Math.random() * 25);
}

drawFood(); // Initialisation de la nourriture
drawSnake();
setInterval(moveSnake, 200);



