const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

  sequelize.define('temperament', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING
    }
  },
  {
    timestamps: false
  })
}