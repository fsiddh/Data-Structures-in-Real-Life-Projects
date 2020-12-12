let config = {
    type: Phaser.CANVAS,
    width: 800,
    height: 600,

    scene: {
        preload: preload,
        create: create,
        update: update,
    }
};

let game = new Phaser.Game(config);

function preload(){
    console.log("In preload");
}

function create(){
    console.log("In create function");
}

function update(){
    console.log("Updating Continously");
}