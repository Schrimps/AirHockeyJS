//GETTING THE CANVAS AND CONTEXT
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const playerRadius = 30;

let x = canvas.width / 2;
let y = canvas.height * 0.75;

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawField();
    drawPlayer();
}
function drawPlayer() {
    ctx.beginPath();
    ctx.arc(x, y, playerRadius, 0, 2 * Math.PI, false);
    ctx.fillStyle = "rgba(0, 0, 255, 1)";
    ctx.fill();
    ctx.closePath();
}
function drawField() {
    ctx.beginPath();
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgba(211, 211, 211, 1)";
    ctx.fill();
    ctx.closePath();
    ctx.beginPath();
    ctx.strokeStyle = "rgba(0, 0, 0, 1)";
    ctx.lineWidth = 10;
    ctx.moveTo(0, canvas.height/2);
    ctx.lineTo(canvas.width, canvas.height/2);
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
    ctx.closePath();
    ctx.stroke();
    ctx.beginPath();
    ctx.strokeStyle = "rgba(0, 0, 255, 1)";
    ctx.lineWidth = 15;
    ctx.moveTo(canvas.width/4, canvas.height);
    ctx.lineTo(canvas.width*3/4, canvas.height);
    ctx.closePath();
    ctx.stroke();
}

document.addEventListener("mousemove", mouseMoveHandler);

function mouseMoveHandler(e) {
    if (e.clientX - canvas.offsetLeft > canvas.width - playerRadius) {
        x = canvas.width - playerRadius;
    }
    else if (e.clientX - canvas.offsetLeft < playerRadius) {
        x = playerRadius;
    }
    else {
    x = e.clientX - canvas.offsetLeft;
    }
    
    if (e.clientY - canvas.offsetTop > canvas.height - playerRadius) {
        y = canvas.height - playerRadius;
    }
    else if (e.clientY - canvas.offsetTop < canvas.height/2) {
        y = canvas.height/2;
    }
    else {
        y = e.clientY - canvas.offsetTop;
    }
}

setInterval(draw, 10);