console.log("Lcgame iniciado");

// pega área do jogo
const area = document.getElementById("areaDeJogo");

// testa se existe
if (!area) {
  document.body.innerHTML += "<p style='color:red'>Erro: área do jogo não encontrada.</p>";
  throw new Error("areaDeJogo não existe");
}

// estado do jogo
let pontos = 0;
let encontrouChave = false;

// função para atualizar a tela
function atualizarCena(texto) {
  area.innerHTML = `
    <div style="padding:20px; color:white; text-align:center;">
      ${texto}
    </div>
  `;
}

// função procurar chave
function procurarChave() {
  const achou = Math.random() > 0.6;

  if (achou) {
    encontrouChave = true;
    pontos += 50;
    atualizarCena("<h2>VOCÊ ENCONTROU A CHAVE! 🔑</h2>");
  } else {
    atualizarCena("<p>Nada encontrado... continue procurando.</p>");
  }

  document.getElementById("pontos").innerText = pontos;
}

// reiniciar fase
function reiniciar() {
  encontrouChave = false;
  pontos = 0;
  atualizarCena("<p>Procure a chave para escapar!</p>");
  document.getElementById("pontos").innerText = "0";
}

// inicia a primeira cena
atualizarCena("<p>Procure a chave para escapar!</p>");
