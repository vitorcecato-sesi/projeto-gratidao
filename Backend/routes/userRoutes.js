const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Mensagens Curtas
    router.get("/mensagens", userController.getAllMensagens); 
    router.get("/mensagens/random", userController.getRandomMensagem); 
    router.post("/mensagens", userController.createMensagens) 
//.

// Historias Inspiradoras
    router.get("/historias/:palavra", userController.getHistoriaByPalavra)
    router.post("/historia", userController.createHistoria)
//.

module.exports = router;  // Exporta para o index