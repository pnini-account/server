const { sequelize, DataTypes } = require("./sequelize");
const Warning = sequelize.define(
    "warning",
    {
    id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
    },
    user_id: {
    type: DataTypes.INTEGER,
    },
    file_id: {
    type: DataTypes.INTEGER,
    },
    text: {
        type: DataTypes.STRING,
        },
    snooze: {
        type: DataTypes.TINYINT,
        }
    },
    {
    timestamps: false,
    }
    );
module.exports = Warning;
   
    