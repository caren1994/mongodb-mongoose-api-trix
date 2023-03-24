import Key from '../Domain/Key/Key';
import KeyFactory from '../Domain/Key/KeyFactory';
import IKey from '../Interfaces/IKey';
import KeyODM from '../Models/KeyODM';

class KeyService {
  private keyODM: KeyODM;

  constructor(keyODM: KeyODM) {
    this.keyODM = keyODM;// recebo o keyodm pelo routes que envia para o controller que envia para o service
  }

  private createKeyDomain(key: IKey | null): Key | null {
    if (key) {
      return new Key(
        key.value,
        key.owner,
        key.type,
        key.id,
        // recebe o objeto de  uma key  do tipo ikey ja validado e será
        // transformado em uma key do tipo key aonde teremos acesso para
        // manipular tais atributos
      );
    }
    return null;
  }

  public async register(key: IKey) { // adc uma nova chave no banco 
    const typedKey = KeyFactory.create(key);// vou no keyfactory e vejo o tipo da chave e retorno o seu obj
    const newKey = await this.keyODM.create(typedKey);// mando o obj para a model para ser criado no banco de daos a key
    return this.createKeyDomain(newKey);
    // e mando para essa função que vai transformar a key recebida do tipo 
    // ikey em um objeto do tipo key assim teremos acesso as funções que recuperam 
    // e manipulam as informações de uma chave.
  }

  public async getByValue(value: string): Promise<Key | null> { 
    // procura apenas o valor da key
    const key = await this.keyODM.findByValue(value);
    // procura se ela existe no banco de dados 
    return this.createKeyDomain(key);
    // e o retorna modificando-o para um key com seus vaalores 
  }

  public async getByOwner(owner: string) {
    const keys = await this.keyODM.findByOwner(owner);
    const keySet = keys.map((key) => this.createKeyDomain(key));
    return keySet;
  }
}

export default KeyService;