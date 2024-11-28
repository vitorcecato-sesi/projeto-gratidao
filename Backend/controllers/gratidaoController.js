const gratidaoModel = require("../models/gratidaoModels")

// Mensagens Curtas
    exports.getAllMensagens =(req, res) => {
        gratidaoModel.getAllMensagens((err, users) => {
            if (err){
                res.status(500).send("Erro ao buscar Mensagens")
            } else{
                res.json(users)
            }
        })
    
    }

    exports.getRandomMensagem =(req, res) => {
        gratidaoModel.getRandomMensagem((err, mensagem) => {
            if (err){
                res.status(500).send("Erro ao buscar mensagem")
            } else{
                res.json(mensagem)
            }
        })
    }

    // Função para lidar com a requisição de criação de usuário
    exports.createMensagens = (req, res) => {
        const data = req.body; // Extrai o nome do corpo da requisição
        gratidaoModel.createMensagens(data, (err) => {
        if (err) {
        res.status(500).send('Erro ao criar mensagem'); // Retorna um erro 500 se algo deu errado
        } else {
        res.status(201).send('Mensagem criado com sucesso'); // Retorna status 201 (criado) se bem-sucedido
        }
        });
    };
//.

// Histórias
    exports.getHistoriaByPalavra = (req, res) => {
        const { palavra } = req.params; // Extrai a palavra dos parâmetros da URL
        gratidaoModel.getHistoriaByPalavra(palavra, (err, historia) => {
        if (err) {
            res.status(500).send("Erro ao buscar historia!"); // Retorna um erro 500 se algo deu errado
        } else if (!historia) {
            res.status(404).send("História não encontrada!"); // Retorna 404 se o usuário não for encontrado
        } else {
            res.json(historia); // Retorna o usuário encontrado em formato JSON
        }
        });
    };

    exports.createHistoria = (req, res) => {
        const data = req.body; // Extrai o nome do corpo da requisição 
        gratidaoModel.createHistoria(data, (err) => {
        if (err) {
            res.status(500).send("Erro ao criar História"); // Retorna um erro 500 se algo deu errado
        } else {
            res.status(201).send("História criado com sucesso"); // Retorna status 201 (criado) se bem-sucedido
        }
        });
    };
//.