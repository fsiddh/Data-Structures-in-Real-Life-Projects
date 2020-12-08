function init(){
    canvas = document.getElementById('mycanvas');
    W = H = canvas.width = canvas.height = 1000;
    pen = canvas.getContext('2d');
    cell_size = 66;
    food = getrandomfood();
    game_over = false;
    score = 0;

    //Create a Image Object for food
    food_img = new Image();
    food_img.src = "Assets/apple.png";

    //Create a Image Object for Score
    trophy = new Image();
    trophy.src = "Assets/trophy.png";

    snake = {
        init_len: 4,
        color: "blue",
        cells: [],
        direction: "right",

        createSnake: function(){
            for (var i = this.init_len; i>0; i--){
                this.cells.push({x:i, y:0});
            }
        },

        drawSnake: function(){
            for(var i=0; i<this.cells.length; i++){
                pen.fillStyle = this.color;
                pen.fillRect(this.cells[i].x*cell_size, this.cells[i].y*cell_size, cell_size-2, cell_size-2);
            }
        },

        updateSnake: function(){
            console.log("Updating Snake. ");

            var headX = this.cells[0].x;
            var headY = this.cells[0].y;

            if (headX == food.x && headY == food.y){
                food = getrandomfood();
                score += 1;
            }
            else{
                this.cells.pop();
            }
            
            var nextX, nextY;

            if (snake.direction == 'right'){
                nextX = headX + 1;
                nextY = headY;
            }
            else if (snake.direction == 'left'){
                nextX = headX - 1;
                nextY = headY;
            }
            else if (snake.direction == 'down'){
                nextX = headX;
                nextY = headY + 1;
            }
            else{
                nextX = headX;
                nextY = headY - 1;
            }

            this.cells.unshift({x:nextX, y:nextY});

            /*Write a Logic that prevents snake from going out*/
            var lastX = Math.round(W/cell_size);
            var lastY = Math.round(H/cell_size);

            if (this.cells[0].x > lastX || this.cells[0].y > lastY || 
                this.cells[0].x < 0 || this.cells[0].y < 0){
                game_over = true;
            }
        }
    };

    snake.createSnake();
    //Add a Event Listener on the Document Object
    function keyPressed(e){
        if (e.key == 'ArrowRight'){
            snake.direction = 'right';
        }
        else if (e.key == 'ArrowLeft'){
            snake.direction = 'left';
        }
        else if (e.key == 'ArrowDown'){
            snake.direction = 'down';
        }
        else{
            snake.direction = 'up';
        }
    }

    document.addEventListener('keydown', keyPressed);
}

function draw(){
    //erase the old frame
    pen.clearRect(0,0,W,H);
    snake.drawSnake();

    // To display the food object/image
    pen.fillStyle = food.color;
    pen.drawImage(food_img, food.x*cell_size, food.y*cell_size, cell_size, cell_size);

    // To display the Score 
    pen.drawImage(trophy, 18, 20, cell_size, cell_size);
    pen.fillStyle ="black";
    pen.font = "25px Roboto";
    pen.fillText(score, 45, 50);
}

function update(){
    snake.updateSnake();
}

function getrandomfood(){
    var foodX = Math.round( Math.random()*(W-cell_size) / cell_size);
    var foodY = Math.round( Math.random()*(H-cell_size) / cell_size);

    var food = {
        x: foodX,
        y: foodY,
        color: "red",
    }

    return food;
}

function gameloop(){
    if (game_over == true){
        clearInterval(f);
        alert("Game Over");
        return;
    }
    draw();
    update();
}

init();
var f = setInterval(gameloop, 100);