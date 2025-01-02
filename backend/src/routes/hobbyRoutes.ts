import {Router} from 'express';
import {addHobby} from '../controllers/hobbyController';

const router = Router();

router.post('/hobbies', addHobby);

export default router;