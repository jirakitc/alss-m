const express = require('express');
const app = express();
const mysql = require('mysql2');
const bodyParser = require('body-parser');

var multer  = require('multer');
var upload = multer({ dest: 'uploads/' })
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


db.sequelize.sync().then(() => {
  console.log(`Users db and user table have been created`);
});

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
      cb(null, './upload');
   },
  filename: function (req, file, cb) {
      cb(null , file.originalname);
  }
});
  
app.post('/single', upload.single('cover'), (req, res) => {
  try {
    res.send(req.file);
  }catch(err) {
    res.send(400);
  }
});

  var server = app.listen(8080, function () {
 
    let host = server.address().address
    let port = server.address().port
  
    console.log("App listening at http://%s:%s", host, port);
  })