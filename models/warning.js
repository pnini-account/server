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
    userId: {
    type: DataTypes.INTEGER,
    },
    fileId: {
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
   
    