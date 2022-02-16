module.exports = app => {
    const DataTypes = app.Sequelize;

    const Model = app.model.define('other', {
        swiper:{
            type: DataTypes.STRING(11),
            allowNull: true
        }
    })
    return Model;
};