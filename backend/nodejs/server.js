const express = require('express');
const app = express();
const mysql = require('mysql2');
const bodyParser = require('body-parser');
app.use(bodyParser.json())


const cors = require('cors')
const corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions))

const db = require('./app/config/db.config.js');
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'alss_web4'
});

//เพิ่ม route ตรงนี้
require('./app/route/class.route.js')(app);
require('./app/route/customer.route.js')(app);
require('./app/route/subject.route.js')(app);
require('./app/route/classStu.route.js')(app);
 
// Create a Server
var server = app.listen(8080, function () {
 
  let host = server.address().address
  let port = server.address().port

  console.log("App listening at http://%s:%s", host, port);
})

db.sequelize.sync().then(() => {
  console.log(`Users db and user table have been created`);
});



app.post('/api/login',(req,res)=>{
  const _username = req.body.username;
  const _password = req.body.password;

  connection.execute('SELECT username ,password , type,firstname,lastname FROM customers WHERE `username` = ? AND `password` = ?',
  [_username, _password],
  function(err,results,fields){
    console.log(results);
    // console.log(fields);
    res.json(results)
  }
  )
 });
