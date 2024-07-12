const Sequalize = require('require');

const sequalize = new Sequalize('node-complete', 'root', 'nodecomplete', {
  dailect: 'mysql',
  host: 'localhost',
})

module.exports(sequalize)
// const mysql = require("mysql2");

// const pool = mysql.createPool({
//   host: "localhost",
//   user: "root",
//   database: "node-complete",
//   password: "abcd1234",
// });

// module.exports = pool.promise();
