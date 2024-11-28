const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Mensagens Curtas
    router.get("/mensagens", userController.getMensagens); 
    router.get("/mensagens/random", userController.createMensagens); 
    router.post("/mensagens", userController) 
//.

// Historias Inspiradoras
    router.get("/historias/:palavra", userController.getHistoriaByPalavra)
    router.post("/historia", userController.createHistoria)
//.