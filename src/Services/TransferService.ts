import { isValidObjectId } from 'mongoose';
import Payment from '../Domain/Payment/Payment';
import IPayment from '../Interfaces/IPayment';
import PaymentODM from '../Models/PaymentDM';
import PaymentStatus from '../utils/PaymentStatus';
import KeyService from './KeyService';

class TransferService {
  private paymentODM: PaymentODM;
  private keyService: KeyService;

  constructor(paymentODM: PaymentODM, keyService: KeyService) {
    this.paymentODM = paymentODM;
    this.keyService = keyService;// recebido pelo controller que vou enviado pelas routes
  }

  private createPaymentDomain(payment: IPayment | null): Payment | null {
    if (payment) {
      return new Payment(
        payment.payByPerson,
        payment.payToPerson,
        payment.amount,
        payment.key,
        payment.id,
        payment.status,
      );
    }
    return null;
  }

  public async transfer(payment: IPayment) { // recbe o obj pelo controller
    const key = await this.keyService.getByValue(payment.key);// acessa a função getbyvalue do keyservice  enviando a key
    if (!key) {
      throw new Error('Key not found!');// caso de nao achar
    }
    const newPayment = await this.paymentODM.create(payment);
    // caso ache faz a crição da transferencia no banco de dados acessando pela model paymentodm
    return this.createPaymentDomain(newPayment);
    // envia para a função que pode acessar e modificar os atributos do pagamento
  }

  public async undoTransfer(id: string): Promise<IPayment | null> { // função de reset na tranferencia
    if (!isValidObjectId(id)) { // envio o id da tranferencia
      throw new Error('Invalid Mongo id');
    }
    const payment = await this.paymentODM.findById(id);
    if (!payment) {
      throw new Error('Payment not found!');// valida se o id existe no banco 
    }
    payment.status = PaymentStatus.reversed;// muda o status 
    return this.paymentODM.update(id, payment);// e atualiza enviando o obj atualizado o status e com o id 
  }
}

export default TransferService;