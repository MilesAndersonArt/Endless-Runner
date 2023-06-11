// Player (Space Pod) prefab
class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        scene.add.existing(this);   // add to existing, displayList, updateList
        scene.physics.add.existing(this); // assign sprite with a physics body
        // allows gravity
        // this.body.allowGravity = true;
    }

    update() {
        // horizontal movement
        if (keyLEFT.isDown && this.x > 0) {
            this.setVelocityX(-200);
        } else if (keyRIGHT.isDown && this.x < config.width) {
            this.setVelocityX(200);
        } else {
            this.setVelocityX(0);
        }
        // vertical movement
        if(keyUP.isDown && this.y < config.height) {
            this.setVelocityY(100);
        } else if (keyDOWN.isDown && this.y > 0) {
            this.setVelocityY(400);
        } else {
            this.setVelocityY(0);
        }
        
    }

    // reset rocket to "ground"
    reset() {
        this.isFiring = false;
        this.y = game.config.height - borderUISize - borderPadding;
    }
}