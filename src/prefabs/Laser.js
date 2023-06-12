class Laser extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, 'laser');

        scene.add.existing(this); // add to existing scene
        scene.physics.add.existing(this); // assign sprite with a physics body
        this.body.allowGravity = false;  // removes gravity
        this.body.setSize(this.width, this.height); // Set the physics body size
        this.body.setOffset(0, this.height / 2);
        this.body.immovable = true;
        // set up active and visible statuses
        this.setActive(false);
        this.setVisible(false);
        this.isFiring = false; // track firing status
        this.sfxShoot = scene.sound.add('sfx_shoot') // add laser shoot sfx


    }
    
    shoot(x, y) {
        // Set the laser's initial position and properties
        this.setPosition(x, y);
        this.setActive(true);
        this.setVisible(true);
        this.isFiring = true;

        this.body.setVelocityX(750);
        this.sfxShoot.play();

    }

    update() {
        if(this.isFiring && this.x > game.config.width) {
            this.reset();
        }
    }
    // position reset
    reset() {
        this.isFiring = false;
        this.setActive(false);
        this.setVisible(false);
        this.setPosition(game.config.width, this.y);
    }
}