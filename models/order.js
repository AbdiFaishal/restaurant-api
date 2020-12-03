'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      order.belongsTo(models.dish, {
        foreignKey: {
          name: 'dishId',
        },
        as: 'userOrder',
      });
    }
  }
  order.init(
    {
      user: DataTypes.STRING,
      dishId: DataTypes.INTEGER,
      orderQuantity: DataTypes.INTEGER,
      specialRequest: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'order',
    }
  );
  return order;
};
