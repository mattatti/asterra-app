import User from './User';
import Hobby from './Hobby';

Hobby.belongsTo(User, {foreignKey: 'userId', onDelete: 'CASCADE'});
User.hasMany(Hobby, {foreignKey: 'userId', as: 'hobbies', onDelete: 'CASCADE'});
