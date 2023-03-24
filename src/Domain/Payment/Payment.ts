import PaymentStatus from '../../utils/PaymentStatus';

class Payment {
  // classe do tipo payment
  private id: string | undefined;
  private payByPerson: string;
  private payToPerson: string;
  private amount: number;
  private key: string;
  private status: PaymentStatus;

  constructor(// recebe da função os atributos 
    payByPerson: string,
    payToPerson: string,
    amount: number,
    key: string,
    id: string | undefined,
    status: PaymentStatus = 1, // começa ccom o status 1 podendo ser alterado
  ) {
    this.id = id;
    this.payByPerson = payByPerson;
    this.payToPerson = payToPerson;
    this.amount = amount;
    this.key = key;
    this.status = status;
  }
  // acesso para ler e alterar os atributos ,assim cosneguimos alterar o status 
  public setId(id: string) {
    this.id = id;
  }

  public getId() {
    return this.id;
  }

  public setPayByPerson(payByPerson: string) {
    this.payByPerson = payByPerson;
  }

  public getPayByPerson() {
    return this.payByPerson;
  }

  public setPayToPerson(payToPerson: string) {
    this.payToPerson = payToPerson;
  }

  public getPayToPerson() {
    return this.payToPerson;
  }

  public setAmount(amount: number) {
    this.amount = amount;
  }

  public getAmount() {
    return this.amount;
  }

  public setKey(key: string) {
    this.key = key;
  }

  public getKey() {
    return this.key;
  }

  public setStatus(status: PaymentStatus) {
    this.status = status;
  }

  public getStatus() {
    return this.status;
  }
}

export default Payment;