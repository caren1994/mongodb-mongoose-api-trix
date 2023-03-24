import {
  Schema,
} from 'mongoose';
// importa apenas o schema que é oq vai ser construido aqui o restante 
// ele vai utilizar o construtor do abstractodm
import IPayment from '../Interfaces/IPayment';
import AbstractODM from './AbstractODM';// classe pai abstrata que ele vai extender 

class PaymentODM extends AbstractODM<IPayment> {
  // passo para a classe o tipo que ela pede nesse caso o ipayment
  constructor() {
    const schema = new Schema<IPayment>({ // construo o schema 
      payByPerson: { type: String, required: true },
      payToPerson: { type: String, required: true },
      amount: { type: Number, required: true },
      key: { type: String, required: true },
      status: { type: Number },
    });
    super(schema, 'Payment');
    // e passo para o construtor do pai o schema construido aqui e o nome da model que vamos utilizar
  }
}

export default PaymentODM;