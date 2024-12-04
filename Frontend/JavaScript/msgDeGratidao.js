async function mensagemAleatoria() {
    // Section onde será inserido a mensagem aleátoria
    const msgContainer = document.getElementById("mensagem-container")

    try {
        const response = await fetch(`http://localhost:3000/mensagens/random`)
        // Se não tiver resposta ok, será dado um novo erro.
        if (!response.ok) {
            throw new Error("Erro ao buscar mensagem aleátoria.")
        }

        document.getElementById("loadingMessage").style.display = "block"

        // Data recebe a resposta
        const data = await response.json()
        console.log(data[0])
        // Cria o paragráfo com o Tema
        const msgTema = document.createElement("p")
        msgTema.textContent = `Tema: ${data[0].tema}` 

        // Cria um paragráfo com a mensagem
        const msgEscrita = document.createElement("p")
        msgEscrita.textContent = `Mensagem: ${data[0].mensagem}`

        // Adiciona os elementos dentro da section
        msgContainer.appendChild(msgTema)
        msgContainer.appendChild(msgEscrita)
    
    } catch (error) {
        console.error("Erro ao buscar dados da mensagem:", error)
    }

    document.getElementById("loadingMessage").style.display = "none"
}