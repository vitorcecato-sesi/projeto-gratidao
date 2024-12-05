// URL das Histórias
const apiURLHistorias = "http://localhost:3000/historias"

// Contador que será utilizado na função
let contador = 0

// Função para buscar história por palavra
async function buscarHistoriaPalavra() {

    // Obtem o input
    const userPalavraInput = document.getElementById("historiaPalavra")
    const userPalavra = userPalavraInput.value.trim()   // Retira possíveis espaços desnecessários

    // Obtem a section para colocar as histórias
    const containerHist = document.getElementById("historias-container")

    // Obtem a mensagens para exibição ao usuário
    const msgLoading = document.getElementById("mensagemLoading")
    const msgNotFound = document.getElementById("historiaNaoEncontrada")

    // Verifica se possui um valor inserido
    if (!userPalavra) {
        alert("Por favor, preencha o campo para buscar a história.")
        return  // Encerra a função caso não tenha nenhum valor inserido
    }

    // Oculta o bloco das histórias e exibe a mensagem de loading
    containerHist.style.display = "none"
    msgLoading.style.display = "block"

    try {
        const response = await fetch(`${apiURLHistorias}/${userPalavra}`)
        // Trata possíveis respostas
        if (response.status === 404) {
            msgNotFound.style.display = "block" // Exibe mensagem de história não encontrada

        } else if (!response.ok) {
            const error = await response.json()
            alert(`Erro: ${error.error || "Erro desconhecido ao buscar história"}`) // Em caso de erro, exibe alerta ao usuário

        } else {    // Caso não dê erro, prossegue com os procedimentos
            
            // Obtém dados das histórias
            const historias = await response.json()
            console.log(contador)   // Exibe no console para controle do dev
            console.log(historias)  // Exibe no console para controle do dev

            // A repetição abaixo serve para apagar historias exibidas anteriormentes (caso tenha alguma será armazenado no contador) 
            while (contador !== 0) {
                // Obtém os elementos a partir do id e armazena em uma variável
                let paginaDeletar = document.getElementById(`pg-${contador}`)
                let tituloDeletar = document.getElementById(`titulo-${contador}`)
                let paragrafoDeletar = document.getElementById(`paragrafo-${contador}`)
                let imagemDeletar = document.getElementById(`imagem-${contador}`)

                // Com os elementos salvos nas variáveis, exclui-os abaixo
                paginaDeletar.removeChild(tituloDeletar)    // Remove o titulo
                paginaDeletar.removeChild(paragrafoDeletar) // Remove o paragráfo da história
                paginaDeletar.removeChild(imagemDeletar)    // Remove a imagem da história
                containerHist.removeChild(paginaDeletar)    // Remove a section que armazena os dados da história
                contador--  // Decresce o contador (-1) para indicar que 1 página(história) foi excluida
            }

            // Passa por todas as histórias armazenadas na array
            historias.forEach((data) => {
                contador++  // Crescenta no contador (+1) para indicar que 1 página(história) foi adicionada
                // Criação de section para organização de dados
                const paginaHistoria = document.createElement("section")    // Cria uma section e guarda suas informações na variável
                paginaHistoria.className = "paginaHistoria" // Adiciona uma classe para a section
                containerHist.appendChild(paginaHistoria)   // Adiciona a section dentro do containerHist(section do html)
                paginaHistoria.id = `pg-${contador}`        // Inseri um id para a página com referência ao contador
            

                // Criação de titulo para historia
                const tituloHistoria = document.createElement("h3") // Cria um h3 e guarda suas informações na variável
                tituloHistoria.className = "tituloHistoria" // Adiciona uma classe para a h3
                tituloHistoria.textContent = data.titulo    // Adiciona a informação do título no h3
                paginaHistoria.appendChild(tituloHistoria)  // Adiciona o h3 para dentro da paginaHistoria (section criada no js)
                tituloHistoria.id = `titulo-${contador}`    // Inseri um id para o título com referência ao contador

                // Criação de paragrafo para historia
                const paragrafoHistoria = document.createElement("p")   // Cria um p e guarda suas informações na variável
                paragrafoHistoria.className = "paragrafoHistoria"   // Adiciona uma classe para o paragráfo
                paragrafoHistoria.textContent = data.historia       // Adiciona a informação do paragráfo
                paginaHistoria.appendChild(paragrafoHistoria)       // Adiciona o paragráfo para dentro da paginaHistoria (section criada no js)
                paragrafoHistoria.id = `paragrafo-${contador}`      // Inseri um id para o título com referência ao contador

                // Criação de imagem para historia
                const imagemHistoria = document.createElement("img")    // Cria um img e guarda suas informações na variável
                imagemHistoria.className = "imagemHistoria"     // Adiciona uma classe para o paragráfo
                const stringURL = `${data.imagemURL}`   // Guarda as informações em uma variável
                // Verifica se a informação é uma url ou um valor digitado pelos desenvolvedores que indica um caminho na pasta
                if (stringURL.length <= 8) {
                    imagemHistoria.src = `../Imagens/BancoDeDados/${data.imagemURL}.png`    // Indica e insere no SRC o caminho para a pasta dos devs
                } else {
                    imagemHistoria.src = data.imagemURL // Indica e insere no SRC o url para a imagem
                }
                imagemHistoria.alt = `Imagem de ${data.titulo}` // Insere o título da imagem para servir de ALT caso a imagem não carregue
                paginaHistoria.appendChild(imagemHistoria)  // Adiciona a imagem para dentro da paginaHistoria (section criada no js)
                imagemHistoria.id = `imagem-${contador}`    // Inseri um id para o título com referência ao contador
            });
        }
    } catch (error) {
        // Em caso de erro, exibe o erro no console para controle do desenvolvedor e exibe um alert
        console.error("Erro ao buscar dados da mensagem:", error)
        alert("Erro ao buscar histórias. Verifique sua conexão.")
    }

    // Exibe o containerHist e oculta a mensagem de loading
    containerHist.style.display = "block"
    msgLoading.style.display = "none"
}