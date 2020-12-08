function init(){
    canvas = document.getElementById('mycanvas');
    W = H = canvas.width = canvas.height = 900;
    pen = canvas.getContext('2d');
    cell_size = 67;

    snake = {
        init_len: 4,
        color: "blue",
        cells: [],
        direction: "right",

        createSnake: function(){
            for (var i = this.init_len; i>=0; i--){
                this.cells.push({x:i, y:0});
            }
        },

        drawSnake: function(){
            for(var i=0; i<this.cells.length; i++){
                pen.fillRect(this.cells[i].x*cell_size, this.cells[i].y*cell_size, cell_size-2, cell_size-2);
            }
        },

        updateSnake: function(){
            console.log("Updating Snake. ");
            this.cells.pop();
            
            var headX = this.cells[0].x;
            var headY = this.cells[0].y;
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
        }
    };

    snake.createSnake();

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
    pen.clearRect(0,0,W,H);
    snake.drawSnake();
}

function update(){
    snake.updateSnake();
}

function gameloop(){
    draw();
    update();
}

init();
var f = setInterval(gameloop, 100);