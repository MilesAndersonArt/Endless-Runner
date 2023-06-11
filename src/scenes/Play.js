class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        // load player sprite
        this.load.image('player', './assets/player/Pod.png');

        // scrolling tile sprites / parallax
        this.load.image('background', './assets/bg/background.png');
        this.load.image('whiterays', './assets/bg/whiterays.png');
        this.load.image('purplepanel', './assets/bg/purplepanel.png');
        this.load.image('redpanel', './assets/bg/redpanel.png');
        this.load.image('yellowpanel', './assets/bg/yellowpanel.png');

        // load spritesheet
        this.load.spritesheet('shoot', './assets/anim/png/PodShoot_Anim.png', {frameWidth: 65, frameHeight: 65, startFrame: 0, endFrame: 4});
        this.load.spritesheet('playerdeath', './assets/anim/png/DeathAnim.png', {frameWidth: 86, frameHeight: 54, startFrame: 0, endFrame: 5});
        this.load.spritesheet('enemydeath', './assets/anim/png/EnemyDeath_Anim.png', {frameWidth: 51, frameHeight: 51, startFrame: 0, endFrame: 7});

        // load texture atlas
        this.load.atlas('enemyidle_atlas', 'assets/anim/png/diamondenemyidle.png', 'assets/anim/json/enemyidle.json');
        this.load.atlas('bottommonolith_atlas', 'assets/anim/png/BottomMonolith_Anim.png', 'assets/anim/json/BottomMonolith.json');
        this.load.atlas('topmonolith_atlas', 'assets/anim/png/TopMonolith_Anim.png', 'assets/anim/json/TopMonolith.json');
    }

    create() {
        // place tile sprite background
        this.yellowpanel = this.add.tileSprite(0, 0, 840, 545, 'yellowpanel').setOrigin(0, 0);
        // this.yellowpanel.setInteractive();
        this.redpanel = this.add.tileSprite(0, 0, 840, 545, 'redpanel').setOrigin(0, 0);
        //this.redpanel.setInteractive();
        this.purplepanel = this.add.tileSprite(0, 0, 840, 545, 'purplepanel').setOrigin(0, 0);
        //this.purplepanel.setInteractive();
        this.whiterays = this.add.tileSprite(0, 0, 840, 545, 'whiterays').setOrigin(0, 0);
        //this.whiterays.setInteractive();
        this.background = this.add.tileSprite(0, 0, 840, 545, 'background').setOrigin(0, 0);
        //this.background.setInteractive();


        // white UI background
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0xffffff).setOrigin(0, 0);
        // black borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0x000000).setOrigin(0 ,0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0x000000).setOrigin(0 ,0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0x000000).setOrigin(0 ,0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0x000000).setOrigin(0 ,0);

        // add Rocket (player 1)
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5, 0);

        // animation config
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { 
                start: 0, 
                end: 9, 
                first: 0
                
            }),
            frameRate: 30
        });

        this.anims.create({
            key: 'bonus_explode',
            frames: this.anims.generateFrameNumbers('bonus_explosion', { 
                start: 0, 
                end: 1, 
                first: 0
                
            }),
            frameRate: 30
        });

        // texture atlas anims
        this.anims.create({
            key: 'creature',
            frames: this.anims.generateFrameNames('creature1idleatlas', {
                prefix: 'creatureidle(',
                start: 1,
                end: 4,
                suffix: ')'
            }),
            frameRate: 4,
            repeat: -1
        })

        this.anims.create({
            key: 'bonus',
            frames: this.anims.generateFrameNames('bonusatlas', {
                prefix: 'BonusShip(',
                start: 1,
                end: 2,
                suffix: ')'
            }),
            frameRate: 2,
            repeat: -1
        })

        // add enemies
        

        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        // initialize score
        this.p1Score = 0;
        this.timeLeft = timer / 1000;
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
        this.timerCounter = this.add.text(borderUISize + borderPadding + 450, borderUISize + borderPadding*2, 'Time:' + this.timeLeft, scoreConfig);
        
        this.startTimer(1000000000);
        // GAME OVER flag
        this.gameOver = false;
        // AccelerationTrigger flag
        this.accelerationTrigger = true;
        // Input
        input = this.input;
        input.on('pointerdown', this.clicked, this);
        input.on('pointerup', this.notClicked, this);

    }

    update() {
        // BG parallax scrolling
        this.yellowpanel.tilePositionX -= 4;
        this.redpanel.tilePositionX -= 3;
        this.purplepanel.tilePositionX -= 2.5;
        this.whiteray.tilePositionX -= 0.25;

        cursorx = input.x;
        cursory = input.y;
        // Timer Settings
        const elapsed = this.timerEvent.getElapsed()
        const remaining = Math.max(0, timer - elapsed)
        this.timeLeft = remaining / 1000;
        this.timerCounter.text = this.timeLeft.toFixed(0);
        // Spaceship Acceleration
        if ((elapsed / 1000).toFixed(0) == 30 && this.accelerationTrigger) {
            game.settings.spaceshipSpeed += 3;
            this.accelerationTrigger = false;
        }
        // Timer Game Over Conditions
        if(this.timeLeft <= 0) {
            let scoreConfig = {
                fontFamily: 'Courier New',
                fontSize: '28px',
                backgroundColor: '#000000',
                color: '#FFFFFF',
                align: 'center',
                padding: {
                top: 5,
                bottom: 5,
                },
                fixedWidth: 0
            }
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or ← to Menu', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }

        // check key input for restart / menu
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            highscore = Math.max(this.p1Score)
            this.scene.restart();
            this.gameOver = false;
            // this.accelerationTrigger = true;
            timer = 60000;
        }

        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            highscore = Math.max(this.p1Score)
            this.scene.start("menuScene");
            this.gameOver = false;
            // this.accelerationTrigger = true;
            timer = 60000;
        }

        this.redsky.tilePositionX += 4;
        this.clouds.tilePositionX += 1;
        this.groundfog.tilePositionX -= 5;

        if(!this.gameOver) {
            this.p1Rocket.update();             // update p1
            this.ship01.update();               // update spaceship (x3)
            this.ship02.update();
            this.ship03.update();

        }

        // check collisions

        if(this.checkCollision(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);
        }
        if (this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);
        }
        if (this.checkCollision(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset();
            this.bonusExplode(this.ship01);
        }
    }

    checkCollision(rocket, ship) {
        // simple AABB checking
        if (rocket.x < ship.x + ship.width && 
            rocket.x + rocket.width > ship.x && 
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship. y) {
                return true;
        } else {
            return false;
        }
    }

    shipExplode(ship) {
        // temporarily hide ship
        ship.alpha = 0;                         
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');             // play explode animation
        boom.on('animationcomplete', () => {    // callback after anim completes
            ship.reset();                         // reset ship position
            ship.alpha = 1;                       // make ship visible again
            boom.destroy();                       // remove explosion sprite
        });
        // score add and repaint
        if(ship.points == 40){
            timer += 5000;
        }
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score; 
        
        this.sound.play('sfx_explosion');
        let test = Math.floor(Math.random() * 4) + 1;
        let enemydeathsfx = 'sfx_enemydeath_' + test;
        this.sound.play(enemydeathsfx);
      }
    
      bonusExplode(ship) {
        // temporarily hide ship
        ship.alpha = 0;                         
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'bonus_explosion').setOrigin(0, 0);
        boom.anims.play('bonus_explode');             // play explode animation
        boom.on('animationcomplete', () => {    // callback after anim completes
            ship.reset();                         // reset ship position
            ship.alpha = 1;                       // make ship visible again
            boom.destroy();                       // remove explosion sprite
        });
        // score add and repaint
        if(ship.points == 40){
            timer += 5000;
        }
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;

        this.sound.play('sfx_bonus');
      }

      startTimer(duration = 60000){
        this.timerEvent = this.time.addEvent({
            delay: duration
        })
      }
      clicked(){
        mousedown = true;
      }
      notClicked(){
        mousedown = false;
      }
}