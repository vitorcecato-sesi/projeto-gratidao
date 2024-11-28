const userModel = require("../models/userModel")

exports.getMensagens =(req, res) => {
    userModel.getAllMensagens((err, users) => {
        if (err){
            res.status(500).send("Erro ao buscar mensagem")
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
    res.status(500).send('Erro ao criar mensagem' + err); // Retorna um erro 500 se algo deu errado
    } else {
    res.status(201).send('Mensagem criado com sucesso'); // Retorna status 201 (criado) se bem-sucedido
    }
    });
    };

