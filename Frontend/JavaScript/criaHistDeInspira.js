const apiURLHist = "http://localhost:3000/historia"

async function criarHistoriaGratidao() {

    // Pega elementos
    const msgSucesso = document.getElementById("addSucesso")

    // Obtém os inputs
    const inputTitulo = document.getElementById("userTituloGratidao")
    const inputHistoria = document.getElementById("userHistoriaGratidao")
    const inputImagem = document.getElementById("userImagemGratidao")

    // Retira os espaços desnecessários das mensagens
    const titulo = inputTitulo.value.trim()
    const historia = inputHistoria.value.trim()
    const imagemURL = inputImagem.value.trim()

    msgSucesso.style.display = "none"

    // Confere se os campos foram preenchidos
    if (!titulo && !historia) {
        alert("Por favor, preencha todos os campos corretamente (título e história).")
        return
    } else if (!titulo) {
        alert("Por favor, preencha o campo do título corretamente.")
        return
    } else if (!historia) {
        alert("Por favor, preencha o campo da história corretamente.")
        return
    }

    // Metodo POST para adicionar um novo usuário
    const response = await fetch(apiURLHist, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ titulo, historia, imagemURL })
    })

    if (response.ok) {
        msgSucesso.style.display = "block"
        // Limpa os campos do formulário
        inputTitulo.value = ""
        inputHistoria.value = ""
        inputImagem.value = ""
        msgSucesso.style.display = "block"
    } else {
        const error = await response.json();
        alert(`Erro ao adicionar história: ${error.message}`);
    }
}