'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require('../../config/config.json')[env];
const db = {};
const dynamic_db_obj={}
let i=1

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
    // console.log(db)
    dynamic_db_obj[i]=model.name
    i=i+1
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

const module_array=fs.readdirSync(path.join(__dirname,"../../api"))
module_array.forEach((ele) => {
  fs.readdirSync(path.join(__dirname,`../../api/${ele}/models`))
    .forEach((file) => {
      const model = require(path.join(__dirname,`../../api/${ele}/models/${file}`))(
        sequelize,
        Sequelize.DataTypes
      );
      db[model.name] = model;
      dynamic_db_obj[i]=model.name
      i=i+1
    });

  Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });
});



db.sequelize = sequelize;
db.Sequelize = Sequelize;

global.db=db
// console.log(dynamic_db_obj)
global.dynamic_db_obj=dynamic_db_obj
module.exports = db;
