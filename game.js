var BLOCK_SIZE = 20;
var COLS = 40;
var ROWS = 30;
var snakes = [];
var c = null;
var toGo = 3;
var snakecount = 4;
var interval = null;
var foodX = 0;
var foodY = 0;
var oMark = null;
var speed = 150;

function draw() {
    c.clearRect(0, 0, BLOCK_SIZE * COLS, BLOCK_SIZE * ROWS);
    for (var i = 1; i <= ROWS; i++) {
        c.beginPath();
        c.moveTo(0, i * BLOCK_SIZE);
        c.lineTo(BLOCK_SIZE * COLS, i * BLOCK_SIZE);
        c.strokeStyle = "gray";
        c.stroke();
    }
    for (var i = 1; i <= COLS; i++) {
        c.beginPath();
        c.moveTo(i * BLOCK_SIZE, 0);
        c.lineTo(i * BLOCK_SIZE, BLOCK_SIZE * ROWS);
        c.stroke();
    }
    for (var i = 0; i < snakes.length - 1; i++) {
        c.beginPath();
        c.fillStyle = "green";
        c.fillRect(snakes[i].x, snakes[i].y, BLOCK_SIZE, BLOCK_SIZE);
        c.moveTo(snakes[i].x, snakes[i].y);
        c.lineTo(snakes[i].x + BLOCK_SIZE, snakes[i].y);
        c.lineTo(snakes[i].x + BLOCK_SIZE, snakes[i].y + BLOCK_SIZE);
        c.lineTo(snakes[i].x, snakes[i].y + BLOCK_SIZE);
        c.closePath();
        c.strokeStyle = "white";
        c.stroke();
    }
    c.beginPath();
    c.fillStyle = "blue";
    c.fillRect(snakes[snakes.length - 1].x, snakes[snakes.length - 1].y, BLOCK_SIZE, BLOCK_SIZE);
    c.moveTo(snakes[snakes.length - 1].x, snakes[snakes.length - 1].y);
    c.lineTo(snakes[snakes.length - 1].x + BLOCK_SIZE, snakes[snakes.length - 1].y);
    c.lineTo(snakes[snakes.length - 1].x + BLOCK_SIZE, snakes[snakes.length - 1].y + BLOCK_SIZE);
    c.lineTo(snakes[snakes.length - 1].x, snakes[snakes.length - 1].y + BLOCK_SIZE);
    c.closePath();
    c.strokeStyle = "white";
    c.stroke();

    c.beginPath();
    c.fillStyle = "yellow";
    c.fillRect(foodX, foodY, BLOCK_SIZE, BLOCK_SIZE);
    c.moveTo(foodX, foodY);
    c.lineTo(foodX + BLOCK_SIZE, foodY);
    c.lineTo(foodX + BLOCK_SIZE, foodY + BLOCK_SIZE);
    c.lineTo(foodX, foodY + BLOCK_SIZE);
    c.closePath();
    c.strokeStyle = "red";
    c.stroke();
}

function start() {
    for (var i = 0; i < snakecount; i++) {
        snakes[i] = {
            x: i * BLOCK_SIZE,
            y: 0
        };
    }
    addFood();
    draw();
    oMark.innerHTML = 0;
}

function move() {
    switch (toGo) {
        case 1:
            snakes.push({
                x: snakes[snakecount - 1].x - BLOCK_SIZE,
                y: snakes[snakecount - 1].y
            });
            break;
        case 2:
            snakes.push({
                x: snakes[snakecount - 1].x,
                y: snakes[snakecount - 1].y - BLOCK_SIZE
            });
            break;
        case 3:
            snakes.push({
                x: snakes[snakecount - 1].x + BLOCK_SIZE,
                y: snakes[snakecount - 1].y
            });
            break;
        case 4:
            snakes.push({
                x: snakes[snakecount - 1].x,
                y: snakes[snakecount - 1].y + BLOCK_SIZE
            });
            break;
        default:
            ;
    }
    snakes.shift();
    isEat();
    isDie();
    draw();
}

function isEat() {
    if (snakes[snakecount - 1].x == foodX && snakes[snakecount - 1].y == foodY) {
        oMark.innerHTML = (parseInt(oMark.innerHTML) + 1).toString();
        addFood();
        addSnake();
    }
}

function addSnake() {
    snakecount++;
    if (speed >= 500) {
        speed -= 20;
    } else {
        speed = speed * 0.3;
    }
    snakes.unshift({
        x: BLOCK_SIZE * COLS,
        y: BLOCK_SIZE * ROWS
    });
}

function keydown(keyCode) {
    switch (keyCode) {
        case 37:
            if (toGo != 1 && toGo != 3) toGo = 1;
            break;
        case 38:
            if (toGo != 2 && toGo != 4) toGo = 2;
            break;
        case 39:
            if (toGo != 3 && toGo != 1) toGo = 3;
            break;
        case 40:
            if (toGo != 4 && toGo != 2) toGo = 4;
            break;
    }
}

function addFood() {
    var flag;
    var fx, fy;
    while (1) {
        flag = 1;
        fx = Math.floor(Math.random() * (COLS - 1)) * BLOCK_SIZE;
        fy = Math.floor(Math.random() * (ROWS - 1)) * BLOCK_SIZE;
        for (var i = 0; i < snakecount; i++) {
            if (fx == snakes[i].x && fy == snakes[i].y) {
                flag = 0;
                break;
            }
        }
        if (flag) break;
    }
    foodX = fx;
    foodY = fy;
}

function isDie() {
    if (snakes[snakecount - 1].x == -20 || snakes[snakecount - 1].x == BLOCK_SIZE * COLS || snakes[snakecount - 1].y == -20 || snakes[snakecount - 1].y == BLOCK_SIZE * ROWS) {
        alert("Game Over!");
        clearInterval(interval);
        change();
        localStorage.setItem('e',parseInt(oMark.innerHTML));
    }
    for (var i = 0; i < snakecount - 1; i++) {
        if (snakes[snakecount - 1].x == snakes[i].x && snakes[snakecount - 1].y == snakes[i].y) {
            alert("Game Over!");
            clearInterval(interval);
            change();
            localStorage.setItem('e',parseInt(oMark.innerHTML));
        }
    }
}

function change(){  
    localStorage.setItem('a',localStorage.getItem('b'));
    localStorage.setItem('b',localStorage.getItem('c'));
    localStorage.setItem('c',localStorage.getItem('d'));
    localStorage.setItem('d',localStorage.getItem('e'));
}

window.onload = function () {
    c = document.getElementById('canvas').getContext('2d');
    oMark = document.getElementById('mark_con');
    start();
    interval = setInterval(move, speed);
    document.onkeydown = function (event) {
        var event = event || window.event;
        keydown(event.keyCode);
    }
    var myChart = echarts.init(document.getElementById('main'));
                    var option = {
                        title: {
                            text: '记录'
                        },
                        tooltip: {},
                        legend: {
                            data:['分数']
                        },
                        xAxis: {
                            data: ["1","2","3","4","5"]
                        },
                        yAxis: {},
                        series: [{
                            name: '分数',
                            type: 'bar',
                            data: [localStorage.getItem('a'), localStorage.getItem('b'), localStorage.getItem('c'),localStorage.getItem('d'), localStorage.getItem('e')]
                        }]
                    };
                    myChart.setOption(option);
}
