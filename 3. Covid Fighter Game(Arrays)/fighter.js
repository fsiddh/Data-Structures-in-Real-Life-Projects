function load_img(){
    // Enemy Image
    enemy_img = new Image();
    enemy_img.src = "Assets/v2.png";

    // Player Image
    player_img = new Image();
    player_img.src = "Assets/superhero.png";

    // Gem Image
    gem_img = new Image();
    gem_img.src = "Assets/gem.png";

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

    player = {
		x : 20,
		y : H/2,
		w : 60,
		h : 60,
		speed : 20,
        moving  : false,
        health : 100,
	};
    
	gem = {
		x : W-100,
		y : H/2,
		w : 60,
		h : 60,
	};
}

function draw(){
    // To erase previous frame
    pen.clearRect(0, 0, W, H);

    for (var i = 0; i < enemy.length; i++){
        pen.drawImage(enemy_img, enemy[i].x, enemy[i].y, enemy[i].w, enemy[i].h);
    }

    pen.drawImage(player_img, player.x, player.y, player.w, player.h);

    pen.drawImage(gem_img, gem.x, gem.y, gem.w, gem.h);
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