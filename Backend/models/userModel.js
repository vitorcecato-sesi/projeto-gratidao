const createConnection = require("../db"); // Importa a função para criar a conexão com o banco de dados
const { Request, TYPES } = require("tedious"); // Importa as classes necessárias do tedious

// Mensagens
  // Pegar todas as mensagens
  exports.getAllMensagens = (callback) => {
    const connection = createConnection(); // Cria a conexão com o banco de dados
    connection.on("connect", (err) => {
      if (err) {
        return callback(err, null); // Trata erros de conexão
      }
      const query = `SELECT * FROM acao_de_gracas`; // SQL para buscar todas os usuários
      const request = new Request(query, (err, rowCount) => {
        if (err) {
          return callback(err, null); // Trata erros de execução da consulta
        }

      });

      // Evento 'row' para capturar todas as linhas de resultados
      const result = []; // Variável para armazenar os resultados
      request.on("row", (columns) => {
        result.push({
            id: columns[0].value,
            mensagen: columns[1].value,
            tema: columns[2].value,
          
        });
      });

      // Ao completar a consulta, retorna o array com todos os usuários
      request.on("requestCompleted", () => {
        callback(null, result); // Retorna o array de resultados
      });
      connection.execSql(request); // Executa a consulta
    });

    connection.connect(); // Inicia a conexão
  };
  
  // Criar Mensagens
  exports.createMensagens = (data, callback) => {
    const connection = createConnection(); // Cria a conexão com o banco de dados
    connection.on("connect", (err) => {
      if (err) {
        return callback(err, null); // Trata erros de conexão
      }
      // Consulta SQL para inserir um novo usuário
      const query = `INSERT INTO acao_de_grcas (tema,mensagem) VALUES (@tema,@mensagem )`;
      const request = new Request(query, (err) => {
        if (err) {
          callback(err); // Chama a função callback com erro se houver falha
        } else {
          callback(null, { message: "Aluno inserido com sucesso!" });
        }
      });
      // Adiciona os parâmetros necessários para a inserção

      request.addParameter("tema", TYPES.VarChar, data.name);
      request.addParameter("mensagem", TYPES.Int, data.age);
      connection.execSql(request); // Executa a consulta
    });
    connection.connect(); // Inicia a conexão
  };