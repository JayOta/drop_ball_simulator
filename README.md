<h1>Mecânica Clássica de Newton e a Integração de Euler</h1>
<br>
<h2><bold>1. A Gravidade é uma Aceleração(g), não uma Velocidade</bold></h2>
<p>Este é o erro mais comum. A gravidade não diz "mova-se a 10km/h". Ela diz "aumente sua velocidade em 10km/h a cada segundo".</p>
<br>
<ul>
    <li>Velocidade (v): É o quanto a posição muda no tempo</li>
    <li>Aceleração (a): É o quanto a <bold>velocidade<bold> muda no tempo</li>
</ul>
<br>
<i>Na Terra, a gravidade é aproximadamente $9.8 \, m/s^2$. No seu Canvas, você escolherá um valor arbitrário (ex: $0.5$) para ser o seu "puxão" constante para baixo a cada frame.</i>

<br><br>

<h2><bold>2. O ciclo de Movimento (A cada Frame)</bold></h2>

<p>Para a bola cair de forma realista, você precisa seguir esta sequência lógica dentro de um loop de animação:</p>
<br>

<p>1. <bold>Atualizar a Velocidade:</bold> Você soma o valor da velocidade à velocidade atual da bola.</p>
<br>
<i>V_final = V_inicial + g</i>
<br>
<p>2. <bold>Atualizar a Posição:</bold>Você soma essa velocidade a posição Y da bola.</bold></p>
<br>
<i>Y_final = Y_inicial + V_final</i>
<br><br>

<h2><bold>3. O conceito de Resistência e Colisão</bold></bold></h2>
<p>Sem uma interrupção, a bola aceleraria infinitamente e atravessaria o chão. Para o simulador, você precisa considerar:</p>
<br>
<ul>
    <li><bold>O limite do chão:</bold> Você deve verificar constantemente: "A posição y da bola + o raio dela é maior ou igual à posição y do chão?".</li>
    <li><bold>Estado de Repouso:</bold> Quando ela toca o chão, a velocidade dela deve ser zerada (v = 0) e a posição deve ser ajustada para ficar exatamente "encostada" na superfície, para evitar que ela afunde um pouco a cada frame por causa da gravidade acumulada.</li>
</ul>
<br><br>

<h2><bold>4. O fator "Tempo" (Frame Rate)</bold></bold></h2>
<p>
Em um código estático, você desenha uma vez. Em um simulador, você precisa de um <bold>Loop de Animação</bold> (geralmente <code>requestAnimationFrame</code>). A gravidade só "funciona" se houver uma sucessão de cálculos rápidos (geralmente 60 vezes por segundo) que criam a ilusão de movimento fluido.
</p>
