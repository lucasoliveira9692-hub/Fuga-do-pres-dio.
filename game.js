console.log("Lcgame iniciado");

// Exemplo simples para testar
document.getElementById("gameArea").innerHTML = `
  <h2>O ladrão acorda na cela...</h2>
  <p>Toque na tela para procurar uma forma de fugir!</p>
`;    lastObstacleAt: 0,
    obstacleInterval: 90, // frames
  };

  // jogador
  const player = {
    x: 0.5 * (canvas.width / (window.devicePixelRatio || 1)), // center
    y: (canvas.height / (window.devicePixelRatio || 1)) - 120,
    w: 40,
    h: 40,
    vx: 0,
    speed: 4,
    color: '#FFD54F'
  };

  // controles
  const keys = { left: false, right: false };
  window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') keys.left = true;
    if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') keys.right = true;
    if (!game.running && (e.key === ' ' || e.key === 'Enter')) startGame();
  });
  window.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') keys.left = false;
    if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') keys.right = false;
  });

  // botões touch (cria apenas em mobile)
  const touchControls = document.createElement('div');
  touchControls.style.position = 'absolute';
  touchControls.style.left = '0';
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
