const userModel = require("../models/userModel")

exports.getUser =(req, res) => {
    userModel.getAllUsers((err, users) => {
        if (err){
            res.status(500).send("Erro ao buscar usuários")
        } else{
            res.json(users)
        }
    })
}
// Função para lidar com a requisição de criação de usuário
exports.createUser = (req, res) => {
    const data = req.body; // Extrai o nome do corpo da requisição
    userModel.createUser(data, (err) => {
    if (err) {
    res.status(500).send('Erro ao criar usuário' + err); // Retorna um erro 500 se algo deu errado
    } else {
    res.status(201).send('Usuário criado com sucesso'); // Retorna status 201 (criado) se bem-sucedido
    }
    });
    };

