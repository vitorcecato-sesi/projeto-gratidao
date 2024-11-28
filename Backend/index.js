// Responsável por instanciar o servidor
const express = require("express");
const app = express();
const cors = require("cors")
const userRoutes = require("./routes/userRoutes"); // Importa as rotas de usuários
const PORTA = 3000
app.use(cors())

// Middleware para interpretar JSON no corpo das requisições
app.use(express.json());

// Usa as rotas definidas no arquivo userRoutes
app.use(userRoutes);

// Inicia o servidor na porta 3000
app.listen(PORTA, () => {
  console.log(`Servidor rodando em http://localhost:${PORTA}`);
});
