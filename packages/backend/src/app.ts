import express from 'express';
import cors from 'cors';
import { createUserController } from './useCases/User/CreateUser';
import { findOneUserController } from './useCases/User/FindOneUser';

const app = express();

app.use(cors());
app.use(express.json());

app.post('/users/create', async (req, res) => {
  await createUserController.handle(req, res);
});

app.get('/users/:id', async (req, res) => {
  await findOneUserController.handle(req, res);
});

export { app };
