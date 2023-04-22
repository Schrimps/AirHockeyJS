//GETTING THE CANVAS AND CONTEXT
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const player = {x: canvas.width / 2, y:canvas.height * 0.75, radius: 30, pastX: 0, pastY: 0, mass: 100};
const ball = {x: canvas.width/2, y:canvas.height/2, radius: 20, velocityX: 0, velocityY: 0, mass: 100};
const maxSpeed = 60;


function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    collistionDetection(ball, player);
    drawField();
    drawBall();
    drawPlayer();
}
function drawPlayer() {
    ctx.beginPath();
    ctx.arc(player.x, player.y, player.radius, 0, 2 * Math.PI, false);
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
function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = "rgba(255, 255, 255, 1)";
    ctx.fill();
    ctx.closePath();
}

document.addEventListener("mousemove", mouseMoveHandler);

function mouseMoveHandler(e) {
    player.pastX = player.x;
    player.pastY = player.y;
    if (e.clientX - canvas.offsetLeft > canvas.width - player.radius) {
        player.x = canvas.width - player.radius;
    }
    else if (e.clientX - canvas.offsetLeft < player.radius) {
        player.x = player.radius;
    }
    else {
        player.x = e.clientX - canvas.offsetLeft;
    }
    
    if (e.clientY - canvas.offsetTop > canvas.height - player.radius) {
        player.y = canvas.height - player.radius;
    }
    else if (e.clientY - canvas.offsetTop < canvas.height/2) {
        player.y = canvas.height/2;
    }
    else {
        player.y = e.clientY - canvas.offsetTop;
    }
}

function distance(obj1, obj2) {
    var dx = obj1.x - obj2.x;
    var dy = obj1.y - obj2.y;
    return Math.sqrt(dx * dx + dy * dy);
}

function collistionDetection(ball, controller) {
    var distance_ = Math.sqrt(Math.pow((ball.x + ball.velocityX) - (controller.x + (controller.x - controller.pastX)), 2) + Math.pow((ball.y + ball.velocityY) - (controller.y + (controller.y - controller.pastY)), 2));
    var addedRadius = controller.radius + ball.radius;

    if(distance_ < addedRadius) {
        var normalX = controller.x - ball.x;
        var normalY = controller.y - ball.y;
        var normalLength = Math.sqrt(normalX * normalX + normalY * normalY);
        normalX /= normalLength;
        normalY /= normalLength;

        var ballVelocityNormal = ball.velocityX * normalX + ball.velocityY * normalY;
        var ballVelocityTangent = ball.velocityX * -normalY + ball.velocityY * normalX;

        var controllerVelocityNormal = (controller.x - controller.pastX) * normalX + (controller.y - controller.pastY) * normalY;

        var ballVelocityNormalAfter = (ballVelocityNormal * (ball.mass - controller.mass) + 2 * controller.mass * controllerVelocityNormal) / (ball.mass + controller.mass);
        var ballVelocityNormalChange = ballVelocityNormalAfter - ballVelocityNormal;

        ball.velocityX += ballVelocityNormalChange * normalX;
        ball.velocityY += ballVelocityNormalChange * normalY;
        ball.velocityX += ballVelocityTangent;
        ball.velocityY += -ballVelocityTangent;
        console.log(ball.velocityX, ball.velocityY);
    }

    if(ball.x + ball.velocityX - ball.radius < 0 || ball.x + ball.velocityX + ball.radius > canvas.width) {
        ball.velocityX = -ball.velocityX * 0.95;
    }
    if(ball.y + ball.velocityY - ball.radius < 0 || ball.y + ball.velocityY + ball.radius > canvas.height) {
        ball.velocityY = -ball.velocityY * 0.95;
    }
    ball.velocityX *= 0.99;
    ball.velocityY *= 0.99;
    if(Math.abs(ball.velocityX) > maxSpeed) {
        ball.velocityX = ball.velocityX >= 0 ? maxSpeed : -maxSpeed;
    }
    if(Math.abs(ball.velocityY) > maxSpeed) {
        ball.velocityY = ball.velocityY >= 0 ? maxSpeed : -maxSpeed;
    }
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;
}


const interval = setInterval(draw, 10);