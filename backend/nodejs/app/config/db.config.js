const env = require('./env.js');

const Sequelize = require('sequelize');
const sequelize = new Sequelize(env.database, env.username, env.password, {
  host: env.host,
  dialect: env.dialect,
  operatorsAliases: false,

  pool: {
    max: env.max,
    min: env.pool.min,
    acquire: env.pool.acquire,
    idle: env.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//เพิ่มตาราง DB ตรงนี้
db.customers = require('../model/customer.model.js')(sequelize, Sequelize);
db.class = require('../model/class.model.js')(sequelize, Sequelize);
db.subject = require('../model/subject.model.js')(sequelize, Sequelize);
db.classStu = require('../model/classStu.model.js')(sequelize, Sequelize);
db.conTent = require('../model/content.model.js')(sequelize, Sequelize);
db.quiz = require('../model/dialogflow.model.js')(sequelize, Sequelize);


module.exports = db;