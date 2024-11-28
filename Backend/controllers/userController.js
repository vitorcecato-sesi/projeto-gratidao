const userModel = require("../models/userModel")

// Mensagens Curtas
    exports.getMensagens =(req, res) => {
        userModel.getAllMensagens((err, users) => {
            if (err){
                res.status(500).send("Erro ao buscar usuários")
            } else{
                res.json(users)
            }
        })
    }
    // Função para lidar com a requisição de criação de usuário
    exports.createMensagens = (req, res) => {
        const data = req.body; // Extrai o nome do corpo da requisição
        userModel.createMensagens(data, (err) => {
        if (err) {
        res.status(500).send('Erro ao criar usuário' + err); // Retorna um erro 500 se algo deu errado
        } else {
        res.status(201).send('Usuário criado com sucesso'); // Retorna status 201 (criado) se bem-sucedido
        }
        });
    };
//.

// Histórias
exports.getHistoriaByPalavra = (req, res) => {
    const { palavra } = req.params; // Extrai a palavra dos parâmetros da URL
    userModels.getHistoriaByPalavra(palavra, (err, historia) => {
      if (err) {
        res.status(500).send("Erro ao buscar historia!"); // Retorna um erro 500 se algo deu errado
      } else if (!historia) {
        res.status(404).send("História não encontrado!"); // Retorna 404 se o usuário não for encontrado
      } else {
        res.json(historia); // Retorna o usuário encontrado em formato JSON
      }
    });
  };

  exports.createHistoria = (req, res) => {
    const data = req.body; // Extrai o nome do corpo da requisição 
    userModels.createHistoria(data, (err) => {
      if (err) {
        res.status(500).send("Erro ao criar História"); // Retorna um erro 500 se algo deu errado
      } else {
        res.status(201).send("História criado com sucesso"); // Retorna status 201 (criado) se bem-sucedido
      }
    });
  };
//.