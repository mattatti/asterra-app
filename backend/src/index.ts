import cors from 'cors';
import express from 'express';
import {sequelize} from './config/db';
import userRoutes from './routes/userRoutes';
import hobbyRoutes from './routes/hobbyRoutes';
import './models/associations';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/api', userRoutes);
app.use('/api', hobbyRoutes);

sequelize.sync({force: false}).then(() => {
    console.info('Database connected');
    app.listen(PORT, () => console.info(`Server running on port ${PORT}`));
}).catch((error) => console.error('Database connection failed:', error));