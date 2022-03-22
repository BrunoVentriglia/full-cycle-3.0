const express = require('express');
const peopleService = require('./service');
const app = express();

peopleService.Insert();

app.get('/', function (req, res) {
    peopleService.ListAll(function (listPeopleName) {
        res.send(`<h1>Full Cycle Rocks!</h1><h3>Lista de nomes</h3><ul>${listPeopleName}</ul>`);
    });

});

app.listen(3000, function () {
    console.log('Rodando na porta 3000');
});