module.exports = app => {
    const DataTypes = app.Sequelize;
    const Model = app.model.define('cart',{
        cart_id:{
            type: DataTypes.INTEGER(8),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        user_id:{
            type: DataTypes.INTEGER(8).UNSIGNED.ZEROFILL,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        good_id:{
            type: DataTypes.INTEGER(8).UNSIGNED.ZEROFILL,
            allowNull: false,
            references: {
                model: 'goods',
                key: 'goods_id'
            }
        },
        checked:{
            type: DataTypes.BOOLEAN,
            defaultValue: 0
        },
        sku_text:{
            type: DataTypes.STRING(255),
            allowNull: true
        },
        buy_count:{
            type: DataTypes.INTEGER(8),
            allowNull:true,
        },
        buy_price:{
            type:DataTypes.DECIMAL(10, 2),
            allowNull:true,
        }
    }, {
        tableName: 'cart'
    })
    Model.associate = function() {
        app.model.Cart.belongsTo(app.model.Goods,{
            foreignKey:'good_id',
            targetKey:'goods_id'
        })
    }

    return Model;
}