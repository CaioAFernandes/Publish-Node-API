const { createConnection } = require('mysql');

class ControllerDao {
  constructor(){
    this.conn = createConnection({
      host: '127.0.0.1',
      user: 'root',
      password: '1234',
      database: 'publish'
    });
  }
  
  /**
  * GetPublicacao retorna um json com a publicação pelo parametro do id
  * @param {id}       id da publicacao que deverá ser retornada
  * @param {function} callback o que executar ao fim da query
  */
  async getNew(id, callback)
  {
    await this.conn.query(`SELECT * FROM news WHERE id = ?`, id, callback)
  }

  /**
  * GetPublicacaos retorna um json com todas as publicações do banco
  * @param {function} callback o que executar ao fim da query
  */
  async getNews(callback)
  {
    await this.conn.query(`SELECT * FROM news`, callback)
  }

  /**
   * InsertPublicacao envia uma publicação para o banco salvando-a
   * @param {json}     publicacao {titulo, conteudo} da publicação
   * @param {function} callback o que executar ao fim da query
   */
  async insertNew(publicacao, callback)
  {
    await this.conn.query(`INSERT INTO news SET ?`, publicacao, callback)
  }

  /**
   * GetLastNews retorna as últimas 5 publicação pra tela inicial
   * @param {function} callback o que executar ao fim da query
   */
  async getLastPublish(callback)
  {
    await this.conn.query('SELECT * FROM news ORDER BY id DESC LIMIT 7', callback)
  }
  
  /**
   * UpdateNews atualiza uma publicação
   * @param {json} publicacao json a realizar update do formulário
   * @param {int} id para realização do update
   * @param {function} callback o que executar ao fim da query
   */
  async updateNews(publicacao, id, callback)
  {
    await this.conn.query(`UPDATE news SET ? WHERE id = ${id}`, publicacao, callback)
  }
  
  /**
   * DeleteNews remove uma publicação do banco
   * @param {int} id para realização do update
   * @param {function} callback o que executar ao fim da query
   */
  async deleteNews(id, callback)
  {
    this.conn.query(`DELETE FROM news WHERE id = ${id}`, callback)
  }

  async createTable(callback)
  {

  }
}


module.exports = ControllerDao