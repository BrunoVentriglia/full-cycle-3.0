const express = require('express');
const service = require('./service');
const app = express();

app.get('/', (req, res) => {
    service.ListAll((listOfNames) => {
        res.send(listOfNames)
    })
})

app.listen(3000, async () => {

    await service.CreateTablePeople();
    await service.Insert();

    console.log('NGINX rodando na porta 3000');
});