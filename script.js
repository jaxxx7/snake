var snake = document.querySelector('.snake')

let left = 0
let top = 0

function move(e) {
    if(e.keyCode == 40) {
        top += 2;
        snake.style.top = (parseInt(top) + "px")
    }
    if (e.keyCode == 39) {
        left += 2
        snake.style.left = (parseInt(left) + "px") 
    }
}  

document.addEventListener('keydown', move)