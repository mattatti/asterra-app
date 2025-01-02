import {DataTypes, Model, Optional} from 'sequelize';
import {sequelize} from '../config/db';
import User from './User';

interface HobbyAttributes {
    id: number;
    userId: number;
    hobby: string;
}

interface HobbyCreationAttributes extends Optional<HobbyAttributes, 'id'> {
}

class Hobby extends Model<HobbyAttributes, HobbyCreationAttributes> implements HobbyAttributes {
    public id!: number;
    public userId!: number;
    public hobby!: string;
}

Hobby.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        hobby: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'hobbies',
    }
);


Hobby.belongsTo(User, {foreignKey: 'userId', onDelete: 'CASCADE'});
export default Hobby;