import IKey from '../../Interfaces/IKey';
import KeyTypes from '../../utils/KeyTypes';
import CPF from './CPF';
import PhoneNumber from './PhoneNumber';
import IValid from '../../Interfaces/IValid';
import Mail from './Mail';
import Random from './Random';

class KeyFactory {
  // static metodo que pode ser chamado sem precisar instanciar 
  // a classe apenas chamando ele com o nome da classe ao qual ele 
  // pertence ex:keyfactory.create(...)
  public static create(key: IKey): IKey & IValid {
    // principio de liskov que pode ser retornado qualquer coisa desde que seja uma classe oande tenha implentado o ikey e ivalid 
    // vai receber um obj de uma  key do tipo ikey que foi feito com o req no controller 

    if (key.type === KeyTypes.CPF) { // vai verificar o type
      return new CPF(key.value, key.owner);
      // que vai receber os seus valores e fazer uma validação da veracidade
      // caso de certo retorna esses valores 
    }
    if (key.type === KeyTypes.PHONE_NUMBER) {
      return new PhoneNumber(key.value, key.owner);
    }
    if (key.type === KeyTypes.MAIL) {
      return new Mail(key.value, key.owner);
    }
    if (key.type === KeyTypes.RANDOM) {
      return new Random(key.value, key.owner);
    }
    throw new Error('Invalid Key Type!');
  }
}

// princípio de liskov:sugere que objetos odem ser
// substituidos por seus subtipos sem que isso afete a execução 
// correta do programa.esse principio garante que podemos definir quaisquer 
// tipos de chaves sem a necessidade de informar todos os diferentes tipos no retorno 

export default KeyFactory;