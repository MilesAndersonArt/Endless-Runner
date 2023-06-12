class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        // load player sprite
        this.load.image('player', './assets/player/Pod.png');
        this.load.image('laser', './assets/player/laser.png');

        // scrolling tile sprites / parallax
        this.load.image('background', './assets/bg/background.png');
        this.load.image('whiterays', './assets/bg/whiterays.png');
        this.load.image('purplepanel', './assets/bg/purplepanel.png');
        this.load.image('redpanel', './assets/bg/redpanel.png');
        this.load.image('yellowpanel', './assets/bg/yellowpanel.png');
        this.load.image('ground', './assets/bg/ground.png');

        // load spritesheet
        this.load.spritesheet('shoot', './assets/anim/png/PodShoot_Anim.png', {frameWidth: 65, frameHeight: 65, startFrame: 0, endFrame: 4});
        this.load.spritesheet('playerdeath', './assets/anim/png/DeathAnim.png', {frameWidth: 86, frameHeight: 54, startFrame: 0, endFrame: 5});
        this.load.spritesheet('enemydeath', './assets/anim/png/EnemyDeath_Anim.png', {frameWidth: 51, frameHeight: 51, startFrame: 0, endFrame: 7});

        // load texture atlas
        this.load.atlas('enemyidle_atlas', './assets/anim/png/diamondenemyidle.png', './assets/anim/json/enemyidle.json');
        this.load.atlas('bottommonolith_atlas', './assets/anim/png/BottomMonolith_Anim.png', './assets/anim/json/BottomMonolith.json');
        this.load.atlas('topmonolith_atlas', './assets/anim/png/TopMonolith_Anim.png', './assets/anim/json/TopMonolith.json');
    }

    create() {
        // place tile sprite background assets
        this.background = this.add.tileSprite(0, 0, 840, 545, 'background').setOrigin(0, 0);
        this.whiterays = this.add.tileSprite(0, 0, 840, 545, 'whiterays').setOrigin(0, 0);
        this.purplepanel = this.add.tileSprite(0, 0, 840, 545, 'purplepanel').setOrigin(0, 0);
        this.yellowpanel = this.add.tileSprite(0, 0, 840, 545, 'yellowpanel').setOrigin(0, 0);
        this.redpanel = this.add.tileSprite(0, 0, 840, 545, 'redpanel').setOrigin(0, 0);
        // white UI background
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0xffffff).setOrigin(0, 0);
        // // black borders
        // this.add.rectangle(0, 0, game.config.width, borderUISize, 0x000000).setOrigin(0 ,0);
        // this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0x000000).setOrigin(0 ,0);
        // this.add.rectangle(0, 0, borderUISize, game.config.height, 0x000000).setOrigin(0 ,0);
        // this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0x000000).setOrigin(0 ,0);

        // add Player
        this.player = new Player(this, game.config.width/8, game.config.height/4, 'player').setOrigin(0.5, 0);
        this.player.body.setSize(65, 59);

        // ANIMATION CONFIG
        // laser shooting animation
        this.anims.create({
            key: 'shoot_anim',
            frames: this.anims.generateFrameNumbers('shoot', { 
                start: 0, 
                end: 4, 
                first: 0
                
            }),
            frameRate: 30
        });
        // player death animation
        this.anims.create({
            key: 'playerdeath_anim',
            frames: this.anims.generateFrameNumbers('playerdeath', { 
                start: 0, 
                end: 5, 
                first: 0
                
            }),
            frameRate: 30
        });
        // enemy death animation
        this.anims.create({
            key: 'enemydeath_anim',
            frames: this.anims.generateFrameNumbers('enemydeath', { 
                start: 0, 
                end: 5, 
                first: 0
                
            }),
            frameRate: 12
        });

        // TEXTURE ATLAS ANIMS
        // bottom monolith atlas
        this.anims.create({
            key: 'bottommonolith_atlas_anim',
            frames: this.anims.generateFrameNames('bottommonolith_atlas', {
                prefix: 'BottomMonolith_',
                start: 1,
                end: 4
            }),
            frameRate: 6,
            repeat: -1
        })
        // top monolith atlas
        this.anims.create({
            key: 'topmonolith_atlas_anim',
            frames: this.anims.generateFrameNames('topmonolith_atlas', {
                prefix: 'TopMonolith_',
                start: 1,
                end: 4
            }),
            frameRate: 6,
            repeat: -1
        })

        // add enemies
        this.enemies = this.physics.add.group();
        this.enemySpawnTimer = this.time.addEvent({
            delay: Phaser.Math.Between(2000, 5000), // Set the delay between enemy spawns (in milliseconds)
            callback: this.spawnEnemy,
            callbackScope: this,
            loop: true
        })
        this.enemies.defaults = {}; //Prevents group from chainging properties (such as gravity) of added objects

        // Physics group for lasers
        this.lasers = this.physics.add.group({
            classType: Laser,
            runChildUpdate: true
        });
        this.lasers.defaults = {}; //Prevents group from chainging properties (such as gravity) of added objects
        // Create a new laser instance
        const laser = new Laser(this, 0, 0, 'laser');


        // Intialize Random Monolith Generator variables
        // Created random 'monolith' generator based off Thomas Palef's “How to Make Flappy Bird in Javascript with Phaser” and various Phaser 3 examples
        // credit: https://medium.com/@thomaspalef/how-to-make-flappy-bird-in-javascript-with-phaser-857fc3ae443c
        this.monoliths = this.physics.add.group();
        this.monolithTimer = this.time.addEvent({
            delay:  2000, // Time (in milliseconds) between pipe generation
            callback: this.createMonolith,
            callbackScope: this,
            loop: true
        });
        this.monoliths.defaults = {};
        this.createMonolith();

        // COLLISION DETECTION
        // Player-Death Collision
        this.physics.add.collider(this.player, this.monoliths, this.PlayerDeathCollision, null, this);
        this.physics.add.collider(this.monoliths, this.player, this.PlayerDeathCollision, null, this);
        this.physics.add.collider(this.player, this.enemies, this.PlayerDeathCollision, null, this);
        // Laser-Enemy Collision
        this.physics.add.collider(this.lasers, this.enemies, this.LaserEnemyCollision, null, this);

        // SET UP KEYBOARD INPUT
        // console.log('initializing keys');
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        // console.log('keys initialized');


        // initialize score
        // this.p1Score = 0;
        // display score
        let scoreConfig = {
            fontFamily: 'Courier New',
            fontSize: '28px',
            backgroundColor: '#000000',
            color: '#FFFFFF',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5, 
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig);        
        // GAME OVER flag
        this.gameOver = false;

    }
    // Created random 'monolith' generator based off Thomas Palef's “How to Make Flappy Bird in Javascript with Phaser” and various Phaser 3 examples
    // credit: https://medium.com/@thomaspalef/how-to-make-flappy-bird-in-javascript-with-phaser-857fc3ae443c
    createMonolith() {
        const monolithVerticalDistance = Phaser.Math.Between(135, 365); // Distance between the monoliths vertically
        const monolithHorizontalDistance = game.config.width + 100; // Distance between the monoliths horizontally
        const monolithTopHeight = Phaser.Math.Between(0, game.config.height - monolithVerticalDistance); // Height of the top monolith

        this.monoliths.getChildren().forEach(function (monolith) {
            this.physics.add.existing(monolith);
            monolith.body.immovable = true; // sets immovable
            }, this)

        // set up Top Monolith
        const monolithTop = this.monoliths.create(monolithHorizontalDistance, monolithTopHeight, 'topmonolith_atlas');
        monolithTop.setOrigin(0, 1); // Set origin to the bottom left
        monolithTop.body.velocity.x = -300; // set the horizontal velocity
        monolithTop.body.allowGravity = false; // Disable gravity
        monolithTop.body.setSize(monolithTop.width,  monolithTop.height, true); // Set the physics body size
        monolithTop.body.immovable = true; // sets immovable
    

        const monolithBottom = this.physics.add.sprite(monolithHorizontalDistance, monolithTopHeight + monolithVerticalDistance, 'bottommonolith_atlas');
        monolithBottom.setOrigin(0, 0); // Set origin to the bottom left
        monolithBottom.body.velocity.x = -300; // set the horizontal velocity
        monolithBottom.body.allowGravity = false; // Disable gravity
        monolithBottom.body.setSize(monolithBottom.width, monolithBottom.height, true); // Set the physics body size
        monolithBottom.body.immovable = true; // sets immovable

        // Start playing the monolith atlas animations
        monolithTop.anims.play('topmonolith_atlas_anim');
        monolithBottom.anims.play('bottommonolith_atlas_anim');

        // Collision logic between player and individual monoliths
        this.physics.add.collider(this.player, monolithTop, () => {
            this.PlayerDeathCollision(this.player, monolithTop);
        });
        this.physics.add.collider(this.player, monolithBottom, () => {
            this.PlayerDeathCollision(this.player, monolithBottom);
        });

    }

    spawnEnemy() {
        const numEnemies = Phaser.Math.Between(1, 3);

        for (let i = 0; i < numEnemies; i++) {
            const randomY = Phaser.Math.Between(50, game.config.height - 20);
            const enemy = new Enemy(this, game.config.width, randomY, 'enemyidle_atlas');
            enemy.setOrigin(0.5);
            enemy.setVelocityX(Phaser.Math.Between(-600, -200)); // random velocity between -200 and -600

            // Collision detection between player and enemy
            this.physics.add.collider(this.player, enemy, this.PlayerDeathCollision, null, this);

            // Create a collider between the lasers and enemies
            this.physics.add.collider(this.lasers, enemy, this.LaserEnemyCollision, null, this);
        }
        
    }

    update() {
        // BG parallax scrolling
        this.yellowpanel.tilePositionX += 18;
        this.redpanel.tilePositionX += 12;
        this.purplepanel.tilePositionX += 9.5;
        this.whiterays.tilePositionX += 20;

        if(!this.gameOver) {
            this.player.update(); // update p1
            // Fire laser
            if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
                this.shootLaser();
            }
            this.lasers.getChildren().forEach((laser) => {
                if (laser.active) {
                  if (laser.x > game.config.width) {
                    laser.reset();
                  }
                }
              });

            // Update monolith positions
            // Created random 'monolith' generator based off Thomas Palef's “How to Make Flappy Bird in Javascript with Phaser” and various Phaser 3 examples
            // credit: https://medium.com/@thomaspalef/how-to-make-flappy-bird-in-javascript-with-phaser-857fc3ae443c
            this.monoliths.getChildren().forEach(function (monolith) {
                if (monolith.getBounds().right < 0) {
                // If the pipe has moved off the screen, destroy it
                monolith.destroy();
                }
            });
            // Update enemies to their DOOM
            this.enemies.getChildren().forEach(function (enemy) {
                if (enemy.getBounds().right < 0) {
                    enemy.destroy(); // If the enemy has moved off the screen, destroy it
                }
            });
        }
        if(this.gameOver) {
            // this.player.setVelocityX(0); // Stop the player's movement (temporary)
            // Pause enemies upon game over
            this.enemySpawnTimer.paused = true;
            this.enemies.getChildren().forEach(function (enemy) {
                enemy.setVelocityX(0);
            });

        }
    }

    shootLaser() {
        // Get player position
        const playerX = this.player.x + this.player.width;
        const playerY = this.player.y + this.player.height / 2;
        // Create a new laser
        const laser = new Laser(this, playerX, playerY);
        laser.shoot(playerX, playerY);
        //laser.body.collideWorldBounds = true;
        
        // Add the laser to a group
        this.lasers.add(laser);

        // Collision detection between the lasers and enemies
       this.physics.add.collider(laser, this.enemies, this.LaserEnemyCollision, null, this);
    }

    PlayerDeathCollision(player, obstacle){
        if (this.gameOver) {
            return;
        }
        this.gameOver = true; // ensures that animation and sound don't repeat more than once

        // Stop the player's movement
        this.player.setVelocityX(0);

        // Play death animation for the player
        this.player.alpha = 0;

        let die = this.add.sprite(this.player.x, this.player.y, 'playerdeath_anim').setOrigin(0,0);
        die.anims.play('playerdeath_anim');    // play death animation
        
        // Hide the player sprite after the death animation completes
        die.on('animationcomplete', () => {
            die.destroy();
            this.player.destroy(); // Removes player character from scene
        }, this);

        this.sound.play('sfx_death');

    }

    LaserEnemyCollision(laser, enemy) {

        // Disable the laser and enemy upon collision
        laser.disableBody(true, true);
        enemy.disableBody(true, true);

        // Destroy the enemy and play the death animation
        let enemydeath = this.add.sprite(enemy.x, enemy.y, 'enemydeath_anim').setOrigin(0,0);
        enemydeath.anims.play('enemydeath_anim');
        // play death animation
        enemydeath.on('animationcomplete', () => {
            enemydeath.destroy();
            enemy.destroy(); // removes enemy from scene
        }, this);

        // Increase the player's score
        this.p1Score += enemy.points;
        // Update the score display
        this.scoreLeft.text = this.p1Score;

        // sfx
        let test = Math.floor(Math.random() * 4) + 1;
        let enemydeathsfx = 'sfx_explosion_' + test;
        this.sound.play(enemydeathsfx);
    }

}