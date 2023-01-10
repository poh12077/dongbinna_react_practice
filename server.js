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

const multer = require('multer');
const upload = multer({dest:'./upload'});

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

app.use('/image', express.static('./upload'));

app.post('/api/customers', upload.single('image'), (req,res)=>{
  let id = 7;
  let image = '/image/' + req.file.filename;
  let name = req.body.name;
  let birthday = req.body.birthday;
  let gender = req.body.gender;
  let job = req.body.job;

  let sql = {
    text : 'insert into customer values ($1,$2,$3,$4,$5,$6)',
    values: [id, image, name, birthday, gender, job],
  }
  connection.query(sql )
    .then((respond)=>{
      res.send(respond.rows);
      console.log(respond);
    })
    .catch((err)=>{
      console.log(err);
    })
})
  
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})