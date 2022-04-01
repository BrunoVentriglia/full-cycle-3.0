const express = require('express');
const peopleService = require('./service');
const app = express();

setTimeout(() => {
    peopleService.CreateDb();
}, 3000);

setTimeout(() => {
    peopleService.Insert();
}, 5000);

app.get('/', (req, res) => {
    peopleService.ListAll((listOfNames) => {
        res.send(listOfNames)
    })
})

app.listen(3000, function () {
    console.log('NGINX rodando na porta 3000');
});