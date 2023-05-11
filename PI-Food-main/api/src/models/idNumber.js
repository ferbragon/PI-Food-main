const { DataTypes} = require("sequelize");

module.exports = (sequelize) => { 
    sequelize.define("number", {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false
        }
    }, { timestamps: false })
};