export class CreateTopic {
  constructor(
    public topic_name: string,
    public description: string = '',
    public owner_address: string,
  ) {}
}

export class AddWriter {
  constructor(
    public topic_name: string,
    public moniker: string = '',
    public description: string = '',
    public writer_address: string,
    public owner_address: string,
  ) {}
}

export class AddRecord {
  public topic_name: string;
  public key: string;
  public value: string;
  public writer_address: string;
  public owner_address: string;
  public fee_payer_address: string;

  constructor(topic_name: string, key: ArrayBuffer, value: ArrayBuffer, writer_address: string, owner_address: string, fee_payer_address = '') {
    this.topic_name = topic_name;
    this.key = Buffer.from(key).toString('base64');
    this.value = Buffer.from(value).toString('base64');
    this.writer_address = writer_address;
    this.owner_address = owner_address;
    this.fee_payer_address = fee_payer_address;
  }
}

export class DeleteWriter {
  constructor(
    public topic_name: string,
    public writer_address: string,
    public owner_address: string,
  ) {}
}
