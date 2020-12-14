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

// Player skills
let player_config = {
    player_speed: 150,
    player_jumpspeed: -700,
}

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
    this.physics.add.collider(platforms, this.player);

    // Adding Bouncing Effect on PLayer and Apples
    this.player.setBounce(0.2);

    fruits.children.iterate(function(f){
        f.setBounce(Phaser.Math.FloatBetween(0.4, 0.7));
    })

    // Player Animation and Player Movements
    this.anims.create({
        key: "left",
        frames: this.anims.generateFrameNumbers("dude", {start: 0, end: 3}),
        frameRate: 10,
        repeat: -1,
    });
    this.anims.create({
        key: "center",
        frames: this.anims.generateFrameNumbers("dude", {start: 4, end: 4}),
        frameRate: 10,
        repeat: -1,
    });
    this.anims.create({
        key: "right",
        frames: this.anims.generateFrameNumbers("dude", {start: 5, end: 8}),
        frameRate: 10,
        repeat: -1,
    });

    // cursor obj will store which key is pressed,
    // and then in update function we'll check which key is pressed,
    // and the move in the resp. direction
    this.cursor = this.input.keyboard.createCursorKeys();

    // OVERLAP: When player eats/overlaps the fruits
    this.physics.add.overlap(this.player, fruits, eatFruit, null, this);

}

function update(){
    // When pressed left, righ or up key do player movement in resp. directions
    if (this.cursor.left.isDown){
        this.player.setVelocityX(-player_config.player_speed);
        this.player.anims.play("left", true);
    }
    else if (this.cursor.right.isDown){
        this.player.setVelocityX(player_config.player_speed);
        this.player.anims.play("right", true);
    }
    else{
        this.player.setVelocityX(0);
        this.player.anims.play("center", true);
    }

    if (this.cursor.up.isDown && this.player.body.touching.down){
        this.player.setVelocityY(player_config.player_jumpspeed);
    }
}

function eatFruit(player, fruit){
    fruit.disableBody(true, true);
}