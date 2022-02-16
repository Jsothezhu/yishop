/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('goods', {
    goods_id: {
      type: DataTypes.INTEGER(8).UNSIGNED.ZEROFILL,
      allowNull: false,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    category_id: {
      type: DataTypes.INTEGER(6),
      allowNull: true,
      references: {
        model: 'category',
        key: 'category_id'
      }
    },
    stock: {
      type: DataTypes.INTEGER(255).UNSIGNED,
      allowNull: true,
      defaultValue: 0,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    descrip_pic: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: ''
    },
    type: {
      type: DataTypes.STRING(10),
      allowNull: true,
      defaultValue: '0'
    },
    sale_time: {
      type: DataTypes.DATE,
      allowNull: true
    },
    good_pic: {
      type: DataTypes.STRING(1000),
      allowNull: true
    }
  }, {
    tableName: 'goods'
  });

  Model.associate = function() {
      app.model.Goods.belongsTo(app.model.Category,{
        foreignKey:'category_id',
        targetKey:'category_id'
      })
      app.model.Goods.hasOne(app.model.Specifications,{
        foreignKey:'goods_id',
        targetKey:'goods_id'
      })
      app.model.Goods.hasOne(app.model.Comment,{
        foreignKey:'goods_id',
        targetKey:'goods_id'
      })

  }

  return Model;
};
