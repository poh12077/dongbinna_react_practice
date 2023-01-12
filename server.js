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

let statement="SELECT * FROM customer where isdeleted =0 ";
app.get('/api/customers', (req, res) => {
  connection.query( statement , (error, result) => {
    if(error) {
        console.log(error);
    } else {
        console.log(result.rows);
        res.send(result.rows);
    }
    connection.end;
  })
})

app.use('/image', express.static('./upload'));

app.post('/api/customers', upload.single('image'), (req,res)=>{
  let id = Math.floor(Math.random() * 10000);;
  let image = '/image/' + req.file.filename;
  let name = req.body.name;
  let birthday = req.body.birthday;
  let gender = req.body.gender;
  let job = req.body.job;

  let sql = {
    text : 'insert into customer values ($1,$2,$3,$4,$5,$6, now(), 0)',
    values: [id, image, name, birthday, gender, job],
  }
  connection.query(sql )
    .then((DBRes)=>{
      res.send(DBRes.rows);
      console.log(DBRes);
      connection.end;
    })
    .catch((err)=>{
      console.log(err);
      connection.end;
    })
})

app.delete('/api/customers/:id',(req, res)=>{
  let sql = {
    text : 'update customer set isdeleted =1 where id = ($1)',
    values : [req.params.id]
  } 
  connection.query(sql)
  .then((DBRes)=>{
    res.send(DBRes.rows);
    console.log(DBRes);
    connection.end;
  })
  .catch((err)=>{
    console.log(err);
    connection.end;
  })
})
  
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})