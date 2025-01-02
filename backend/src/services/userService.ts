import User from '../models/User';

export const createUser = async (data: Omit<User, 'id'>) => {
    return await User.create(data);
};

export const getAllUsers = async () => {
    return await User.findAll({include: 'hobbies'});
};

export const deleteUser = async (id: number) => {
    const user = await User.findByPk(id);
    if (!user) throw new Error('User not found');
    await user.destroy();
};