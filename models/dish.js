'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class dish extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      dish.belongsTo(models.tag, {
        foreignKey: {
          name: 'tagId',
        },
        as: 'tag',
      });
    }
  }
  dish.init(
    {
      name: DataTypes.STRING,
      price: DataTypes.DECIMAL(10, 2),
      vendorId: DataTypes.INTEGER,
      tagId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'dish',
    }
  );
  return dish;
};
