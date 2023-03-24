// src/Domain/Key/Random.ts

import IValid from '../../Interfaces/IValid';
import IKey from '../../Interfaces/IKey';
import KeyTypes from '../../utils/KeyTypes';

class Random implements IKey, IValid {// implementa o ikey e ivalid para poder ser usado no keyfactory
  readonly value: string;
  readonly owner: string;
  readonly type: string;
  
  constructor(value: string, owner: string) {
    if (!this.isValid(value)) throw Error('Invalid Key');// faz a validação 
    this.value = value;
    this.owner = owner;
    this.type = KeyTypes.RANDOM;// type do enum
  }

  isValid(value: string): boolean {
    const regex = /^\w{8}-\w{4}-\w{4}-\w{4}-\d{12}$/;
    return regex.test(value);
  }
}

export default Random;