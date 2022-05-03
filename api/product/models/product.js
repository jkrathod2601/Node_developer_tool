'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  product.init({
    name: DataTypes.STRING,
    password: DataTypes.STRING,
    email:DataTypes.STRING,
    role: DataTypes.STRING,
    refreshtoken:DataTypes.STRING,
    key:DataTypes.STRING,
    googleid:DataTypes.STRING,
    facebookid:DataTypes.STRING,
    githubid:DataTypes.STRING
  }, {
    sequelize,
    modelName: 'products',
  });
  return product;
};