// URL to explain PHASER scene: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/scene/

export default class Game extends Phaser.Scene {
  constructor() {
    super("main");
  }

  init() {}

  preload() {
    // cargar assets

    //import Cielo
    this.load.image("cielo","../public/assets/Cielo.webp");

    //import plataforma
    this.load.image("plataforma","../public/assets/platform.png");

    //import personaje
    this.load.image("personaje", "../public/assets/Ninja.png");

    //import recolectables
    this.load.image("rombo", "../public/assets/diamond.png");
    
    this.load.image("cuadrado", "../public/assets/square.png");

    this.load.image("triangulo", "../public/assets/triangle.png");
  }

  create() {
    //crear elementos
    this.cielo = this.add.image(400,300, "cielo");
    this.cielo.setScale(2);

    //crea grupo plataforma
    this.plataformas = this.physics.add.staticGroup()
    //al grupo de plataformas agregar una plataforma
    this.plataformas.create(400,568,"plataforma").setScale(2).refreshBody();

    this.plataformas.create(300,200,"plataforma").refreshBody();

    //crear personaje //.image aqui porque es una imagen sin animacion, y .sprite cuando es algo con animacion
    this.personaje = this.physics.add.image(400,300, "personaje");
    this.personaje.setScale(0.1);
    this.personaje.setCollideWorldBounds(true);

    //agregar colision entre personaje y plataforma   // una version alternativa de agregar colision a plataformas / objetos (this.plataforma.setCollideWorldBounds(true))
    this.physics.add.collider(this.personaje, this.plataformas);     

    //crea teclas // esto es para teclas como las flechas, la barra espaciadora y el enter
    this.cursor = this.input.keyboard.createCursorKeys();
    //agregar controles de teclado (w,d,s,a) uno a uno, se tiene que reemplazar la letra que va a ser por la que nueva letra, osea, tenes la W la cambias por la B
    //this.w = this.input.keyboard.addKey(Phaser.input)

    //crea grupo de recolectables/coleccionables
    this.recolectables = this.physics.add.group();
    //colision del personaje y los recolectables
    this.physics.add.collider(this.personaje, this.recolectables);
    //    VER
    {
    function collectObjetos (personaje, recolectables)
    {
        recolectables.disableBody(true, true);
    }
    }

    //agregar evento de 3 segundo
    this.time.addEvent({
      delay: 3000,
      callback: console.log("hola"),
      callback: this.onSecond,
      callbackScope: this,
      loop: true,
    });
  }

  onSecond() {
    //crear respawneo recolectable
    const tipos = ["triangulo","cuadrado","rombo"];
    const tipo = Phaser.Math.RND.pick(tipos);
    let recolectable = this.recolectables.create(
      Phaser.Math.Between(10, 790),
      0,
      tipo
    );
    recolectable.setVelocity(0, 100);
  }

  update() {
    //movimiento del personaje
    if (this.cursor.left.isDown) {
      this.personaje.setVelocityX(-160);
    } else if (this.cursor.right.isDown){
      this.personaje.setVelocityX(160);
    } else {
      this.personaje.setVelocityX(0);
    }
    if (this.cursor.up.isDown && this.personaje.body.touching.down) {
      this.personaje.setVelocityY(-330);
      }
  }
}