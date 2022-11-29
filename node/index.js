const express = require('express');
const app = express()
const port = 3000
const config = {
    host: 'database',
    user: 'root',
    password: 'root',
    database: 'node_db'
}
const mysql = require('mysql')
const connection = mysql.createConnection(config)
let names = '';

connection.connect(function(err) {
    if (err) throw err;

    connection.query("CREATE TABLE IF NOT EXISTS people (id int NOT NULL AUTO_INCREMENT, name varchar(255) NOT NULL, PRIMARY KEY (id))", function (err, result) {
        if (err) throw err;
        console.log("Tabela criada");
    });

    connection.query("INSERT INTO people(name) values ('Igor')");
    connection.query("INSERT INTO people(name) values ('Cleber')");
    connection.query("INSERT INTO people(name) values ('Billy')");
    connection.query("INSERT INTO people(name) values ('Bingo')");

    connection.query("SELECT name FROM people", function (err, rows) {
        if (err) throw err;
        rows.forEach(function(row) {
            names = names + row.name + '</br>'
        });
    });
});

app.get('/', (req, res) => {
    res.send('<h1>Full Cycle</h1><p>'+names+'</p>')
})

app.listen(port, () => {
    console.log("rodando na porta" + port)
    }
)
