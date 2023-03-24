import { Router } from 'express';
import TransferController from '../Controllers/TransferController';
import KeyController from '../Controllers/KeyController';
import TransferService from '../Services/TransferService';
import PaymentODM from '../Models/PaymentDM';
import KeyService from '../Services/KeyService';
import KeyODM from '../Models/KeyODM';

const routes = Router();

// faz um anova instancia de transferservice passando para ele como
// parametro uma nova instancia de paymentodm e 
// passando o keyservice passando para ele como parametro a model keyodm como parametro
// pq vai precisar na hora de achar o gervalue
const service = new TransferService(
  new PaymentODM(), 
  // se nao precisa-se fazer o getvalue só passaria o newtransfer e o paymentodm
  new KeyService(new KeyODM()),
);
const serviceKey = new KeyService(new KeyODM());
// se nao precisa-se fazer o getvalue só passaria o newtransfer e o paymentodm

const transferController = new TransferController(service);
const keyController = new KeyController(serviceKey);

routes.post(
  '/transfer',
  (req, res, next) => transferController.create(req, res, next), // rota refatorada
);

routes.patch(
  '/transfer/:id',
  (req, res, next) => transferController.undoTransfer(req, res, next), // rota refatorada 
);

routes.post(
  '/key/register',
  (req, res, next) => keyController.create(req, res, next), // rota refatorada
);

routes.get(
  '/key/:value',
  (req, res, next) => keyController.getByValue(req, res, next), // rota refatorada
);
routes.get(
  '/key/owner/:name',
  (req, res, next) => keyController.getByOwner(req, res, next),
);

export default routes;