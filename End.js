export default class End extends Phaser.Scene {
    constructor(){
        super("end");
    }
init(data) { //Cargar data de puntaje y condicion de Game Over
    this.score = data.score;
    this.gameOver= data.gameOver;
}
create() {
    this.add
    .text(400, 300, this.gameOver ? "Game Over" : "You Win", { //Pregunta la situacion de Game Over para saber que texto mostrar (Reemplazo del if) 
        fontSize: "40px",
        color: "#ffffff",
    })
    .setOrigin[0.5];

    this.add.text(400, 350, `Score ${this.score}`); //Texto de puntaje
}

}