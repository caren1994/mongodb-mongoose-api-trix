import { Model, Schema, model, models } from 'mongoose';// importo do mongoose

abstract class AbstractODM<T> {// crio a classe model abstrata
  readonly model: Model<T>;// altero a model para poder ler no findby que vou utilizar no keyodm
  private schema: Schema<T>;
  // eviando sempre um tipo generico pq hora pode ser uma model
  // de transfer que vai utilizar e hora a model de key

  constructor(schema: Schema<T>, modelName: string) {
    // recebo pelo construtor o schema feito no keyodm e transferodm
    this.schema = schema;
    this.model = models[modelName] || model(modelName, this.schema);
    // e crio a tabela com seu schema ou apenas a utilizo caso já exista
  }

  public async create(obj: T): Promise<T> { 
    // função create recebenndo generico para poder utilizar em todods os services
    return this.model.create({ ...obj });
  }

  public async findById(id: string): Promise<T | null> {
    // função findbyid com retorno generico para utilizar em todos os services
    return this.model.findById(id);
  }

  public async update(id: string, obj: Partial<T>):
  // função update recebenndo obj generico para poder utilizar em todods os services
  // partial pq só alterou o status 
  Promise<T | null> {
    return this.model.findByIdAndUpdate(
      { _id: id }, // busco pelo id enviado
      obj, // mando o obj para alterar 
      { new: true }, // para retornar e mostrar o obj recem alterado no banco de dados 
    );
  }
}

export default AbstractODM;