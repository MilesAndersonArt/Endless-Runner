// Player (Space Pod) prefab
class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        scene.add.existing(this);
        scene.physics.add.existing(this); // assign sprite with a physics body
        // allows gravity
        this.body.allowGravity = false;
        this.body.setVelocity(0, 0);
        this.body.immovable = false;
    }

    

    update() {
        // console.log('player update activated');
        // horizontal movement
        if (keyLEFT.isDown && this.x > 0) {
            this.body.setVelocityX(-400);
            // console.log('left');
        } else if (keyRIGHT.isDown && this.x < config.width) {
            this.body.setVelocityX(300);
            // console.log('right');
        } else {
            this.body.setVelocityX(0);
            // console.log('stagnant');
        }
        // vertical movement
        if(keyUP.isDown) {
            this.body.setVelocityY(-270);
            // console.log('up');
        } else if (keyDOWN.isDown && this.y < config.height) {
            this.body.setVelocityY(300);
            // console.log('down');
        } else {
            this.body.setVelocityY(0);
            // console.log('stagnant');
        }
        
    }

}