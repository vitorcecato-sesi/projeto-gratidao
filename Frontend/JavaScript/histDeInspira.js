// URL das Histórias
const apiURLHistorias = "http://localhost:3000/historias"

async function buscarHistoriaPalavra() {
    const userPalavraInput = document.getElementById("historiaPalavra")
    const userPalavra = userPalavraInput.value.trim()
    const containerHist = document.getElementById("historias-container")
    const msgLoading = document.getElementById("mensagemLoading")
    const msgNotFound = document.getElementById("historiaNaoEncontrada")

    // Verifica se possui um valor inserido
    if (!userPalavra) {
      alert("Por favor, preencha o campo para buscar a história.")
      return
    }

    msgLoading.style.display = "block"    

    try {
      const response = await fetch(`${apiURLHistorias}/${userPalavra}`)
      if (response.status === 404) {
        msgNotFound.style.display = "block"
      } else if (!response.ok) {
        const error = await response.json();
        alert(`Erro: ${error.error || "Erro desconhecido ao buscar usuário"}`);
      } else {
        const user = await response.json();
        userDetails.innerHTML = `
          <h2>Detalhes do Usuário</h2>
          <p><strong>ID:</strong> ${user.id}</p>
          <p><strong>Nome:</strong> ${user.nome}</p>
          <p><strong>Idade:</strong> ${user.idade}</p>
          <p><strong>Email:</strong> ${user.email}</p>
          <p><strong>Contato:</strong> ${user.contato}</p>
        `;
        console.log(user)
      }
    } catch (error) {
      alert("Erro ao buscar usuário. Verifique sua conexão.");
      userDetails.innerHTML = "";
    }
}