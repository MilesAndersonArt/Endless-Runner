class Laser extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        scene.add.existing(this); // add to existing scene
        scene.physics.add.existing(this); // assign sprite with a physics body
        // removes gravity
        this.body.allowGravity = false;

        this.isFiring = false; // track firing status
        this.moveSpeed = gamespeed;
        this.sfxShoot = scene.sound.add('sfx_shoot') // add laser shoot sfx

    }

    update() {
        // fire button
        if(Phaser.Input>KeyboardEvent.JustDown(keySPACE) && !this.isFiring) {
            this.isFiring = true;
        }
        // if fired, move right
        if(this.isFiring && this.x < game.config.width) {
            this.x += this.moveSpeed;
        }
        if(this.x >= game.config.width){
            this.reset();
        }

    }
    // position reset
    reset () {
        this.isFiring = false;
        this.x = game.config.width;
    }
}