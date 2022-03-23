const config = { host: 'db', user: 'root', password: 'root', database: 'nodedb' };
const mysql = require('mysql');

function ListAll(callback) {
    const connection = mysql.createConnection(config);
    connection.query(`SELECT name, DATE_FORMAT(dateinsert,'%d/%m/%Y %h:%i:%s') AS dateinsert FROM people;`, function (err, result, fields) {
        if (err)
            throw err;
            

        const listPeopleName = result.map(function (people) {
            return `<li>${people.name} - ${people.dateinsert}</li>`;
        }).join('\n');

        return callback(listPeopleName);
    });

    connection.end();
}

const Insert = () => {

    const connection = mysql.createConnection(config);
    connection.query(`CREATE TABLE IF NOT EXISTS people(id int not null auto_increment, dateinsert datetime, name varchar(255), primary key(id));`);
    
    connection.query(`INSERT INTO people(name, dateinsert) values('Bruno', now());`);
    connection.end();
};

const CreateDb = () => {

    const connection = mysql.createConnection(config);
    connection.query(`CREATE TABLE IF NOT EXISTS people(id int not null auto_increment, dateinsert datetime, name varchar(255), primary key(id));`);
    connection.end();
};

exports.ListAll = ListAll;
exports.Insert = Insert;
exports.CreateDb = CreateDb;