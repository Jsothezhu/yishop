/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('specifications', {
    id: {
      type: DataTypes.INTEGER(8),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    goods_id: {
      type: DataTypes.INTEGER(8).UNSIGNED.ZEROFILL,
      allowNull: false,
      references: {
        model: 'goods',
        key: 'goods_id'
      }
    },
    specifications: {
      type: DataTypes.JSON,
      allowNull: true
    },
    pprice: {
      type: DataTypes.JSON,
      allowNull: true
    },
    maxprice: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    minprice: {
      type: DataTypes.DECIMAL,
      allowNull: true
    }
  }, {
    tableName: 'specifications'
  });

  Model.associate = function() {}

  return Model;
};
