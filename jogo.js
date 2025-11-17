/* jogo.js - Lcgame (versão final pronta)
   - marca window.__lcgame_loaded = true quando inicializado
   - exibe uma cena inicial funcional: procurar chave, abrir porta
   - seguro contra erros (reporta no #error criado no index)
*/

(function(){
  'use strict';
  window.__lcgame_loaded = false;

  function safeReport(msg){
    try {
      console.error('[Lcgame] ' + msg);
      var e = document.getElementById('error');
      if(e){ e.style.display = 'block'; e.textContent = msg; }
    } catch(err){}
  }

  function init(){
    var container = document.getElementById('gameArea');
    if(!container){ safeReport('Elemento #gameArea não encontrado.'); return; }
    container.innerHTML = '';
    var panel = document.createElement('div');
    panel.style.color = '#e6eef8';
    panel.style.padding = '12px';
    panel.style.textAlign = 'center';

    var title = document.createElement('h2');
    title.textContent = 'Primeira Fase — Cela 01';
    panel.appendChild(title);

    var instr = document.createElement('p');
    instr.textContent = 'Objetivo: encontre a chave e abra a porta. Toque em "Procurar chave".';
    panel.appendChild(instr);

    var gameBox = document.createElement('div');
    gameBox.style.width = '100%';
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
