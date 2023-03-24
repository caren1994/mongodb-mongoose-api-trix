import IKey from '../../Interfaces/IKey';
import IValid from '../../Interfaces/IValid';
import KeyTypes from '../../utils/KeyTypes';

class CPF implements IKey, IValid {
  readonly value: string;
  readonly owner: string;
  readonly type: string;

  constructor(value: string, owner: string) {
    if (!this.isValid(value)) throw Error('Invalid Key');// faz a validação antes de costruir a classe 
    this.value = value;
    this.owner = owner;
    this.type = KeyTypes.CPF;// coloca o types do enum 
  }

  isValid(value: string): boolean {
    const regex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
    return regex.test(value);
  }
}

export default CPF;