const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Mensagens Curtas
    router.get("/mensagens", userController.getUser); // Mudar função
    router.get("/mensagens/random", userController.createUser); // Mudar função
    router.post("/mensagens", userController) // Mudar função
//.

// Historias Inspiradoras
    router.get("/historias/:palavra", userController.getHistoriaByPalavra)
    router.post("/historia", userController.createHistoria)
//.