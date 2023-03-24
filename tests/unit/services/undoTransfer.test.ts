import { expect } from 'chai';
import Sinon from 'sinon';
import { Model } from 'mongoose';
import TransferService from '../../../src/Services/TransferService';
import IPayment from '../../../src/Interfaces/IPayment';
import PaymentStatus from '../../../src/utils/PaymentStatus';
import PaymentODM from '../../../src/Models/PaymentODM';
import KeyService from '../../../src/Services/KeyService';
import KeyODM from '../../../src/Models/KeyODM';

describe('Testes para undoTransfer', function () {
  it(
    'Deve lançar uma exceção caso não exista pagamento para este id',
    async function () {
      // Arrange
      Sinon.stub(Model, 'findById').resolves(null);
      let error;
      // Action
      try {
        const service = new TransferService(
          new PaymentODM(),
          new KeyService(new KeyODM()),
        );
        await service.undoTransfer('63320b77aa12f0db4f210b00');
      } catch (err) {
        error = err as Error;
      }
      // Assertion
      expect(error?.message).to.be.equal('Payment not found!');
    },
  );

  it(
    'Deve lançar uma exceção caso o id seja inválido',
    async function () {
      // Arrange
      let error;
      // Action
      try {
        const service = new TransferService(
          new PaymentODM(),
          new KeyService(new KeyODM()),
        );
        await service.undoTransfer('IDINVALIDO');
      } catch (err) {
        error = err as Error;
      }
      // Assertion
      expect(error?.message).to.be.equal('Invalid Mongo id');
    },
  );

  it('Deveria defazer uma transferência com sucesso', async function () {
    // Arrange
    const paymentInput: IPayment = {
      payByPerson: 'Pedrão',
      payToPerson: 'Juju',
      amount: 5000,
      key: '858.898.670-16XX',
    };

    Sinon.stub(Model, 'findById').resolves(paymentInput);
    Sinon.stub(Model, 'findByIdAndUpdate').resolves({ 
      ...paymentInput, 
      status: PaymentStatus.reversed,
    });

    // Action
    const service = new TransferService(
      new PaymentODM(), 
      new KeyService(new KeyODM()),
    );
    const transfer = await service.undoTransfer('63320b77aa12f0db4f210b00');

    // Assertion
    expect(transfer!.status).to.be.equal(PaymentStatus.reversed);
  });

  afterEach(function () {
    Sinon.restore();
  });
});