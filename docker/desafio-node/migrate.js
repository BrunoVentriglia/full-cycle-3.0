const mysql = require('mysql');
const config = { host: 'db', user: 'root', password: 'root', database: 'nodedb' };

const connection = mysql.createConnection(config);
connection.query(`CREATE TABLE IF NOT EXISTS people(id int not null auto_increment, dateinsert datetime, name varchar(255), primary key(id))`);

connection.end();