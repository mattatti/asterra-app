import {Request, Response} from 'express';
import {createHobby} from '../services/hobbyService';

export const addHobby = async (req: Request, res: Response) => {
    try {
        const hobby = await createHobby(req.body);
        console.error('hobby', hobby);
        res.status(201).json(hobby);
    } catch (error: any) {
        res.status(500).json({error: error.message});
    }
};