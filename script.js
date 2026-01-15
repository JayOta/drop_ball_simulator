let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

canvas.style.backgroundColor = "#000";

class Button {
  constructor(xpos, ypos, width, height, background_color, text_color, text) {
    this.xpos = xpos;
    this.ypos = ypos;
    this.width = width;
    this.height = height;
    this.background_color = background_color;
    this.text_color = text_color;
    this.text = text;
  }
  draw(ctx) {
    ctx.beginPath();
    ctx.fillStyle = this.background_color;
    ctx.fillRect(this.xpos, this.ypos, this.width, this.height);
    ctx.font = "20px monospace";
    ctx.fillStyle = this.text_color;
    ctx.fillText("Start", this.xpos + 20, this.ypos * 1.75, this.width - 2);
    ctx.closePath();
  }

  changeColor(color) {
    this.color = color;
    this.draw(ctx);
  }

  clickButton(xmouse, ymouse) {
    let distance = Math.sqrt(
      (xmouse - this.xpos) * (xmouse - this.xpos) +
        (ymouse - this.ypos) * (ymouse - this.ypos)
    ); // Atualizar função para pegar melhor o clique no Retângulo

    if (distance <= this.width * this.height) {
      // Se a distância menor ou igual a do Botão
      startLoop(); // Começamos a simulação
    }
  }
}

class Ball {
  constructor(xpos, ypos, radius, velocity, color) {
    this.xpos = xpos;
    this.ypos = ypos;
    this.radius = radius;
    this.velocity = velocity;
    this.color = color;
    this.gravity = 0.5;
  }
  draw(ctx) {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.xpos, this.ypos, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
  }
  updateVelocity(floor) {
    if (this.ypos + this.radius >= floor.ypos) {
      // Se a bola estiver dentro ou ultrapassar o chão ->
      this.velocity = 0; // para a bola (zeramos a velocidade)
      this.ypos = floor.ypos - this.radius; // e voltamos a posição da bola de forma que ela encoste no chão -> (altura do chão - raio da bola)
    } else {
      this.velocity += this.gravity; // caso contrário a bola continua caindo (velocidade continua aumentando)
    }
  }

  updatePosition(ypos) {
    this.ypos = ypos + this.velocity; // -> (dy) | Atualizamos a posição da bola com base na sua 'altura' e 'velocidade'
  }

  update(floor) {
    this.updateVelocity(floor); // Atualiza a velocidade
    this.updatePosition(this.ypos); // Atualiza a Posição
    this.draw(ctx); // Desenha o objeto (Bola)
  }
}

class Floor {
  constructor(xpos, ypos, width, height, color) {
    this.xpos = xpos;
    this.ypos = ypos;
    this.width = width;
    this.height = height;
    this.color = color;
  }
  draw(ctx) {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.fillRect(this.xpos, this.ypos, canvas.width, this.height);
    ctx.closePath();
  }
}

let floor = new Floor(0, canvas.height - 20, canvas.width, 20, "#fff");
let button = new Button(
  canvas.width - 150,
  40,
  100,
  50,
  "#fff",
  "#000",
  "Start"
);
let ball = new Ball(canvas.width / 2, 100, 30, 2, "#fff");
floor.draw(ctx);
button.draw(ctx);
ball.draw(ctx);

canvas.addEventListener("click", (Event) => {
  const rect = canvas.getBoundingClientRect();
  const x = Event.clientX - rect.left; // Pega a posição X do cliente ao clicar
  const y = Event.clientY - rect.top; // Pega a posição Y do cliente ao clicar
  button.clickButton(x, y); // Utilizamos a função com essas posições
});

function startLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpa a tela
  floor.draw(ctx); // Desenha o Chão
  button.draw(ctx); // Desenha o Botão
  ball.draw(ctx); // Desenha a Bola
  ball.update(floor); // Atualiza a Bola
  requestAnimationFrame(startLoop); // Reinicia a função em 60 FPS (Frames por Segundo)
}
