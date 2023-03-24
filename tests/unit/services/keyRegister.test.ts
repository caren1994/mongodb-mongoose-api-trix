import { expect } from 'chai';
import { Model } from 'mongoose';
import Sinon from 'sinon';
import Key from '../../../src/Domain/Key/Key';
import IKey from '../../../src/Interfaces/IKey';
import KeyService from '../../../src/Services/KeyService';
import KeyODM from '../../../src/Models/KeyODM';

const RESULT_ERROR = 'Invalid Key';

describe('Deveria validar e criar chaves', function () {
  it('Criando uma chave de tipo CPF com SUCESSO', async function () {
    const keyInput: IKey = {
      value: '478.966.190-32',
      owner: 'Jack C.',
      type: 'cpf',
    };
    const keyOutput: Key = new Key(
      '478.966.190-32',
      'Jack C.',
      'cpf',
      '633ec9fa3df977e30e993492',
    );
    Sinon.stub(Model, 'create').resolves(keyOutput);

    const service = new KeyService(new KeyODM());
    const result = await service.register(keyInput);

    expect(result).to.be.deep.equal(keyOutput);
  });

  it('Criando uma chave de tipo CPF inválida', async function () {
    const keyInput: IKey = {
      value: '478.966.190-32XX',
      owner: 'Jack C.',
      type: 'cpf',
    };
    // sinon.stub(Model, 'create').resolves({});
    
    try {
      const service = new KeyService(new KeyODM());
      await service.register(keyInput);
    } catch (error) {
      expect((error as Error).message).to.be.equal(RESULT_ERROR);
    }
  });

  it('Criando uma chave de tipo Phone Number com SUCESSO', async function () {
    const keyInput: IKey = {
      value: '+55 (18) 99999-8888',
      owner: 'Abreu L.',
      type: 'phonenumber',
    };
    const keyOutput: Key = new Key(
      '+55 (18) 99999-8888',
      'Abreu L.',
      'phonenumber',
      '633ec9fa3df977e30e993492',
    );
    Sinon.stub(Model, 'create').resolves(keyOutput);

    const service = new KeyService(new KeyODM());
    const result = await service.register(keyInput);

    expect(result).to.be.deep.equal(keyOutput);
  });

  it('Criando chave de tipo Phone Number é inválida', async function () {
    const keyInput: IKey = {
      value: '9999-8888',
      owner: 'Abreu L.',
      type: 'phonenumber',
    };
    Sinon.stub(Model, 'create').resolves({});
    
    try {
      const service = new KeyService(new KeyODM());
      await service.register(keyInput);
    } catch (error) {
      expect((error as Error).message).to.be.equal(RESULT_ERROR);
    }
  });
  it('Criando chave de tipo Random com SUCESSO', async function () {
    const keyInput: IKey = {
      value: '123e4567-e12b-12d1-a456-426655440000',
      owner: 'Martha',
      type: 'random',
    };
    const keyOutput: Key = new Key(
      '123e4567-e12b-12d1-a456-426655440000',
      'Martha',
      'random',
      '633ec9fa3df977e30e993492',
    );
    Sinon.stub(Model, 'create').resolves(keyOutput);

    const service = new KeyService(new KeyODM());
    const result = await service.register(keyInput);

    expect(result).to.be.deep.equal(keyOutput);
  });

  it('Criando chave de tipo Random é inválida', async function () {
    const keyInput: IKey = {
      value: '123',
      owner: 'Martha',
      type: 'random',
    };
    Sinon.stub(Model, 'create').resolves({});
    
    try {
      const service = new KeyService(new KeyODM());
      await service.register(keyInput);
    } catch (error) {
      expect((error as Error).message).to.be.equal(RESULT_ERROR);
    }
  });
  it('Deveria retornar a lista de chaves cadastradas', async function () {
    const keyOutput: Key[] = new Key(
      '+55 (18) 99765-1187',
      'Jô Soares',
      'phonenumber',
      '633ec9fa3df977e30e993492',
    );
    Sinon.stub(Model, 'find').resolves(keyOutput);

    const service = new KeyService(new KeyODM());
    const result = await service.getByOwner('Jô Soares');

    expect(result).to.be.deep.equal(keyOutput);

    Sinon.restore();
  });

  afterEach(function () {
    Sinon.restore();
  });
});