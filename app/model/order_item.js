/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('order_item', {
    order_id: {
      type: DataTypes.STRING(13),
      allowNull: false
    },
    goods_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    sku_type: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    count: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: true
    }
  }, {
    tableName: 'order_item'
  });

  Model.associate = function() {
    app.model.OrderItem.hasOne(app.model.Goods,
        {
          foreignKey:'goods_id',
          targetKey:'goods_id'
        }
    )
  }


  return Model;
};
