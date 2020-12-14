let config = {
    type: Phaser.AUTO,
    
    scale: {
        mode: Phaser.Scale.FIT,
        width: 800,
        height: 600
    },

    backgroundColor: 0xffffcc,

    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

let game = new Phaser.Game(config);

function preload(){
    this.load.image("ground", "../Assets/grass.png");
    this.load.image("sky", "../Assets/background.png");
}

function create(){
    W = game.config.width;
    H = game.config.height;

    let sky = this.add.sprite(0, 0, "sky");
    sky.setOrigin(0, 0);
    sky.height = H;
    sky.displayWidth = W;

    let ground = this.add.tileSprite(0, H-128, W, 128, "ground");
    ground.setOrigin(0,0);
}

function update(){}