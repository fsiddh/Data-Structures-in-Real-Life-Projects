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
    },

    physics: {
        default: "arcade",
        arcade: {
            gravity: {
                y: 1000,
            },
            debug: true,
        }
    }
};

let game = new Phaser.Game(config);

function preload(){
    this.load.image("ground", "../Assets/grass.png");
    this.load.image("sky", "../Assets/background.png");
    this.load.image("apple", "../Assets/apple.png");

    this.load.spritesheet("dude", "../Assets/dude.png", {frameWidth: 32, frameHeight: 48});
}

function create(){
    W = game.config.width;
    H = game.config.height;

    //To create a background
    let sky = this.add.sprite(0, 0, "sky");
    sky.setOrigin(0, 0);
    sky.height = H;
    sky.displayWidth = W;

    //add tilesprites
    let ground = this.add.tileSprite(0, H-128, W, 128, "ground");
    ground.setOrigin(0,0);

    //Add the fruits
    let fruits = this.physics.add.group({
        key: "apple",
        repeat: 8,
        setScale: {x: 0.2, y: 0.2},
        setXY: {x: 10, y: 0, stepX: 100},
    })

    // Add our player with Physics concepts
    this.player = this.physics.add.sprite(100, 100, "dude", 4);
    this.physics.add.existing(ground, true);
    
    // Add the platforms and include "ground" in platforms container
    let platforms = this.physics.add.staticGroup();
    platforms.create(500, 400, "ground").setScale(2, 0.5).refreshBody();
    platforms.create(700, 200, "ground").setScale(2, 0.5).refreshBody();
    platforms.create(150, 200, "ground").setScale(2, 0.5).refreshBody();
    platforms.add(ground);

    // Handling all Collisions
    this.physics.add.collider(platforms, fruits);
    this.physics.add.collider(ground, this.player);

    // Adding Bouncing Effect on PLayer and Apples
    this.player.setBounce(0.2);

    fruits.children.iterate(function(f){
        f.setBounce(Phaser.Math.FloatBetween(0.4, 0.7));
    })

}

function update(){}