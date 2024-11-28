const gratidaoModel = require("../models/gratidaoModels")

// Mensagens Curtas

    // Função que exibe todas as mensagens
    exports.getAllMensagens =(req, res) => {
        gratidaoModel.getAllMensagens((err, users) => {
            if (err){
                res.status(500).send("Erro ao buscar Mensagens")
            } else{
                res.json(users)
            }
        })
    
    }

    // Função que exibe uma mensagem random
    exports.getRandomMensagem =(req, res) => {
        gratidaoModel.getRandomMensagem((err, mensagem) => {
            if (err){
                res.status(500).send("Erro ao buscar mensagem")
            } else{
                res.json(mensagem)
            }
        })
    }

    // Função para criação de mensagens
    exports.createMensagens = (req, res) => {
        const data = req.body; // Extrai o nome do corpo da requisição
        gratidaoModel.createMensagens(data, (err) => {
        if (err) {
        res.status(500).send('Erro ao criar a mensagem'); // Retorna um erro 500 se algo deu errado
        } else {
        res.status(201).send('Mensagem criada com sucesso'); // Retorna status 201 (criado) se bem-sucedido
        }
        });
    };
//.

// Histórias

    // Função para buscar história de acordo com a palavra inserida
    exports.getHistoriaByPalavra = (req, res) => {
        const { palavra } = req.params; // Extrai a palavra dos parâmetros da URL
        gratidaoModel.getHistoriaByPalavra(palavra, (err, historia) => {
        if (err) {
            res.status(500).send("Erro ao buscar a história!"); // Retorna um erro 500 se algo deu errado
        } else if (!historia) {
            res.status(404).send("História não encontrada!"); // Retorna 404 se a História não for encontrada
        } else {
            res.json(historia); // Retorna a História encontrada em formato JSON
        }
        });
    };

    // Função para criar uma história
    exports.createHistoria = (req, res) => {
        const data = req.body; // Extrai os dados do corpo da aquisição
        gratidaoModel.createHistoria(data, (err) => {
        if (err) {
            res.status(500).send("Erro ao criar a História."); // Retorna um erro 500 se algo deu errado
        } else {
            res.status(201).send("História criada com sucesso!"); // Retorna status 201 (criado) se bem-sucedido
        }
        });
    };
//.