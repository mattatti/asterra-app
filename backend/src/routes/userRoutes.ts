import {Router} from 'express';
import {addUser, getUsers, removeUser} from '../controllers/userController';

const router = Router();

router.post('/users', addUser);
router.get('/users', getUsers);
router.delete('/users/:id', removeUser);

export default router;