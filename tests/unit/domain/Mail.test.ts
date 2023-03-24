import { expect } from 'chai';
import Mail from '../../../src/Domain/Key/Mail';

describe('Teste para entidade de domínio Mail', function () { 
  it('Deve ser possível criar uma instância de Mail', function () {
    const mail = new Mail('teste@teste.com', 'Apedeuta');
    expect(mail).to.be.instanceOf(Mail);
  });

  it(
    'Deve causar um erro ao tentar criar um email com valor inválido', 
    function () {
      let exception;
      try {
        // eslint-disable-next-line no-new
        new Mail('emailivalido', 'Apedeuta');
      } catch (error) {
        exception = error as Error;
      }
      expect(exception?.message).to.be.equal('Invalid Key');
    },
  );
});