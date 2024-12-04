// URL das Histórias
const apiURLHistorias = "http://localhost:3000/historias";

async function buscarHistoriaPalavra() {
  const userPalavraInput = document.getElementById("historiaPalavra");
  const userPalavra = userPalavraInput.value.trim();
  const containerHist = document.getElementById("historias-container");
  const msgLoading = document.getElementById("mensagemLoading");
  const msgNotFound = document.getElementById("historiaNaoEncontrada");

  // Verifica se possui um valor inserido
  if (!userPalavra) {
    alert("Por favor, preencha o campo para buscar a história.");
    return;
  }

  msgLoading.style.display = "block";

  try {
    const response = await fetch(`${apiURLHistorias}/${userPalavra}`);
    if (response.status === 404) {
      msgNotFound.style.display = "block";
    } else if (!response.ok) {
      const error = await response.json();
      alert(`Erro: ${error.error || "Erro desconhecido ao buscar história"}`);
    } else {
      // Obtém dados das histórias
      const historias = await response.json();
      console.log(historias);

      historias.forEach((data) => {
        // Criação de section para organização de dados
        const paginaHistoria = document.createElement("section");
        paginaHistoria.className = "paginaHistoria";
        containerHist.appendChild(paginaHistoria);

        // Criação de titulo para historia
        const tituloHistoria = document.createElement("h3");
        tituloHistoria.textContent = data.titulo;
        paginaHistoria.appendChild(tituloHistoria);

        // Criação de paragrafo para historia
        const paragrafoHistoria = document.createElement("p");
        paragrafoHistoria.textContent = data.historia;
        paginaHistoria.appendChild(paragrafoHistoria);

        // Criação de imagem para historia
        const imagemHistoria = document.createElement("img");
        imagemHistoria.src = data.imagemURL;
        imagemHistoria.alt = `Imagem de ${historias.titulo}`;
        paginaHistoria.appendChild(imagemHistoria);
      });
    }
  } catch (error) {
    alert("Erro ao buscar histórias. Verifique sua conexão.");
  }
  msgLoading.style.display = "none";
}
