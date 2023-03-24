import PaymentStatus from '../utils/PaymentStatus';

interface IPayment {// inteface de contrato a ser aplicadas na key de payment
  id?: string;
  payByPerson: string;
  payToPerson: string;
  amount: number;
  key: string;
  status?: PaymentStatus;
}

export default IPayment;