import express, { RequestHandler } from 'express';
import cors from 'cors';
import { createUserController } from './useCases/User/CreateUser';
import { findOneUserController } from './useCases/User/FindOneUser';
import { signInController } from './useCases/Auth/SignIn';
import { protectedRoute } from './middlewares/auth';

const app = express();

app.use(cors());
app.use(express.json());

app.post('/users/create', async (req, res) => {
  await createUserController.handle(req, res);
});

app.get('/users/:id', protectedRoute as RequestHandler, async (req, res) => {
  await findOneUserController.handle(req, res);
});

app.post('/auth/signin', async (req, res) => {
  await signInController.handle(req, res);
});

export { app };
