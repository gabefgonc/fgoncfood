import express from 'express';
import cors from 'cors';
import { createUserController } from './useCases/User/CreateUser';

const app = express();

app.use(cors());
app.use(express.json());

app.post('/users/create', async (req, res) => {
  await createUserController.handle(req, res);
});

export { app };
