/*Global Phaser*/

//const { Physics } = require("phaser")

import{ createAnimations } from "./animations.js"

const config ={
    type: Phaser.AUTO, //webgl, canvas
    width: 256,
    height: 244,
    backgroundColor: '#049cd8',
    parent:'game',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
            }
    },
    scene:{
        preload, //Función que se ejecuta se ejecuta para precargar los recursos del juego.
        create, //Función que se ejecuta cuando el juego comienza.
        update //Función que se ejecuta en cada frame.
    }
}

new Phaser.Game(config)
// this -> game -> es el juego que estamos construyendo.

function preload() {
    //console.log('preload')
    this.load.image(
        'cloud1',
        'assets/scenery/overworld/cloud1.png'
    )

    this.load.image(
        'floorbricks',
        'assets/scenery/overworld/floorbricks.png'
    )

    this.load.spritesheet(
        'mario', //<- Es la ID y solo podemos tener 1 solo.
        'assets/entities/mario.png',
        { frameWidth: 18, frameHeight: 16 } // <- Dimensiones de cada frame (frameHeigth:18).
    )

    this.load.audio('gameover1', 'assets/sound/music/gameover1.mp3')

} //1.

function create() {
    //console.log('create')
    //image(x,y,id-del-assets)
    this.add.image(100, 50, 'cloud1')
        .setOrigin(0, 0) //margen esquina superior izquierda
        //.setOrigin(0.5, 0.5) //margen en el centro de la pantalla
        //.setOrigin(1, 1) //margen esquina inferior derecha
        .setScale(0.15)

    this.floor = this.physics.add.staticGroup()

    this.floor
        .create(0, config.height - 16, 'floorbricks')
        .setOrigin(0, 0.5)
        .refreshBody()

    this.floor
        .create(150, config.height - 16, 'floorbricks')
        .setOrigin(0, 0.5)
        .refreshBody()

    //this.add.tileSprite(0, config.height - 32, config.width, 32, 'floorbricks')
        //.setScale(1)
        //.setOrigin(0, 0)

    //this.mario = this.add.sprite(50,210,'mario')
    //.setOrigin(0, 1)

    this.mario = this.physics.add.sprite(50, 100, 'mario')
        .setOrigin(0, 1)
        //.setGravityY(300)
        .setCollideWorldBounds(true)
        .setGravityY(300)

    this.physics.world.setBounds(0, 0, 2000, config.height)
    this.physics.add.collider(this.mario, this.floor)

    this.cameras.main.setBounds(0, 0, 2000, config.height)
    this.cameras.main.startFollow(this.mario)

    createAnimations(this)

    this.keys = this.input.keyboard.createCursorKeys()
} //2.

function update() {
    if (this.mario.isDead) return

    if (this.keys.left.isDown){
        this.mario.anims.play('mario-walk', true)
        this.mario.x -= 2
        this.mario.flipX = true
    } else if (this.keys.right.isDown){
        this.mario.anims.play('mario-walk', true)
        this.mario.x += 2
        this.mario.flipX = false
    } else {
        this.mario.anims.play('mario-idle', true)
    }

    if (this.keys.up.isDown && this.mario.body.touching.down){
        //this.mario.y -= 5
        this.mario.setVelocityY(-300)
        this.mario.anims.play('mario-jump', true)
    }

    if (this.mario.y >= config.height){
        this.mario.isDead = true
        this.mario.anims.play('mario-dead')
        this.mario.setCollideWorldBounds(false)
        this.sound.add('gameover1', { volume: 0.2 }).play()

        setTimeout(() =>{
            this.mario.setVelocityY(-350)
        }, 100)

        setTimeout(() =>{
            this.scene.restart()
        }, 2000)
    }
}//3. se ejecuta continuamente

