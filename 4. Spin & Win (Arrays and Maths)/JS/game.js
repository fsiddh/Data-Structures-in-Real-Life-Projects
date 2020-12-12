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
    console.log("Preload");
    //load object, load some images
    this.load.image('background','../Assets/back.jpg');
    console.log(this);
    this.load.image('wheel','../Assets/wheel.png');
    this.load.image('pin','../Assets/pin.png');
    this.load.image('stand','../Assets/stand.png');
}

function create(){
    console.log("Create");
    //create the background image
    let W = game.config.width;
    let H = game.config.height;
    
    let background = this.add.sprite(0,0,'background');
    background.setPosition(W/2,H/2);
    background.setScale(0.20);
    
     //lets create the stand
    let stand = this.add.sprite(W/2,H/2 + 250,'stand');
    stand.setScale(0.25);
    
    //lets create a pin
    let pin = this.add.sprite(W/2,H/2-250,"pin");
    pin.setScale(0.25);
    pin.depth = 1; // Jitne zada value utni zada dur rahega obj. 0 being max and 0 being min
    
    //let create wheel
    this.wheel = this.add.sprite(W/2,H/2,"wheel");
    this.wheel.setScale(0.25);  

    //event listener for mouse click
    this.input.on("pointerdown", spinwheel, this);

    //lets create text object
    font_style = {
        font: "bold 25px Arial",
        align: "center",
        color: "red",
    }
    this.game_text = this.add.text(10,10,"Welcome to Spin And Wheel", font_style);
    

}

//Game Loop
function update(){
    console.log("Updating Continously");
}

function spinwheel(){
    this.game_text.setText("Helo guys, chai pee lo")

    tween = this.tweens.add({
        targets: this.wheel,
        angle: Math.random()*10000,
        ease: "Cubic.easeOut",
        duration: 3000,
    });
}