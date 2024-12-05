// URL das Histórias
const apiURLHistorias = "http://localhost:3000/historias"
let contador = 0

async function buscarHistoriaPalavra() {
    const userPalavraInput = document.getElementById("historiaPalavra")
    const userPalavra = userPalavraInput.value.trim()
    const containerHist = document.getElementById("historias-container")
    const msgLoading = document.getElementById("mensagemLoading")
    const msgNotFound = document.getElementById("historiaNaoEncontrada")

    // Verifica se possui um valor inserido
    if (!userPalavra) {
        alert("Por favor, preencha o campo para buscar a história.")
        return;
    }

    containerHist.style.display = "none"
    msgLoading.style.display = "block"

    try {
        const response = await fetch(`${apiURLHistorias}/${userPalavra}`)
        if (response.status === 404) {
            msgNotFound.style.display = "block"
        } else if (!response.ok) {
            const error = await response.json()
            alert(`Erro: ${error.error || "Erro desconhecido ao buscar história"}`)
        } else {
            // Obtém dados das histórias
            const historias = await response.json()
            console.log(contador)
            console.log(historias)

            while (contador !== 0) {
                let paginaDeletar = document.getElementById(`pg-${contador}`)
                let tituloDeletar = document.getElementById(`titulo-${contador}`)
                let paragrafoDeletar = document.getElementById(`paragrafo-${contador}`)
                let imagemDeletar = document.getElementById(`imagem-${contador}`)
                paginaDeletar.removeChild(tituloDeletar)
                paginaDeletar.removeChild(paragrafoDeletar)
                paginaDeletar.removeChild(imagemDeletar)
                containerHist.removeChild(paginaDeletar)
                contador--
            }

            historias.forEach((data) => {
                contador++;
                // Criação de section para organização de dados
                const paginaHistoria = document.createElement("section")
                paginaHistoria.className = "paginaHistoria"
                containerHist.appendChild(paginaHistoria)
                paginaHistoria.id = `pg-${contador}`
            

                // Criação de titulo para historia
                const tituloHistoria = document.createElement("h3")
                tituloHistoria.className = "tituloHistoria"
                tituloHistoria.textContent = data.titulo
                paginaHistoria.appendChild(tituloHistoria)
                tituloHistoria.id = `titulo-${contador}`

                // Criação de paragrafo para historia
                const paragrafoHistoria = document.createElement("p")
                paragrafoHistoria.className = "paragrafoHistoria"
                paragrafoHistoria.textContent = data.historia
                paginaHistoria.appendChild(paragrafoHistoria)
                paragrafoHistoria.id = `paragrafo-${contador}`

                // Criação de imagem para historia
                const imagemHistoria = document.createElement("img")
                imagemHistoria.className = "imagemHistoria"
                const stringURL = `${data.imagemURL}`
                if (stringURL.length <= 8) {
                    imagemHistoria.src = `../Imagens/BancoDeDados/${data.imagemURL}.png`
                } else {
                    imagemHistoria.src = data.imagemURL
                }
                imagemHistoria.alt = `Imagem de ${data.titulo}`
                paginaHistoria.appendChild(imagemHistoria)
                imagemHistoria.id = `imagem-${contador}`
            });
        }
    } catch (error) {
        console.error("Erro ao buscar dados da mensagem:", error)
        alert("Erro ao buscar histórias. Verifique sua conexão.")
    }

    containerHist.style.display = "block"
    msgLoading.style.display = "none"
}