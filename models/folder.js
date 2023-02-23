const { sequelize, DataTypes } = require("./sequelize");
const Folder = sequelize.define(
    "folder",
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
        },
        parentId: {
            type: DataTypes.INTEGER,
        },
        userId: {
            type: DataTypes.INTEGER,
        },
        filesId: {
            type: DataTypes.INTEGER
        },
        foldersId: {
            type: DataTypes.INTEGER
        }

    },
    {
        timestamps: false,
    }
);
module.exports = Folder;
