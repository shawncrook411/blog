const { Model, DataTypes } = require("sequelize");
const sequelize = require('../config/connection');

class Comment extends Model { }

Comment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            unique: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id',
            }
        },
        post_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'blogpost',
                key: 'id',
            }
        },
        title: {
            type: DataTypes.STRING,
        },
        text: {
            type: DataTypes.STRING,
        },
        date: {
            type: DataTypes.DATEONLY,
            defaultValue: DataTypes.NOW,
        },        
        time: {
            type: DataTypes.TIME,
            defaultValue: DataTypes.NOW
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'comment',
    }
);

module.exports = Comment
