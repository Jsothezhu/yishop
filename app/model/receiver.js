/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('receiver', {
    address_id:{
      type: DataTypes.INTEGER(11),
      autoIncrement:true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER(8),
      allowNull: false
    },
    receiver: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    receiver_phone: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    province: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    city: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    area: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    detail: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    isdefault:{
      type:DataTypes.BOOLEAN,
      defaultValue: 0
    }
  }, {
    tableName: 'receiver'
  });

  Model.associate = function() {

  }

  return Model;
};
