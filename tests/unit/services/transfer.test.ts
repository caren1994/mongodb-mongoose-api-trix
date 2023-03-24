import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import IPayment from '../../../src/Interfaces/IPayment';
import PaymentStatus from '../../../src/utils/PaymentStatus';
import TransferService from '../../../src/Services/TransferService';
import Payment from '../../../src/Domain/Payment/Payment';
import Key from '../../../src/Domain/Key/Key';
import PaymentODM from '../../../src/Models/PaymentDM';
import KeyService from '../../../src/Services/KeyService';
import KeyODM from '../../../src/Models/KeyODM';

describe('Deveria criar uma transferência TRIX', function () {
  it('Deveria criar uma transferência TRIX com SUCESSO', async function () {
    // Arrange
    const paymentInput: IPayment = {
      payByPerson: 'Jobs',
      payToPerson: 'Wozniak',
      amount: 50000,
      key: '858.898.670-16',
    };
    const paymentOutput: Payment = new Payment(
      'Jobs',
      'Wozniak',
      50000,
      '858.898.670-16',
      '63319d80feb9f483ee823ac5',
      PaymentStatus.concluded,
    );
    sinon.stub(Model, 'create').resolves(paymentOutput);

    const keyOutput = new Key(
      '+55 (18) 99765-1187',
      'Jô Soares',
      'phonenumber',
      '633ec9fa3df977e30e993492',
    );
    sinon.stub(Model, 'findOne').resolves(keyOutput);

    const service = new TransferService(
      new PaymentODM(), 
      new KeyService(new KeyODM()),
    );
    const result = await service.transfer(paymentInput);

    expect(result).to.be.deep.equal(paymentOutput);
  });

  it(
    'Deveria lançar uma exceção quando a key não é encontrada', 
    async function () {
      const paymentInput: IPayment = {
        payByPerson: 'Jobs',
        payToPerson: 'Wozniak',
        amount: 50000,
        key: '858.898.670-16XX',
      };

      sinon.stub(Model, 'create').resolves({});
      sinon.stub(Model, 'findOne').resolves(null);

      try {
        const service = new TransferService(
          new PaymentODM(), 
          new KeyService(new KeyODM()),
        );
        await service.transfer(paymentInput);
      } catch (error) {
        expect((error as Error).message).to.be.equal('Key not found!');
      }
    },
  );

  afterEach(function () {
    sinon.restore();
  });
});