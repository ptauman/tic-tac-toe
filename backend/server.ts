import express, { Application } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import router from './routes/userRouter';

dotenv.config();

const app: Application = express();
app.use(cors({
    origin: 'http://127.0.0.1:5500',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// הוספת CORS
app.use(cors());

app.use(express.json());

app.use('/auth', router);

const PORT: string = process.env.PORT || '3000';

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});
