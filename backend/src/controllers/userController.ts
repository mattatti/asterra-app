import {Request, Response} from 'express';
import {createUser, getAllUsers, deleteUser} from '../services/userService';

export interface IUser {
    id: number;
    firstName: string;
    lastName: string;
    address: string;
    phoneNumber: string;
    hobbies?: string[];
}

export const addUser = async (req: Request, res: Response) => {
    try {
        console.log('req.body', req.body)
        const user = await createUser(req.body);
        res.status(201).json(user);
    } catch (error: any) {
        res.status(500).json({error: error.message});
    }
};

export const getUsers = async (req: Request, res: Response) => {
    try {
        const users: IUser[] = await getAllUsers();
        res.status(200).json(users);
    } catch (error: any) {
        res.status(500).json({error: error.message});
    }
};

export const removeUser = async (req: Request, res: Response) => {
    try {
        await deleteUser(Number(req.params.id));
        res.status(204).send();
    } catch (error: any) {
        res.status(500).json({error: error.message});
    }
};