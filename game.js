/* jogo.js - versão corrigida e segura para LCgame
   - Define window.__lcgame_loaded = true quando carregar
   - Captura e exibe erros no elemento #error (se existir)
   - Inicializa um jogo mínimo (texto + botão iniciar)
*/

(function(){
  'use strict';

  // sinaliza carregamento (usado pelo index.html para detectar sucesso)
  window.__lcgame_loaded = false;

  // util: exibir erro amigável na tela (se existir #error) e no console
  function reportError(msg) {
    try {
      console.error('[Lcgame] ' + msg);
      var errEl = document.getElementById('error') || document.createElement('div');
      errEl.id = 'error';
      errEl.style.color = '#ff6b6b';
      errEl.style.marginTop = '10px';
      errEl.textContent = 'Erro: ' + msg;
      if (!document.getElementById('error')) {
        var status = document.getElementById('status');
        if (status && status.parentNode) status.parentNode.appendChild(errEl);
        else {
          var ga = document.getElementById('gameArea');
          if (ga) ga.appendChild(errEl);
        }
      }
    } catch(e){ console.warn('Falha ao reportar erro visualmente', e); }
  }

  // função segura para iniciar o conteúdo do jogo
  function initGameSafe() {
    try {
      initGame();
    } catch (e) {
      reportError('Erro ao iniciar jogo: ' + (e && e.message ? e.message : e));
    }
  }

  // ---------------------------
  // Conteúdo do jogo mínimo
  // ---------------------------
  function initGame() {
    // remover mensagem antiga
    var container = document.getElementById('gameArea');
    if (!container) {
      reportError('Elemento #gameArea não encontrado.');
      return;
    }
    container.innerHTML = ''; // limpa "Carregando..."

    // criar um painel simples com texto e botão
    var panel = document.createElement('div');
    panel.style.color = '#fff';
    panel.style.padding = '12px';
    panel.style.textAlign = 'center';
    panel.style.width = '100%';

    var title = document.createElement('h2');
    title.textContent = 'Primeira Fase: Cela 01';
    title.style.margin = '6px 0 8px 0';
    panel.appendChild(title);

    var desc = document.createElement('p');
    desc.textContent = 'Toque na porta para tentar abrir. Encontre a chave na cela!';
    desc.style.margin = '6px 0 12px 0';
    panel.appendChild(desc);

    // área do "jogo" (canvas)
    var gameBox = document.createElement('div');
    gameBox.style.width = '100%';
    gameBox.style.height = '220px';
    gameBox.style.background = '#0b1220';
    gameBox.style.border = '2px solid rgba(255,255,255,0.04)';
    gameBox.style.borderRadius = '6px';
    gameBox.style.position = 'relative';
    gameBox.style.display = 'flex';
    gameBox.style.alignItems = 'center';
    gameBox.style.justifyContent = 'center';
    gameBox.style.flexDirection = 'column';

    panel.appendChild(gameBox);

    // texto com o estado
    var stateText = document.createElement('div');
    stateText.textContent = 'Você está na cela. Pontos: 0';
    stateText.style.marginTop = '8px';
    panel.appendChild(stateText);

    // botão "procurar chave"
    var btn = document.createElement('button');
    btn.textContent = 'Procurar chave';
    btn.style.padding = '10px 16px';
    btn.style.borderRadius = '8px';
    btn.style.border = 'none';
    btn.style.background = '#1ea7ff';
    btn.style.color = '#022034';
    btn.style.fontWeight = '700';
    btn.style.marginTop = '10px';
    btn.onclick = function(){
      // lógica simples: 30% de chance de achar a chave
      var found = Math.random() < 0.30;
      if (found) {
        stateText.textContent = 'Você encontrou a CHAVE! Abra a porta agora.';
        // substituir botão por botão abrir porta
        btn.style.display = 'none';
        var openBtn = document.createElement('button');
        openBtn.textContent = 'Abrir porta';
        openBtn.style.padding = '10px 16px';
        openBtn.style.borderRadius = '8px';
        openBtn.style.border = 'none';
        openBtn.style.background = '#4ade80';
        openBtn.style.color = '#022034';
        openBtn.onclick = function(){
          // vitória simples: avançar de fase (exemplo)
          gameBox.innerHTML = '<div style="color:#fff;font-weight:700">Porta aberta — você escapou desta cela!</div>';
          stateText.textContent = 'Pontos: 100';
        };
        panel.appendChild(openBtn);
      } else {
        // não achou; mensagem temporária
        stateText.textContent = 'Nada aqui... continue procurando.';
        // ligeira animação de esperança
        btn.style.transform = 'scale(0.98)';
        setTimeout(()=> btn.style.transform = '', 120);
      }
    };

    // botão reiniciar/novo jogo
    var restart = document.createElement('button');
    restart.textContent = 'Reiniciar Fase';
    restart.style.padding = '8px 12px';
    restart.style.marginLeft = '8px';
    restart.style.borderRadius = '8px';
    restart.style.border = '1px solid rgba(255,255,255,0.06)';
    restart.style.background = 'transparent';
    restart.style.color = '#fff';
    restart.onclick = function(){
      // reset simples: re-executar initGame
      initGame();
    };

    var controls = document.createElement('div');
    controls.style.marginTop = '12px';
    controls.appendChild(btn);
    controls.appendChild(restart);

    panel.appendChild(controls);

    // append panel to container
    container.appendChild(panel);

    // sinaliza carregamento OK
    window.__lcgame_loaded = true;
    console.log('[Lcgame] jogo inicializado com sucesso.');
  }

  // registrar handlers de segurança: se houver erro, mostrar
  window.addEventListener('error', function(ev){
    reportError('Erro runtime: ' + (ev.message || ev.error || ev.filename));
  });

  window.addEventListener('unhandledrejection', function(ev){
    reportError('Promise rejeitada: ' + (ev.reason && ev.reason.message ? ev.reason.message : ev.reason));
  });

  // inicia após pequena espera (garante que DOM esteja pronto)
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setTimeout(initGameSafe, 50);
  } else {
    document.addEventListener('DOMContentLoaded', initGameSafe);
  }

})();  touchControls.style.left = '0';
  touchControls.style.right = '0';
  touchControls.style.bottom = '10px';
  touchControls.style.height = '120px';
  touchControls.style.pointerEvents = 'none';
  touchControls.style.display = 'flex';
  touchControls.style.justifyContent = 'space-between';
  touchControls.style.padding = '0 10px';
  container.style.position = 'relative';
  container.appendChild(touchControls);

  function makeTouchButton(side, label) {
    const btn = document.createElement('div');
    btn.innerText = label;
    btn.style.width = '46%';
    btn.style.height = '100%';
    btn.style.background = 'rgba(255,255,255,0.06)';
    btn.style.borderRadius = '10px';
    btn.style.display = 'flex';
    btn.style.alignItems = 'center';
    btn.style.justifyContent = 'center';
    btn.style.fontSize = '20px';
    btn.style.color = 'white';
    btn.style.pointerEvents = 'auto';
    btn.style.userSelect = 'none';
    btn.addEventListener('touchstart', (e) => {
      e.preventDefault();
      if (side === 'left') keys.left = true;
      else keys.right = true;
    }, { passive: false });
    btn.addEventListener('touchend', (e) => {
      e.preventDefault();
      if (side === 'left') keys.left = false;
      else keys.right = false;
    }, { passive: false });
    return btn;
  }
  // adiciona apenas em telas pequenas
  if (window.innerWidth < 900) {
    touchControls.appendChild(makeTouchButton('left', '◀'));
    touchControls.appendChild(makeTouchButton('right', '▶'));
  }

  // desenhar HUD (placar)
  function drawHUD() {
    ctx.fillStyle = 'white';
    ctx.font = '18px Arial';
    ctx.textAlign = 'left';
    ctx.fillText('Score: ' + Math.floor(game.score), 10, 28);
    if (!game.running) {
      ctx.fillStyle = 'rgba(0,0,0,0.6)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'white';
      ctx.textAlign = 'center';
      ctx.font = '32px Arial';
      ctx.fillText('Toque ou pressione Enter para começar', canvas.width / 2, canvas.height / 2 - 20);
    }
  }

  // cria obstáculo
  function spawnObstacle() {
    const width = 30 + Math.random() * 80;
    const x = Math.random() * ((canvas.width / (window.devicePixelRatio || 1)) - width - 20) + 10;
    const h = 20 + Math.random() * 50;
    game.obstacles.push({
      x,
      y: -h,
      w: width,
      h: h,
      color: '#E57373'
    });
  }

  // lógica do jogo
  function update() {
    game.frame++;
    if (!game.running) return;

    // mover jogador
    player.vx = 0;
    if (keys.left) player.vx = -player.speed;
    if (keys.right) player.vx = player.speed;
    player.x += player.vx;

    // limites
    const maxX = (canvas.width / (window.devicePixelRatio || 1)) - player.w - 6;
    player.x = Math.max(6, Math.min(maxX, player.x));

    // gerar obstáculos
    if (game.frame - game.lastObstacleAt > game.obstacleInterval) {
      spawnObstacle();
      game.lastObstacleAt = game.frame;
      // reduzir intervalo com o tempo para ficar mais difícil
      if (game.obstacleInterval > 40 && (game.frame % 600 === 0)) {
        game.obstacleInterval -= 4;
      }
    }

    // mover obstáculos e detectar colisão
    const speedY = game.speed + Math.floor(game.frame / 600);
    for (let i = game.obstacles.length - 1; i >= 0; i--) {
      const o = game.obstacles[i];
      o.y += speedY;
      // colisão AABB
      if (o.x < player.x + player.w &&
          o.x + o.w > player.x &&
          o.y < player.y + player.h &&
          o.y + o.h > player.y) {
        // colisão -> fim
        game.running = false;
      }
      // saiu da tela
      if (o.y > (canvas.height / (window.devicePixelRatio || 1)) + 50) {
        game.obstacles.splice(i, 1);
        game.score += 10;
      }
    }

    // pontuação contínua
    game.score += 0.02;
  }

  // desenhar tudo
  function render() {
    // limpa
    ctx.fillStyle = '#111';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // desenha jogador (retângulo)
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.w, player.h);
    // olhos
    ctx.fillStyle = '#222';
    ctx.fillRect(player.x + 8, player.y + 10, 8, 8);
    ctx.fillRect(player.x + 24, player.y + 10, 8, 8);

    // desenhar obstáculos
    for (const o of game.obstacles) {
      ctx.fillStyle = o.color;
      ctx.fillRect(o.x, o.y, o.w, o.h);
    }

    drawHUD();

    if (!game.running) {
      // botão reiniciar
      ctx.fillStyle = 'rgba(255,255,255,0.06)';
      ctx.fillRect((canvas.width/2) - 80, (canvas.height/2)+10, 160, 44);
      ctx.fillStyle = 'white';
      ctx.font = '20px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('Reiniciar', canvas.width/2, (canvas.height/2)+40);
    }
  }

  // loop
  function loop() {
    update();
    render();
    requestAnimationFrame(loop);
  }

  // inicia jogo (reset)
  function startGame() {
    game.running = true;
    game.score = 0;
    game.frame = 0;
    game.obstacles = [];
    game.lastObstacleAt = 0;
    game.obstacleInterval = 90;
    player.x = ((canvas.width / (window.devicePixelRatio || 1)) - player.w) / 2;
  }

  // toque no canvas para iniciar / reiniciar
  canvas.addEventListener('touchstart', (e) => {
    e.preventDefault();
    if (!game.running) startGame();
    // detectar toque em reiniciar (área central)
    const rect = canvas.getBoundingClientRect();
    const tx = e.touches[0].clientX - rect.left;
    const ty = e.touches[0].clientY - rect.top;
    if (!game.running &&
        tx > (rect.width/2 - 80) &&
        tx < (rect.width/2 + 80) &&
        ty > (rect.height/2 + 10) &&
        ty < (rect.height/2 + 54)) {
      startGame();
    }
  }, { passive: false });

  // clique do mouse (para testar no desktop)
  canvas.addEventListener('mousedown', (e) => {
    if (!game.running) startGame();
    // clique em reiniciar
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    if (!game.running &&
        mx > (rect.width/2 - 80) &&
        mx < (rect.width/2 + 80) &&
        my > (rect.height/2 + 10) &&
        my < (rect.height/2 + 54)) {
      startGame();
    }
  });

  // iniciar loop
  loop();

  // mensagem no console
  console.log('Lcgame iniciado');

})();
