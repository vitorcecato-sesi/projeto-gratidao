const express = require("express");
const router = express.Router();
const gratidaoController = require("../controllers/gratidaoController");

// Mensagens Curtas
    router.get("/mensagens", gratidaoController.getAllMensagens); 
    router.get("/mensagens/random", gratidaoController.getRandomMensagem); 
    router.post("/mensagens", gratidaoController.createMensagens) 
//.

// Historias Inspiradoras
    router.get("/historias/:palavra", gratidaoController.getHistoriaByPalavra)
    router.post("/historia", gratidaoController.createHistoria)
//.

module.exports = router;  // Exporta para o index