const express = require('express');
const peopleService = require('./service');
const app = express();

app.get('/', (req, res) => {
    peopleService.ListAll((listOfNames) => {
        res.send(listOfNames)
    })
})

app.listen(3000, async function () {

    await peopleService.CreateDb();
    await peopleService.Insert();

    console.log('NGINX rodando na porta 3000');
});