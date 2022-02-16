/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('category', {
    category_id: {
      type: DataTypes.INTEGER(6),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    parent_category_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    sub_category_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    sub_category_url: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    tableName: 'category'
  });

  Model.associate = function() {

  }

  return Model;
};
