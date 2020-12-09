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
    game_over = false;

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
		w : 50,
		h : 50,
		speed : 20,
        moving  : false,
        health : 100,
	};
    
	gem = {
		x : W-70,
		y : H/2,
		w : 60,
		h : 60,
    };
    
    // When we click the mouse
    canvas.addEventListener("mousedown", function(){
        player.moving = true;
    })

    // When we release our click from the mouse
    canvas.addEventListener("mouseup", function(){
        player.moving = false;
    })
}

function isOverlap(rect1,rect2){
    if (rect1.x < rect2.x + rect2.w &&
   rect1.x + rect1.w > rect2.x &&
   rect1.y < rect2.y + rect2.h &&
   rect1.y + rect1.h > rect2.y) {
    return true
    }
    
    return false;
    
}

function draw(){
    // To erase previous frame
    pen.clearRect(0, 0, W, H);

    // To display all enemies
    for (var i = 0; i < enemy.length; i++){
        pen.drawImage(enemy_img, enemy[i].x, enemy[i].y, enemy[i].w, enemy[i].h);
    }

    //draw the player
    pen.drawImage(player_img, player.x, player.y, player.w, player.h);

    //draw the gem
    pen.drawImage(gem_img, gem.x, gem.y, gem.w, gem.h);

    // Display the Score
    for(let i=0;i<enemy.length;i++){
        pen.drawImage(enemy_img,enemy[i].x,enemy[i].y,enemy[i].w,enemy[i].h);
    }
    
    pen.fillStyle = "white";
    pen.fillText("Score "+player.health,10,10);
}

function update(){

    //if the player is moving 
    if (player.moving == true){
        player.x += player.speed;
    }

    // Check if player collides with enemy
    for(let i=0;i<enemy.length;i++){
        if(isOverlap(enemy[i],player)){
            player.health -= 50;
            if(player.health <0){
                console.log(player.health);
                game_over = true;
                alert("Game Over" + player.health);
            }
        }
    }
    
    //overlap overlap
    if(isOverlap(player,gem)){
        
        console.log("You Won");
        alert("You Won!");
        game_over = true;
        return;
    }

    // move the box downwards
    // update each enemy by same logic
    for (var i = 0; i < enemy.length; i++){
        enemy[i].y += enemy[i].speed;

        if (( enemy[i].y >= (H-enemy[i].h) ) || ( enemy[i].y < 0 )){
            enemy[i].speed *= -1;
        }
    }
}

function gameloop(){
    if(game_over == true){
        clearInterval(f);
    }
    draw();
    update();
}

load_img();
init();

var f = setInterval(gameloop, 100);