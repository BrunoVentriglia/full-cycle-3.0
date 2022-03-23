const express = require('express');
const peopleService = require('./service');
const app = express();

app.get('/', function (req, res) {
    peopleService.ListAll(function (listPeopleName) {

        peopleService.Insert();
        
        res.send(`<h1>Full Cycle Rocks!</h1><h3>Lista de nomes</h3><ul>${listPeopleName}</ul>`);
        //res.send(`<h1>Full Cycle Rocks!</h1><h3>Lista de nomes</h3>`);
    });

});

app.listen(3000, function () {
    console.log('NGINX rodando na porta 8080');
    peopleService.CreateDb();
});