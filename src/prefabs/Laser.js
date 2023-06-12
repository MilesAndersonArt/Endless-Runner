class Laser extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, 'laser');

        scene.add.existing(this); // add to existing scene
        scene.physics.add.existing(this); // assign sprite with a physics body
        // removes gravity
        this.body.allowGravity = false;
        // set up active and visible statuses
        this.setActive(false);
        this.setVisible(false);
        this.isFiring = false; // track firing status
        this.sfxShoot = scene.sound.add('sfx_shoot') // add laser shoot sfx

        // Add firing animation to the player
        // this.shootanim = scene.add.sprite(x, y, 'shoot');
        // this.shootanim.setVisible(false);
        // this.shootanim.on('animationcomplete', () => {
        //     this.shootanim.setVisible(false);
        // })

    }
    
    shoot(x, y) {
        // Set the laser's initial position and properties
        this.setPosition(x, y);
        this.setActive(true);
        this.setVisible(true);
        this.isFiring = true;

        this.body.setVelocityX(750);
        // this.shootanim.setPosition(x, y);
        // this.shootanim.setVisible(true);
        // this.shootanim.play('shoot_anim');
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