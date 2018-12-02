import { connection, dbName } from "../dbConfig";

export default class TaxModel {
  /**
   * init table connection
   */
  async init() {
    this.tblName = "TAX";
    connection.connect();
    this.connection = connection;
    await this.initTable();
  }

  /**
   * init table, check whenever table exist or not, and create table structure
   */
  initTable() {
    return new Promise((resolve, reject) => {
      const checkQuery = `
        SELECT count(*)
        FROM information_schema.TABLES
        WHERE (TABLE_SCHEMA = '${dbName}') AND (TABLE_NAME = '${this.tblName}')`;

      const createTableQuery = `CREATE TABLE ${this.tblName} (ID decimal(18,0), name VARCHAR(255), tax_code INT, price DECIMAL(18, 2))`;

      this.connection.query(checkQuery, (err, res) => {
        if (err) reject(err);

        const count = res[0]["count(*)"];
        if (count == 0) {
          this.connection.query(createTableQuery, (err, res) => {
            if(err) reject(err);

            console.log(res);
            resolve(res);
          })
        } else {
          resolve(res);
        }
      });
    });
  }

  /**
   * bulk insert of mysql query insert
   *
   * @param {Array} data
   */
  async bulkInsert(data) {
    await this.init();

    const sql = `INSERT INTO ${
      this.tblName
    } (id, name, tax_code, price) VALUES ?`;

    this.connection.query(sql, [data], function(err) {
      if (err) throw err;
    });
  }
}
