import Hobby from '../models/Hobby';

export const createHobby = async (data: Omit<Hobby, 'id'>) => {
    return await Hobby.create(data);
};