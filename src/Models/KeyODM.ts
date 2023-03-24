import { Schema } from 'mongoose';
import IKey from '../Interfaces/IKey';
import AbstractODM from './AbstractODM';

class KeyODM extends AbstractODM<IKey> {// extedns da classe abstrata 
  constructor() {
    const schema = new Schema<IKey>({ // crio o shema 
      value: { type: String, required: true },
      owner: { type: String, required: true },
      type: { type: String, required: true },
    });

    super(schema, 'Key');// envio para o construtor do pai o schema e o nome da collection da model 
  }

  public async findByValue(value: string): Promise<IKey | null> {
    return this.model.findOne({ value });
    // como coloquei a model como readonly para os filhos eu consigo fazer
    // esse metodo particlar do keyodm buscando na model 
    // ou seja nao preciso colocar essa função la no abstractodm 
  }
  public async findByOwner(owner: string): Promise<IKey[]> {
    return this.model.find({ owner });
  }
}

export default KeyODM;