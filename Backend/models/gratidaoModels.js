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
      const query = `SELECT * FROM MensagensCurtas`; // SQL para buscar todas as histórias
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
            tema: columns[2].value
        });
      });

      // Ao completar a consulta, retorna o array com todas as histórias
      request.on("requestCompleted", (rowCount) => {
        if (rowCount === 0) {
            callback(null, [])
        } else {
            callback(null, result);
        } 
      });
      connection.execSql(request); // Executa a consulta
    });

    connection.connect(); // Inicia a conexão
  };

  // Pegar mensagens aleátorias
  exports.getRandomMensagem = (callback) => {
    const connection = createConnection(); // Cria a conexão com o banco de dados
    connection.on("connect", (err) => {
      if (err) {
        return callback(err, null); // Trata erros de conexão
      }
      const query = `select top 1 * from MensagensCurtas order by NEWID()`; // SQL para buscar uma mensagem aleátoria
      const request = new Request(query, (err) => {

        if (err) {  
          return callback(err, null); // Trata erros de execução da consulta
        }
      });

      // Evento 'row' para capturar todas as linhas de resultados
      const result = []; // Variável para armazenar os resultados
      request.on("row", (columns) => {
        result.push({
          id: columns[0].value,
          mensagem: columns[1].value,
          tema: columns[2].value,
        });
      });

      // Ao completar a consulta, retorna o array com a mensagem aleátoria
      request.on("requestCompleted", (rowCount) => {
        if (rowCount === 0) {
          callback(null, [])
        } else {
          callback(null, result); // Retorna o array de resultados
        }
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
      // Consulta SQL para inserir uma nova história
      const query = `INSERT INTO MensagensCurtas (tema,mensagem) VALUES (@tema,@mensagem )`;
      const request = new Request(query, (err) => {
        if (err) {
          callback(err); // Chama a função callback com erro se houver falha
        } else {
          callback(null, { message: "Mensagem adicionada" });
        }
      });
      // Adiciona os parâmetros necessários para a inserção

      request.addParameter("tema", TYPES.VarChar, data.tema);
      request.addParameter("mensagem", TYPES.NVarChar, data.mensagem);
      connection.execSql(request); // Executa a consulta
    });
    connection.connect(); // Inicia a conexão
  };
//.

// Historias
    exports.getHistoriaByPalavra = (palavra, callback) => {
        const connection = createConnection(); // Cria a conexão com o banco de dados

        connection.on("connect", (err) => {
        if (err) {
            return callback(err, null); // Trata erros de conexão
        }

        // Consulta SQL para buscar as histórias de acordo com a palavra inserida
        const query = `select * from HistoriasInspiradoras where historia like '%${palavra}%'`;
        const request = new Request(query, (err) => {
            if (err) {
            return callback(err, null); // Trata erros de execução da consulta
            }
        });

        // Evento 'row' para capturar a linha de resultado
        let data = null;
        request.on("row", (columns) => {
            data = {
            id: columns[0].value,
            historia: columns[1].value,
            imagemURL: columns[2].value,
            };
        });

        // Ao completar a consulta, retorna as histórias encontradas
        request.on("requestCompleted", () => {
            callback(null, data); // Retorna as histórias encontradas
        });

        connection.execSql(request); // Executa a consulta
        });

        connection.connect(); // Inicia a conexão
    };

    exports.createHistoria = (data, callback) => {
        const connection = createConnection(); // Cria a conexão com o banco de dados
        connection.on("connect", (err) => {
          if (err) {
            return callback(err, null); // Trata erros de conexão
          } // Consulta SQL para inserir uma nova história
          const query = `INSERT INTO HistoriasInspiradoras (historia, imagemURL) VALUES (@historia,@imagemURL)`;
          const request = new Request(query, (err) => {
            if (err) {
              callback(err); // Chama a função callback com erro se houver falha
            } else {
              callback(null, { message: "História inserida com sucesso!" });
            }
          }); // Adiciona os parâmetros necessários para a inserção
          request.addParameter("historia", TYPES.NVarChar, data.historia);
          request.addParameter("imagemURL", TYPES.NVarChar, data.imagemURL);
          connection.execSql(request); // Executa a consulta
        });
        connection.connect(); // Inicia a conexão
    };
//.