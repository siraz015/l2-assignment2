import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import { UserRouter } from './app/modules/users/user.route';

const app: Application = express();


// parser
app.use(express.json());
app.use(cors());


app.use('/api', UserRouter);


app.get('/', (req: Request, res: Response) => {
  res.send(`server in running ${process.env.PORT}`);
});


export default app
