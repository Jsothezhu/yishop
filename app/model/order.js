/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('order', {
    order_id: {
      type: DataTypes.STRING(13),
      allowNull: false,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER(8).UNSIGNED.ZEROFILL,
      allowNull: false
    },
    no: {
      type: DataTypes.STRING(11),
      allowNull: true
    },
    receiver: {
      type: DataTypes.STRING(255),
      allowNull:true
    },
    phone:{
      type: DataTypes.STRING(20),
      allowNull:true
    },
    address: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    total_price: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    paid_method: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    refund_no: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    ship_status: {
      type: DataTypes.ENUM('cancal','pay','receivce','complete','refund'),
      allowNull: true,
      defaultValue: 'pay'
    },
    create_time: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'order'
  });

  Model.associate = function() {
    app.model.Order.belongsTo(app.model.User,{
      foreignKey:'user_id',
      targetKey:'id'
    })
    app.model.Order.hasMany(app.model.OrderItem,{
      foreignKey:'order_id',
     // targetKey:'order_id'
    })
  }
  return Model;
};
