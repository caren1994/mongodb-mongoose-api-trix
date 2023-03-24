import { NextFunction, Request, Response } from 'express';
import IPayment from '../Interfaces/IPayment';
import TransferService from '../Services/TransferService';
import PaymentStatus from '../utils/PaymentStatus';

// refatorado
class TransferController {
  private service: TransferService;

  constructor(service: TransferService) {
    this.service = service;// recebe o service passado como parametro nas rotas
  }

  public async create(req: Request, res: Response, next: NextFunction) {
    const payment: IPayment = { // cria o obj de pagamento com os dados recebido pelo req
      payByPerson: req.body.payByPerson,
      payToPerson: req.body.payToPerson,
      amount: req.body.amount,
      key: req.body.key,
      status: PaymentStatus.concluded, // muda o status pelo enum 
    };

    try {
      const newPayment = await this.service.transfer(payment);// mando o objeto para a função do transfer do service 
      return res.status(201).json(newPayment);
    } catch (error) {
      next(error);
    }
  }

  public async undoTransfer(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      await this.service.undoTransfer(id);// mando o id para a função que reseta a tranferencia 
      return res.status(204).json({});
    } catch (error) {
      next(error);
    }
  }
}

export default TransferController;