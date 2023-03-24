import { NextFunction, Request, Response } from 'express';
import IKey from '../Interfaces/IKey';
import KeyService from '../Services/KeyService';

class KeyController {
  private service: KeyService;

  constructor(service:KeyService) { // recebe pelo routes 
    this.service = service;
  }

  public async create(req: Request, res: Response, next: NextFunction) {
    const key: IKey = { // recebe e cria o objeto de key com o parametro recebido pelo req
      value: req.body.value,
      owner: req.body.owner,
      type: req.body.type,
    };

    try {
      const newKey = await this.service.register(key);// envia o obj para o metodo register do  service 
      return res.status(201).json(newKey);
    } catch (error) {
      next(error);
    }
  }

  public async getByValue(req: Request, res: Response, _next: NextFunction):
  Promise<Response> {
    const { value } = req.params;// recebe o value pelo req
    const key = await this.service.getByValue(value);// envia o value para a função get do service 
    return res.status(200).json(key);
  }

  public async getByOwner(req: Request, res: Response, _next: NextFunction) {
    const { name } = req.params;
    const key = await this.service.getByOwner(name);
    return res.status(200).json(key);
  }

/* ... */
}

export default KeyController;