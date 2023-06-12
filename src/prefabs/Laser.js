class Laser extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        scene.add.existing(this); // add to existing scene
        scene.physics.add.existing(this); // assign sprite with a physics body
        // removes gravity
        this.body.allowGravity = false;
        // set up active and visible statuses
        this.setActive(false);
        this.setVisible(false);
        this.isFiring = false; // track firing status
        this.sfxShoot = scene.sound.add('sfx_shoot') // add laser shoot sfx

    }

    update() {
        // fire button
        if(Phaser.Input.KeyboardEvent.JustDown(keySPACE) && !this.isFiring) {
            this.isFiring = true;
            this.x = this.player.x
            this.y = this.player.y
            this.setActive(true);
            this.setVisible(true);
            this.sfxShoot.play();
        }
        // if fired, move right
        if(this.isFiring && this.x < game.config.width) {
            this.body.setVelocityX(750);
        }
        if(this.x >= game.config.width){
            this.reset();
        }

    }
    // position reset
    reset () {
        this.isFiring = false;
        this.setActive(false);
        this.setVisible(false);
        this.x = game.config.width;
    }
}