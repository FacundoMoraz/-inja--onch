// URL to explain PHASER scene: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/scene/

export default class Game extends Phaser.Scene {
  constructor() {
    super("main");
  }

  init() {
    this.gameOver = false;
    this.timer = 10; // son segundos
  }

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

  create() { // todo lo que agrega algo en la pantalla va en el create
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
    this.physics.add.collider(this.personaje, this.plataformas);// en los dos primero lugares dentro de este parentesis van los objetos que cuentan con la capacidad de colicionar entre si, en caso de ser varios objetos ponerlos dontro de un grupo y luego ponmer el nombre de ese grupo. Ademas en le puesto tres va la funcion callback que va a a hacer algo que nosotros definamos que haga, en el puesto cuatro va el "null" que es un codicier, y por ultimo el quinto puesto va el "this" que indica que funcion va a usar en una proxima funcion en caso que este seguido    


    //crea teclas // esto es para teclas como las flechas, la barra espaciadora y el enter
    this.cursor = this.input.keyboard.createCursorKeys();
    //agregar controles de teclado (w,d,s,a) uno a uno, se tiene que reemplazar la letra que va a ser por la que nueva letra, osea, tenes la W la cambias por la B
    //this.w = this.input.keyboard.addKey(Phaser.input)

    //crea grupo de recolectables/coleccionables
    this.recolectables = this.physics.add.group();
    //colision del personaje y los recolectables
    this.physics.add.collider(this.personaje, this.recolectables);
    

    //reinicio
    this.r = this.input.keyboard.addkey(Phaser.Input.Keyboard.Keycodes.R);


    //agregar evento de 3 segundo
    this.time.addEvent({
      delay: 3000,
      callback: console.log("hola"),
      callback: this.onSecond,
      callbackScope: this,
      loop: true,
    });
      //evento de 1 segungo
    this.time.addEvent({
      delay: 1000,
      callback: this.handlerTimer,
      callbackScope: this,
      loop: true,
    });

    //agregar texto de timer en la esquina superior derechaq
    this.timerText = this.add.text(10, 10, `TIEMPO RESTANTE: ${this.timer}` , {
      fontSize: "32px",
      fill: "·fff",
    });
  }

  onSecond() {
    //crear respawneo recolectable   // funcion callback
    const tipos = ["triangulo","cuadrado","rombo"];
    const tipo = Phaser.Math.RND.pick(tipos);
    let recolectable = this.recolectables.create(
      Phaser.Math.Between(10, 790),
      0,
      tipo
    );
    recolectable.setVelocity(0, 100);
  }

  onSecondCollect(personaje, recolectable, ) {
    console.log("recolectables ", recolectable.texture.key)
    recolectable.destroy(); //se puede usar destroy o disable
  }
handleTimer() {
      this.timer -= 1;
      this.timerText.setText(`tiempo restante: ${this.timer}`);
      if (this.timer === 0) {
        this.gameOver = false;
      }
    }

  update() {
    if (this.gameOver && this.r.isDown) {
      this.Scene.restart();
    }
if (this.gameOver) {
  this.physics.pause();
    this.timerText.setText("Game Over")
    return;
}

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
