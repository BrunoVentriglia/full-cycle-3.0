const config = { host: 'db', user: 'root', password: 'root', database: 'nodedb' };
const mysql = require('mysql');
const retry = require('retry')
const delay = require('delay')
let numAttempt = 10

async function Insert() {
    let operation = retry.operation()

    return new Promise((resolve, reject) => {
        operation.attempt(async currentAttempt => {
            const connection = mysql.createConnection(config)
            connection.query(`INSERT INTO people(name, dateinsert) values('Bruno', now());`, function (err, result, fields) {
                if (err) {
                    const errAttenpt = currentAttempt < numAttempt;
                    if (operation.retry(errAttenpt)) {
                        connection.end();
                        delay(3000);
                        return
                    }

                    reject(operation.mainError())
                }
                else {
                    connection.end();
                    resolve('All good!')
                }
            });
        })
    })
};

async function ListAll(callback) {
    let operation = retry.operation()

    return new Promise((resolve, reject) => {
        operation.attempt(async currentAttempt => {
            const connection = mysql.createConnection(config)
            connection.query(`SELECT name, DATE_FORMAT(dateinsert,'%d/%m/%Y %h:%i:%s') AS dateinsert FROM people;`, function (err, result, fields) {
                if (err) {
                    const errAttenpt = currentAttempt < numAttempt;
                    if (operation.retry(errAttenpt)) {
                        connection.end();
                        delay(3000);
                        return
                    }

                    reject(operation.mainError())
                }
                else {

                    connection.end();
                    resolve('All good!')

                    const listOfNames = result.map((entry) => `<li>${entry.name} - ${entry.dateinsert}</li>`).join('\n')

                    return callback(`<h1>Full Cycle Rocks!</h1><h3>List of people</h3><ul>${listOfNames}</ul>`)
                }
            });
        })
    })
};

async function CreateTablePeople() {
    let operation = retry.operation()

    return new Promise((resolve, reject) => {
        operation.attempt(async currentAttempt => {
            const connection = mysql.createConnection(config)
            connection.query(`CREATE TABLE IF NOT EXISTS people(id int not null auto_increment, dateinsert datetime, name varchar(255), primary key(id));`, function (err, result, fields) {
                if (err) {
                    const errAttenpt = currentAttempt < numAttempt;
                    if (operation.retry(errAttenpt)) {
                        connection.end();
                        delay(3000);
                        return
                    }

                    reject(operation.mainError())
                }
                else {
                    connection.end();
                    resolve('All good!')
                }
            });
        })
    })
};


exports.ListAll = ListAll;
exports.Insert = Insert;
exports.CreateTablePeople = CreateTablePeople;