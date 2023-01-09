const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 5000;
const { Client } = require("pg");
const fs = require('fs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));

const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);

const connection = new Client({
  user: conf.user,
  host: conf.host,
  database: conf.database,
  password: conf.password,
  port: conf.port
});

connection.connect();

let statement="SELECT * FROM customer";
app.get('/api/customers', (req, res) => {
  connection.query( statement , (error, result) => {
    if(error) {
        console.log(error);
    } else {
        console.log(result.rows);
        res.send(result.rows);
    }
    // dbClient.end;
  })
})

  
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})