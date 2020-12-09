function load_img(){}

function init(){
    canvas = document.getElementById("mycanvas");
    W = canvas.width = 700;
    H = canvas.height = 400;

    // To draw on canvas
    pen = canvas.getContext("2d");

    box = {
        x: 150,
        y: 50,
        w: 60,
        h: 60,
        speed : 20
    };
}

function draw(){
    // To erase previous frame
    pen.clearRect(0, 0, W, H);

    pen.fillStyle = "red";
    pen.fillRect(box.x, box.y, box.w, box.h);
}

function update(){
    box.y += box.speed;

    if (( box.y >= (H-box.h) ) || ( box.y < 0 )){
        box.speed *= -1;
    }
}

function gameloop(){
    draw();
    update();
}

load_img();
init();

var f = setInterval(gameloop, 100);