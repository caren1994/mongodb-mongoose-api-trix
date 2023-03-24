class Key {
  private value: string;
  private owner: string;
  private type: string;
  private id: string | undefined;

  constructor(// recbe os valores no construtor 
    value: string,
    owner: string,
    type: string,
    id: string | undefined,
  ) {
    this.value = value;
    this.owner = owner;
    this.type = type;
    this.id = id;
  }
  // caso precise que seja lido eu crio get e set 
}

export default Key;