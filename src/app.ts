import express from 'express';
import ErrorHandler from './Middlewares/ErrorHandler';
import routes from './Routes/Routes';

const app = express();
app.use(express.json());
app.use(routes);
app.use(ErrorHandler.handle);
// middleware de erro , toda vez que der erro chama esse middleware passando a mensagem 

export default app;