class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame, pointValue = 300, speed) {
        super(scene, x, y, texture, frame);

        scene.add.existing(this); // add to existing scene
        scene.physics.add.existing(this); // assign sprite with a physics body
        this.body.allowGravity = false; // removes gravity
        this.body.setSize(this.width, this.height); // Set the physics body size
        this.body.setOffset(0, 0); // Set the physics body offsets
        this.body.immovable = false;
        this.points = pointValue;

        // may need to fix movespeed
        this.movespeed = speed;

        //add sprite animation
        this.anims.create({
            key: 'enemyidle_atlas_anim',
            frames: this.anims.generateFrameNames('enemyidle_atlas', {
                prefix: 'enemy_',
                start: 1,
                end: 4
            }),
            frameRate: 6,
            repeat: -1
        })
        this.anims.play('enemyidle_atlas_anim');

    }

    update() {
        // move left
        this.x -= this.movespeed;
        // check if enemy has moved off the left edge of the screen
        if(this.x <= 0 - this.width) {
            this.destroy();
        }
    }

}