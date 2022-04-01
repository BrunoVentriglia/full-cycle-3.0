const config = { host: 'db', user: 'root', password: 'root', database: 'nodedb' };
const mysql = require('mysql');
//const promiseMysql = require('promise-mysql')
const retry = require('retry')
const delay = require('delay')
const isItGood = [false, false, true]
let numAttempt = 10

// const CreateTablePeopleOld = async () => {

//     setTimeout(() => {

//     }, 5000);

//     promiseMysql.createConnection(config
//     ).then(function (conn) {
//         connection = conn;
//         connection.query(`CREATE TABLE IF NOT EXISTS people(id int not null auto_increment, dateinsert datetime, name varchar(255), primary key(id));`);
//         connection.end();
//     }).catch(function (error) {
//         if (connection && connection.end) connection.end();
//         console.log(error);
//     });
// };

// const Insert = async () => {
//     promiseMysql.createConnection(config
//     ).then(function (conn) {
//         connection = conn;
//         connection.query(`INSERT INTO people(name, dateinsert) values('Bruno', now());`);
//         connection.end();
//     }).catch(function (error) {
//         if (connection && connection.end) connection.end();
//         console.log(error);
//     });
// };


async function Insert() {
    let operation = retry.operation()

    return new Promise((resolve, reject) => {
        operation.attempt(async currentAttempt => {
            const connection = mysql.createConnection(config)
            connection.query(`INSERT INTO people(name, dateinsert) values('Bruno', now());`, function (err, result, fields) {
                if (err) {
                    const errAttenpt = currentAttempt < numAttempt; //!isItGood[numAttemptCreate] ? true : null
                    if (operation.retry(errAttenpt)) {
                        connection.end();
                        //numAttemptCreate++
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




// async function Insert() {
//     let operation = retry.operation()

//     return new Promise((resolve, reject) => {
//         operation.attempt(async currentAttempt => {
//             const connection = mysql.createConnection(config)
//             connection.query(`INSERT INTO people(name, dateinsert) values('Bruno', now());`, function (err, result, fields) {
//                 if (err) {
//                     const errAttenpt = !isItGood[numAttemptInsert] ? true : null
//                     if (operation.retry(errAttenpt)) {
//                         connection.end();
//                         numAttemptInsert++
//                         delay(2000);
//                         return
//                     }

//                     reject(operation.mainError())
//                 }

//                 connection.end();
//                 resolve('All good!')
//             });
//         })
//     })
// };



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

    connection.end();
}

async function CreateTablePeople() {
    let operation = retry.operation()

    return new Promise((resolve, reject) => {
        operation.attempt(async currentAttempt => {
            const connection = mysql.createConnection(config)
            connection.query(`CREATE TABLE IF NOT EXISTS people(id int not null auto_increment, dateinsert datetime, name varchar(255), primary key(id));`, function (err, result, fields) {
                if (err) {
                    const errAttenpt = currentAttempt < numAttempt; //!isItGood[numAttemptCreate] ? true : null
                    if (operation.retry(errAttenpt)) {
                        connection.end();
                        //numAttemptCreate++
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


// function CreateTablePeople() {
//     let operation = retry.operation()

//     return new Promise((resolve, reject) => {
//         operation.attempt(async currentAttempt => {
//             const connection = mysql.createConnection(config)
//             connection.query(`CREATE TABLE IF NOT EXISTS people(id int not null auto_increment, dateinsert datetime, name varchar(255), primary key(id));`);
//             connection.end();
//             await delay(2000)

//             const err = !isItGood[numAttemptCreate] ? true : null
//             if (operation.retry(err)) {
//                 numAttemptCreate++
//                 return
//             }

//             if (isItGood[numAttemptCreate]) {
//                 resolve('All good!')
//             } else {
//                 reject(operation.mainError())
//             }
//         })
//     })
// };

exports.ListAll = ListAll;
exports.Insert = Insert;
exports.CreateTablePeople = CreateTablePeople;