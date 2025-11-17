Lcgame — Pacote final pronto para GitHub Pages
============================================

Arquivos incluidos:
- index.html           (carrega jogo com proteção e desregistra SWs antigos)
- jogo.js              (jogo principal - funcional e seguro)
- service-worker.js    (service worker minimal)
- manifest.json
- icone-192.png
- icone-512.png
- README.txt

Como publicar:
1) No seu repositório GitHub (raiz), faça upload de TODOS os arquivos acima (Add file -> Upload files).
2) Confirme commit diretamente na branch principal (main/principal).
3) Em Settings -> Pages, confirme: Branch = main (ou principal), Folder = /(root).
4) Aguarde 30-90 segundos. Abra o link do Pages em aba anônima:
   https://<seu-usuario>.github.io/<nome-do-repositorio>/
5) Se ver "Carregando jogo..." por muito tempo, abra em anônima (isso ignora SW antigo).

Observações:
- Este pacote foi preparado para minimizar problemas com cache/service workers.
- Se quiser eu posso gerar outro pacote com seus ícones reais (envie os PNGs).
