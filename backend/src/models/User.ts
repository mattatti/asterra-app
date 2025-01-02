import {DataTypes, Model, Optional} from 'sequelize';
import {sequelize} from '../config/db';
import Hobby from './Hobby';

interface UserAttributes {
    id: number;
    firstName: string;
    lastName: string;
    address: string;
    phoneNumber: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {
}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public id!: number;
    public firstName!: string;
    public lastName!: string;
    public address!: string;
    public phoneNumber!: string;
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        firstName: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        address: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        phoneNumber: {
            type: DataTypes.STRING(15),
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'users',
    }
);


export default User;