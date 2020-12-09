function load_img(){
    enemy_img = new Image();
    enemy_img.src = "Assets/v2.png";
}

function init(){
    canvas = document.getElementById("mycanvas");
    W = canvas.width = 700;
    H = canvas.height = 400;

    // To draw on canvas
    pen = canvas.getContext("2d");

    e1 = {
		x : 150,
		y : 50,
		w : 60,
		h : 60,
		speed : 20,
	};
	e2 = {
		x : 300,
		y : 150,
		w : 60,
		h : 60,
		speed : 30,
	};
	e3 = {
		x : 450,
		y : 20,
		w : 60,
		h : 60,
		speed : 40,
	};
    
    enemy = [e1,e2,e3];
}

function draw(){
    // To erase previous frame
    pen.clearRect(0, 0, W, H);

    for (var i = 0; i < enemy.length; i++){
        pen.drawImage(enemy_img, enemy[i].x, enemy[i].y, enemy[i].w, enemy[i].h);
    }
}

function update(){
    for (var i = 0; i < enemy.length; i++){
        enemy[i].y += enemy[i].speed;

        if (( enemy[i].y >= (H-enemy[i].h) ) || ( enemy[i].y < 0 )){
            enemy[i].speed *= -1;
        }
    }
}

function gameloop(){
    draw();
    update();
}

load_img();
init();

var f = setInterval(gameloop, 100);