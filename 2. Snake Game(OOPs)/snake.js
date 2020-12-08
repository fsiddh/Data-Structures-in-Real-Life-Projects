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
            for (var i = this.init_len; i>0; i--){
                this.cells.push({x:i, y:0});
            }
        },

        drawSnake: function(){
            for(var i=0; i<this.cells.length; i++){
                pen.fillRect(this.cells[i].x*cell_size, this.cells[i].y*cell_size, cell_size-2, cell_size-2);
            }
        }
    };

    snake.createSnake();
}

function draw(){
    snake.drawSnake();
}

function update(){

}

function gameloop(){
    draw();
    update();
}

init();
var f = setInterval(gameloop, 100);