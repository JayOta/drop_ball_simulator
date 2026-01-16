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
    this.isRunning = false;
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
    if (
      xmouse > this.xpos &&
      xmouse < this.xpos + this.width &&
      ymouse > this.ypos &&
      ymouse < this.ypos + this.height &&
      !this.isRunning
    ) {
      // Se a distância menor ou igual a do Botão
      startLoop(); // Começamos a simulação
    }
  }
}

class Message {
  constructor(
    pos_x,
    pos_y,
    width,
    height,
    text,
    value,
    color,
    choose_background
  ) {
    this.pos_x = pos_x;
    this.pos_y = pos_y;
    this.width = width;
    this.height = height;
    this.text = text;
    this.value = value;
    this.color = color;
    this.choose_background = choose_background;
  }

  draw(ctx) {
    ctx.beginPath();
    this.setBackground(this.choose_background);
    ctx.fillStyle = this.color; // cor dos textos
    ctx.font = "14px monospace"; // tipo e tamanho da fonte
    ctx.strokeRect(this.pos_x, this.pos_y, this.width * 1.2, this.height); // posição e tamanho da borda
    ctx.fillText(
      this.text,
      this.pos_x + 5, // posição x + 5
      this.pos_y + this.height / 2 + 5, // posição do meio do botão + 5
      this.width - 2 // largura - 2
    ); // desenha o texto
    ctx.fillText(
      this.value,
      this.pos_x + this.width - 15, // posição x + largura do botão - 15
      this.pos_y + this.height / 2 + 5, // posição do meio do botão + 5
      this.width - 2 // largura - 5
    ); // desenha o texto
    ctx.stroke(); // desenha a borda
    ctx.closePath();
  }

  setBackground(background) {
    if (background) {
      ctx.strokeStyle = this.color;
    } else {
      ctx.fillStroke = "";
    }
  }

  changeMessage(message, color) {
    this.text = message;
    this.color = color;
    console.log("message: " + message);
    this.draw(ctx);
  }
  changeValue(value, color) {
    this.value = value;
    this.color = color;
    console.log("value: " + this.value);
    this.draw(ctx);
  }
}

class Ball {
  constructor(xpos, ypos, radius, velocity, color) {
    this.xpos = xpos;
    this.ypos = ypos;
    this.radius = radius;
    this.velocity = velocity;
    this.color = color;
    this.fallTimer = 0;
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
      this.fallTimer += 1 / 60; // controla o tempo em que a bola está descendo
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
let fall_time_msg = new Message(
  canvas.width - 300,
  40,
  100,
  50,
  "Fall time: ",
  ball.fallTimer,
  "#fff",
  true
);
floor.draw(ctx);
button.draw(ctx);
fall_time_msg.draw(ctx);
ball.draw(ctx);

canvas.addEventListener("click", (Event) => {
  const rect = canvas.getBoundingClientRect();
  const x = Event.clientX - rect.left; // Pega a posição X do cliente ao clicar
  const y = Event.clientY - rect.top; // Pega a posição Y do cliente ao clicar
  button.clickButton(x, y); // Utilizamos a função com essas posições
});

function startLoop() {
  button.isRunning = true;
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpa a tela
  floor.draw(ctx); // Desenha o Chão
  button.draw(ctx); // Desenha o Botão
  ball.draw(ctx); // Desenha a Bola
  fall_time_msg.changeValue(ball.fallTimer.toFixed(2), "#fff");
  console.log("ball.ypos: " + ball.ypos + "\n" + "floor.ypos: " + floor.ypos);
  ball.update(floor); // Atualiza a Bola
  requestAnimationFrame(startLoop); // Reinicia a função em 60 FPS (Frames por Segundo)
}
