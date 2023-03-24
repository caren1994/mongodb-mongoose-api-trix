import { Model } from 'mongoose';
import Sinon from 'sinon';
import { expect } from 'chai';
import Key from '../../../src/Domain/Key/Key';
import KeyService from '../../../src/Services/KeyService';
import KeyODM from '../../../src/Models/KeyODM';

describe('Teste para o método getByValue', function () {
  it('Deve buscar uma chave por valor com sucesso', async function () {
    // Arrange
    const keyOutput = new Key(
      '+55 (18) 99765-1187',
      'Jô Soares',
      'phonenumber',
      '633ec9fa3df977e30e993492',
    );
    Sinon.stub(Model, 'findOne').resolves(keyOutput);
    // Action
    const service = new KeyService(new KeyODM());
    const result = await service.getByValue('+55 (18) 99765-1187');

    // Assertion
    expect(result).to.be.deep.equal(keyOutput);
    Sinon.restore(); 
  });
});