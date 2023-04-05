//Помещаем канвас в логигу игры
const canvas = document.getElementById("GameBase");
//Формат игры 
const ctx = canvas.getContext("2d");
//Помещаем фоновое изображение
const ground = new Image();
ground.src = "img/ground.jpg";
//Поммещаем изображение еды
const foodImg = new Image();
foodImg.src = "img/food.png";
//Ширина и высота квадратика 
let box = 32;
// Счёт 
let score = 0;
// Еда помещаемая на поле
let food = {
    x: Math.floor((Math.random()* 17 + 1)) * box,
    y: Math.floor((Math.random()* 15 + 3)) * box,
};
//Голова змейки, помещенная в центр поля 
let snake = [];
snake[0] = {
    x:9 * box,
    y:10 * box
};
//Обработчик событий 
document.addEventListener("keydown", direction);

let dir;
//Описываем движение при нажатии клавиш с проверкой
function direction(event) {
    if (event.keyCode == 37 && dir != "right")
        dir = "left";
    else if (event.keyCode == 38 && dir != "down")
        dir = "up";
    else if (event.keyCode == 39 && dir != "left")
        dir = "right";
    else if (event.keyCode == 40 && dir != "up")
        dir = "down";
}

//ДЛЯ ДАНИИЛА!!!!!
///Если змея ест сама себя 
function eatTail(head, arr) {
    for (let i = 0; i < arr.length; i++) {
        if(head.x == arr[i].x && head.y == arr[i].y)
            clearInterval(game);
    }
}
// Рисуем игру 
function drawGame() {
    // Рисуем фон
    ctx.drawImage(ground, 0, 0);
    //Рисуем еду
    ctx.drawImage(foodImg, food.x, food.y);
//Рисуем змейку
    for (let i = 0; i<1; i++) {
        ctx.drawImage (Snake, snake[i].x, snake[i].y)
    }
    for (let i = 1; i < snake.length; i++) {
        //Рисуем квадрат
        ctx.fillStyle = i == 0 ? "green" : "red";
        ctx.filRect(snake[i].x, snake[i].y, box, box);
    }
//ДЛЯ ВОЛОДИ
// Рисуем змейку
    for(let i = 0; i < snake.length; i++) {
        //Рисуем квадрат

        ctx.drawImage(headImg, snake[i].x, snake[i].y);
    }
//Ведение счёта 
    ctx.fillStyle = "white";
    ctx.font = "50px Arial";
    ctx.fillText(score, box * 2.5, box * 1.7);
// Рисование змейки 
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;
//Проверяем съела лми змея еду 
    if(snakeX == food.x && snakeY == food.y) {
        score++;
        food = {
            x: Math.floor((Math.random() * 17 + 1)) * box,
            y: Math.floor((Math.random() * 15 + 3)) * box,
        };
    } else {
        //Удаление последнего элемента 
        snake.pop();
    }
//ДЛЯ ДАНИЛАА!!!!!!!!
//Если змея выползает за пределы поля
    if(snakeX < box || snakeY > box * 17
        || snakeY < 3 * box || snakeY > box * 17)
        clearInterval(game);
//Перебираем клавиши 
    if(dir == "left") snakeX -= box;
    if(dir == "right") snakeX += box;
    if(dir == "up") snakeY -= box;
    if(dir == "down") snakeY += box;
//Пермещенная голова змеи
    let newHead = {
        x: snakeX,
        y: snakeY
    };

    eatTail(newHead, snake);

    snake.unshift(newHead);
}
// Вызываем функцию важдые сто милисекунд
let game = setInterval(drawGame, 100);





// body...
