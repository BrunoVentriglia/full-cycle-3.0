const config = { host: 'db', user: 'root', password: 'root', database: 'nodedb' };
const mysql = require('mysql');
const promiseMysql = require('promise-mysql')



const ListAll = (callback) => {
    const connection = mysql.createConnection(config)

    connection.query(`SELECT name, DATE_FORMAT(dateinsert,'%d/%m/%Y %h:%i:%s') AS dateinsert FROM people;`, function (err, result, fields) {
        if (err) throw err

        const listOfNames = result.map((entry) => `<li>${entry.name} - ${entry.dateinsert}</li>`).join('\n')

        return callback(`
            <h1>Full Cycle Rocks!</h1>
            <h3>List of people</h3>
            <ul>
                ${listOfNames}
            </ul>
        `)
    });

    connection.end
}

// function ListAll(callback) {
//     const connection = mysql.createConnection(config);
//     let result = connection.query(`SELECT name, DATE_FORMAT(dateinsert,'%d/%m/%Y %h:%i:%s') AS dateinsert FROM people;`);

//     console.log(result);

//     const listPeopleName = result.map(function (people) {
//         return `<li>${people.name} - ${people.dateinsert}</li>`;
//     }).join('\n');

//     connection.end();
//     return callback(listPeopleName);
// };

// const ListAll = async () => {

//     promiseMysql.createConnection(config)
//         .then(connection => connection.query(`SELECT name, DATE_FORMAT(dateinsert,'%d/%m/%Y %h:%i:%s') AS dateinsert FROM people;`,
//             function (error, results, fields) {
//                 if (error) throw error;
//                 console.log(results);
//                 return results[0].count;

//             }))
// }

const Insert = async () => {

    promiseMysql.createConnection(config
    ).then(function (conn) {
        connection = conn;
        connection.query(`INSERT INTO people(name, dateinsert) values('Bruno', now());`);
        connection.end();
    }).catch(function (error) {
        if (connection && connection.end) connection.end();
        console.log(error);
    });
};

const CreateDb = async () => {

    promiseMysql.createConnection(config
    ).then(function (conn) {
        connection = conn;
        connection.query(`CREATE TABLE IF NOT EXISTS people(id int not null auto_increment, dateinsert datetime, name varchar(255), primary key(id));`);
        connection.end();
    }).catch(function (error) {
        if (connection && connection.end) connection.end();
        console.log(error);
    });
};

exports.ListAll = ListAll;
exports.Insert = Insert;
exports.CreateDb = CreateDb;