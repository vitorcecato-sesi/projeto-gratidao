const createConnection = require("../db"); // Importa a função para criar a conexão com o banco de dados
const { Request, TYPES } = require("tedious"); // Importa as classes necessárias do tedious

// GET
  // Todos
  exports.getAllUsers = (callback) => {
    const connection = createConnection(); // Cria a conexão com o banco de dados
    connection.on("connect", (err) => {
      if (err) {
        return callback(err, null); // Trata erros de conexão
      }
      const query = `SELECT * FROM users1`; // SQL para buscar todas os usuários
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
            name: columns[1].value,
            age: columns[2].value,
            email: columns[3].value,
            contact: columns[4].value,
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
  exports.createUser = (data, callback) => {
    const connection = createConnection(); // Cria a conexão com o banco de dados
    connection.on("connect", (err) => {
      if (err) {
        return callback(err, null); // Trata erros de conexão
      }
      // Consulta SQL para inserir um novo usuário
      const query = `INSERT INTO users1 (name,age,email,contact) VALUES (@name,@age,@email, @contact )`;
      const request = new Request(query, (err) => {
        if (err) {
          callback(err); // Chama a função callback com erro se houver falha
        } else {
          callback(null, { message: "Aluno inserido com sucesso!" });
        }
      });
      // Adiciona os parâmetros necessários para a inserção

      request.addParameter("name", TYPES.VarChar, data.name);
      request.addParameter("age", TYPES.Int, data.age);
      request.addParameter("email", TYPES.VarChar, data.email);
      request.addParameter("contact", TYPES.VarChar, data.contact);
      connection.execSql(request); // Executa a consulta
    });
    connection.connect(); // Inicia a conexão
  };