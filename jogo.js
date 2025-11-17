console.log("Lcgame iniciado");

// Seleciona a área do jogo
const area = document.getElementById("areaDeJogo");

// Se não existir a área, mostra erro
if (!area) {
  console.error("ERRO: elemento 'areaDeJogo' não encontrado no HTML!");
  area.innerHTML = "<p style='color:red;'>Erro: área do jogo não foi encontrada.</p>";
  throw new Error("Elemento áreaDeJogo ausente");
}

// Sistema simples de progressão da fase
let pontos = 0;
let encontrouChave = false;

// Atualiza a área de jogo
function atualizarCena(texto) {
  area.innerHTML = `
    <div style="
      font-size: 20px;
      color: white;
      padding: 20px;
      text-align: center;
    ">
      ${texto}
    </div>
  `;
}

// Função para procurar a chave
function procurarChave() {
  if (Math.random() > 0.6) {
    encontrouChave = true;
    pontos += 50;
    atualizarCena("<h2>VOCÊ ACHOU A CHAVE! 🔑</h2><p>Agora abra a porta para fugir.</p>");
  } else {
    atualizarCena("<p>Nada encontrado. Continue procurando.</p>");
  }
  
  document.getElementById("pontos").innerText = pontos;
}

// Reinicia fase
function reiniciar() {
  encontrouChave = false;
  pontos = 0;
  document.getElementById("pontos").innerText = pontos;
  atualizarCena("<p>Procure a chave para escapar da cela…</p>");
}

// Executa pela primeira vez
atualizarCena("<p>Procure a chave para escapar da cela…</p>");
// Controles
let teclas = {};
document.addEventListener("keydown", e => teclas[e.key] = true);
document.addEventListener("keyup", e => teclas[e.key] = false);

// Movimentação
function moverJogador() {
  jogador.vx = 0;
  jogador.vy = 0;

  if (teclas["ArrowUp"]) jogador.vy = -jogador.velocidade;
  if (teclas["ArrowDown"]) jogador.vy = jogador.velocidade;
  if (teclas["ArrowLeft"]) jogador.vx = -jogador.velocidade;
  if (teclas["ArrowRight"]) jogador.vx = jogador.velocidade;

  jogador.x += jogador.vx;
  jogador.y += jogador.vy;

  // Limites
  jogador.x = Math.max(0, Math.min(canvas.width - jogador.w, jogador.x));
  jogador.y = Math.max(0, Math.min(canvas.height - jogador.h, jogador.y));
}

// Colisão
function colisao(a, b) {
  return (
    a.x < b.x + b.w &&
    a.x + a.w > b.x &&
    a.y < b.y + b.h &&
    a.y + a.h > b.y
  );
}

function atualizar() {
  moverJogador();

  // Pegando a chave
  if (!chave.pega && colisao(jogador, chave)) {
    chave.pega = true;
    document.getElementById("mensagem").innerText = "Você pegou a chave!";
  }

  // Abrindo porta
  if (chave.pega && colisao(jogador, porta)) {
    document.getElementById("mensagem").innerText =
      "Parabéns! Você escapou da primeira fase!";
  }

  desenhar();
  requestAnimationFrame(atualizar);
}

// Desenho do jogo
function desenhar() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Jogador
  ctx.fillStyle = jogador.cor;
  ctx.fillRect(jogador.x, jogador.y, jogador.w, jogador.h);

  // Chave
  if (!chave.pega) {
    ctx.fillStyle = chave.cor;
    ctx.fillRect(chave.x, chave.y, chave.w, chave.h);
  }

  // Porta
  ctx.fillStyle = porta.cor;
  ctx.fillRect(porta.x, porta.y, porta.w, porta.h);
}

atualizar();    gameBox.style.width = '100%';
    gameBox.style.height = '220px';
    gameBox.style.background = '#081824';
    gameBox.style.border = '1px solid rgba(255,255,255,0.03)';
    gameBox.style.borderRadius = '8px';
    gameBox.style.display = 'flex';
    gameBox.style.alignItems = 'center';
    gameBox.style.justifyContent = 'center';
    gameBox.style.flexDirection = 'column';
    panel.appendChild(gameBox);

    var status = document.createElement('div');
    status.textContent = 'Pontos: 0';
    status.style.marginTop = '10px';
    panel.appendChild(status);

    var btn = document.createElement('button');
    btn.textContent = 'Procurar chave';
    btn.className = 'btn';
    btn.style.marginTop = '12px';
    btn.onclick = function(){
      var found = Math.random() < 0.35;
      if(found){
        status.textContent = 'Você encontrou a CHAVE! Pontos +100';
        btn.style.display = 'none';
        var openBtn = document.createElement('button');
        openBtn.textContent = 'Abrir porta';
        openBtn.className = 'btn';
        openBtn.style.background = '#4ade80';
        openBtn.onclick = function(){
          gameBox.innerHTML = '<div style="color:#fff;font-weight:700">Porta aberta — você escapou desta cela!</div>';
          status.textContent = 'Pontos: 100';
        };
        panel.appendChild(openBtn);
      } else {
        status.textContent = 'Nada encontrado. Continue procurando.';
      }
    };

    var restart = document.createElement('button');
    restart.textContent = 'Reiniciar fase';
    restart.className = 'btn';
    restart.style.marginLeft = '8px';
    restart.style.background = 'transparent';
    restart.style.color = '#e6eef8';
    restart.style.border = '1px solid rgba(255,255,255,0.06)';
    restart.onclick = function(){ init(); };

    var ctrl = document.createElement('div');
    ctrl.style.marginTop = '12px';
    ctrl.appendChild(btn);
    ctrl.appendChild(restart);
    panel.appendChild(ctrl);

    container.appendChild(panel);

    // signal success
    window.__lcgame_loaded = true;
    console.log('[Lcgame] Inicializado com sucesso.');
  }

  // start safely when DOM ready
  if(document.readyState === 'complete' || document.readyState === 'interactive'){
    setTimeout(init, 40);
  } else {
    document.addEventListener('DOMContentLoaded', init);
  }

  // global error handlers
  window.addEventListener('error', function(e){ safeReport('Erro runtime: ' + (e.message || e)); });
  window.addEventListener('unhandledrejection', function(e){ safeReport('Promise rejeitada: ' + (e.reason && e.reason.message ? e.reason.message : e.reason)); });

})();
