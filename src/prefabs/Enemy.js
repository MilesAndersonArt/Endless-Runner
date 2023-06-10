class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame, pointValue = 300, speed) {
        super(scene, x, y, texture, frame);

        scene.add.existing(this); // add to existing scene
        scene.physics.add.existing(this); // assign sprite with a physics body
        // removes gravity
        this.body.allowGravity = false;
        this.points = pointValue;

        // may need to fix movespeed
        this.movespeed = speed;

        //add sprite animation
        this.anims.create({
            key: 'enemyidle',
            frames: this.anims.generateFrameNames('enemyidle_atlas', {
                prefix: 'enemy_',
                start: 1,
                end: 4
            }),
            frameRate: 4,
            repeat: -1
        })
        this.anims.play('enemyidle');

    }

    update() {
        // move left
        this.x -= this.movespeed;
        // wrap around from right edge to left edge
        if(this.x <= 0 - this.width) {
            this.x = game.config.width;
        }
    }
    // position reset
    reset () {
        this.x = game.config.width;
    }
}