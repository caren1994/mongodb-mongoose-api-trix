import IKey from '../../Interfaces/IKey';
import IValid from '../../Interfaces/IValid';
import KeyTypes from '../../utils/KeyTypes';

class Mail implements IKey, IValid {
  readonly value: string;
  readonly owner: string;
  readonly type: string;

  constructor(value: string, owner: string) {
    if (!this.isValid(value)) { // validação antes de construir a classe
      throw new Error('Invalid Key');
    }
    this.value = value;
    this.owner = owner;
    this.type = KeyTypes.MAIL;
  }

  isValid(value: string): boolean {
    return /\S+@\S+\.\S+/.test(value);
  }
}

export default Mail;