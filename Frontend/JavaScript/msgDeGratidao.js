// Link da URL Mensagens
const apiURLMsg = "http://localhost:3000/mensagens/"

// Função para exibir mensagem aleátoria
async function mensagemAleatoria() {
    // Section onde será inserido a mensagem aleátoria
    const msgContainer = document.getElementById("mensagem-container")

    document.getElementById("mensagemInicial").style.display = "none"
    document.getElementById("loading").style.display = "block";

    try {
        const response = await fetch(`http://localhost:3000/mensagens/random`)
        // Se não tiver resposta ok, será dado um novo erro.
        if (!response.ok) {
            throw new Error("Erro ao buscar mensagem aleátoria.")
        }

        // Configura o Adequa o Css para o container
        msgContainer.style.flexDirection = "column"

        // Data recebe a resposta
        const data = await response.json()
        console.log(data)
        // Cria o paragráfo com o Tema
        const msgTema = document.getElementById("msgTema")
        msgTema.textContent = `Tema: ${data.tema}` 

        // Cria um paragráfo com a mensagem
        const msgEscrita = document.getElementById("msgEscrita")
        msgEscrita.textContent = `Mensagem: ${data.mensagem}`

        // Adiciona os elementos dentro da section
        msgContainer.appendChild(msgTema)
        msgContainer.appendChild(msgEscrita)
    
    } catch (error) {
        // Condição para tratamento de erros
        console.error("Erro ao buscar dados da mensagem:", error)   // Joga o erro no console para o desenvolvedor
        document.getElementById("mensagemInicial").textContent = "Falha ao buscar mensagem."    // Demonstra ao usuário que ocorreu um erro.  
        document.getElementById("mensagemInicial").style.display = "block"
    }
    // Oculta a mensagem de loading
    document.getElementById("loading").style.display = "none"
}

// Função para criar mensagem
async function criarMensagemGratidao() {

    // Pega elementos
    const msgSucesso = document.getElementById("addSucesso")

    // Obtém os inputs
    const inputTema = document.getElementById("userTemaGratidao")
    const inputMensagem = document.getElementById("userFraseGratidao")

    // Retira os espaços desnecessários das mensagens
    const tema = inputTema.value.trim()
    const mensagem = inputMensagem.value.trim()

    // Confere se os campos foram preenchidos
    if (!tema && !mensagem) {
        alert("Por favor, preencha todos os campos corretamente.")
        return
    } else if (!tema) {
        alert("Por favor, preencha o campo do Tema corretamente.")
        return
    } else if (!mensagem) {
        alert("Por favor, preencha o campo da Mensagem corretamente.")
        return
    }

    // Metodo POST para adicionar uma nova mensagem
    const response = await fetch(apiURLMsg, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tema, mensagem })
    })

    // Verifica se o servidor respondeu
    if (response.ok) {
        msgSucesso.style.display = "block"
        // Limpa os campos do formulário
        inputTema.value = ""
        inputMensagem.value = ""

    } else {
        const error = await response.json();
        alert(`Erro ao adicionar mensagem: ${error.message}`);
    }
}