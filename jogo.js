console.log("[Lcgame] Script iniciado.");

function init() {
  const area = document.getElementById("areaDeJogo");

  if (!area) {
    console.error("ERRO: elemento areaDeJogo não encontrado!");
    return;
  }

  // Painel principal
  area.innerHTML = `
    <h2>Primeira Fase — Cela 01</h2>
    <p>Objetivo: encontre a chave e abra a porta.</p>

    <div id="painelJogo" style="
      width: 100%;
      height: 220px;
      background: #0a1824;
      border: 1px solid rgba(255,255,255,0.1);
      border-radius: 8px;
      margin-top: 15px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      color: white;
      font-size: 18px;
    ">
      Toque em "Procurar chave".
    </div>

    <p id="status" style="margin-top:12px;font-size:18px;color:#fff;">
      Pontos: 0
    </p>

    <div style="margin-top: 12px;">
      <button id="btnProcurar" class="btn">Procurar chave</button>
      <button id="btnReiniciar" class="btn" style="
        margin-left: 8px;
        background: transparent;
        color: #e6eef8;
        border: 1px solid rgba(255,255,255,0.2);
      ">Reiniciar fase</button>
    </div>
  `;

  let pontos = 0;
  let achou = false;

  const painel = document.getElementById("painelJogo");
  const status = document.getElementById("status");
  const btnProcurar = document.getElementById("btnProcurar");
  const btnReiniciar = document.getElementById("btnReiniciar");

  // Procurar chave
  btnProcurar.onclick = () => {
    if (Math.random() < 0.35) {
      achou = true;
      pontos = 100;
      status.textContent = "Pontos: 100";
      painel.innerHTML = `<strong style="color:#4ade80;">VOCÊ ENCONTROU A CHAVE! 🔑</strong>`;
      btnProcurar.style.display = "none";

      // Botão abrir porta
      const abrir = document.createElement("button");
      abrir.textContent = "Abrir porta";
      abrir.className = "btn";
      abrir.style.marginTop = "15px";
      abrir.style.background = "#4ade80";

      abrir.onclick = () => {
        painel.innerHTML = `<strong style="color:#fff;">Porta aberta! Você escapou da cela! 🚪</strong>`;
      };

      painel.appendChild(abrir);
    } else {
      painel.innerHTML = "Nada encontrado. Continue procurando.";
    }
  };

  // Reiniciar
  btnReiniciar.onclick = () => {
    pontos = 0;
    achou = false;
    status.textContent = "Pontos: 0";
    btnProcurar.style.display = "inline-block";
    painel.innerHTML = `Toque em "Procurar chave".`;
  };

  console.log("[Lcgame] Inicializado.");
}

document.addEventListener("DOMContentLoaded", init);
