const express = require("express");
const router = express.Router();
const gratidaoController = require("../controllers/gratidaoController");

// Mensagens Curtas
    // Rota para obter todas as mensagens
    router.get("/mensagens", gratidaoController.getAllMensagens); 
    // Rota para obter uma mensagem aleátoria
    router.get("/mensagens/random", gratidaoController.getRandomMensagem); 
    // Rota para postar uma mensagem
    router.post("/mensagens", gratidaoController.createMensagens) 
//.

// Historias Inspiradoras
    // Rota para obter uma história a partir de uma palavra
    router.get("/historias/:palavra", gratidaoController.getHistoriaByPalavra)
    // Rota para postar uma história
    router.post("/historia", gratidaoController.createHistoria)
//.

module.exports = router;  // Exporta para o index