// variáveis da bolinha;
let xBolinha = 400;
let yBolinha = 200;
let diametro = 20;
let raio = diametro / 2;

// variáveis da velocidade da bolinha;
let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;

// variáveis da raquete;
let xRaquete = 4;
let yRaquete = 150;
let raqueteComprimento = 10;
let raqueteAltura = 90;

// variáveis da raquete do oponente;
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let velocidadeYOponente;

//placar do jogo;
let meusPontos = 0;
let pontosOponente = 0;

//sons do jogo;
let raquetada;
let ponto;
let trilha;

let colidiu = false;
let c = color = (255, 204, 0);
let orange = c;

function preload(){
  trilha = loadSound ("trilha.mp3");
  ponto = loadSound ("ponto.mp3");
  raquetada = loadSound ("raquetada.mp3");

}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0);
  mostraBolinha();
  movimentaBolinha();
  verificaColisaoBorda();
  mostraRaquete(xRaquete, yRaquete);
  movimentaMinhaRaquete();
  //verificaColisaoRaquete();
  colisaoRaqueteBiblioteca(xRaquete, yRaquete);
  colisaoRaqueteBiblioteca(xRaqueteOponente, yRaqueteOponente);
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentaRaqueteOponente();
  incluiPlacar();
  marcaPonto();


function mostraBolinha(){
    circle(xBolinha, yBolinha, diametro)
  }

  function movimentaBolinha(){
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
  }
}


function verificaColisaoBorda(){
   if (xBolinha + raio > width ||
     xBolinha - raio < 0){
  velocidadeXBolinha *= -1;
  }
  if (yBolinha + raio > height ||
      yBolinha - raio< 0){
    velocidadeYBolinha *= -1;
  }
}

function mostraRaquete(x, y){
  rect (x, y, raqueteComprimento, raqueteAltura);
}


function movimentaMinhaRaquete(){
  if (keyIsDown(UP_ARROW)){
      yRaquete -= 10;
}
  if (keyIsDown(DOWN_ARROW)){
      yRaquete += 10;
  }
}

function  movimentaRaqueteOponente(){
  velocidadeYOponente = yBolinha - yRaqueteOponente - raqueteComprimento / 2 - 30;
  yRaqueteOponente += velocidadeYOponente;
}

function verificaColisaoRaquete(){
  if (xBolinha - raio < xRaquete + raqueteComprimento && yBolinha - raio < yRaquete + raqueteAltura && yBolinha + raio > yRaquete){
    velocidadeXBolinha *= -1
    raquetada.play();
  }
}

function colisaoRaqueteBiblioteca(x, y){
  colidiu =
  collideRectCircle(x, y, raqueteComprimento, raqueteAltura, xBolinha, yBolinha, raio);
  if (colidiu) {
    velocidadeXBolinha *= -1
    raquetada.play();
  }
}

function incluiPlacar(){
  stroke (255);
  textAlign(CENTER);
  textSize (16);
  fill (255, 140, 0);
  rect (130, 10, 40, 20);
  fill (255);
  text(meusPontos, 150, 26);
  fill (255, 140, 0);
  rect (430, 10, 40, 20);
  fill (255);
  text(pontosOponente, 450, 26);
}

function marcaPonto(){
  if (xBolinha > 590){
    meusPontos += 1
    ponto.play();
  }
  if (xBolinha < 10){
    pontosOponente += 1
    ponto.play();
  }
}
