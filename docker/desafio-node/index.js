const express = require('express');
const peopleService = require('./service');
const app = express();

peopleService.CreateDb();

setTimeout(() => {
    peopleService.Insert();
}, 2000);

app.get('/', (req, res) => {
    peopleService.ListAll((listOfNames) => {
        res.send(listOfNames)
    })
})

app.listen(3000, function () {
    console.log('NGINX rodando na porta 3000');
});