import {Type} from "class-transformer";

export class CreateDID {
  public did: string;
  @Type(() => DIDDocument)
  public document: DIDDocument;
  public sig_key_id: string;
  public signature: string;
  public from_address: string;

  constructor(did: string, document: DIDDocument, sig_key_id: string, signature: string, from_address: string) {
    this.did = did;
    this.document = document;
    this.sig_key_id = sig_key_id;
    this.signature = signature;
    this.from_address = from_address;
  }
}

export class UpdateDID {
  public did: string;
  @Type(() => DIDDocument)
  public document: DIDDocument;
  public sig_key_id: string;
  public signature: string;
  public from_address: string;

  constructor(did: string, document: DIDDocument, sig_key_id: string, signature: string, from_address: string) {
    this.did = did;
    this.document = document;
    this.sig_key_id = sig_key_id;
    this.signature = signature;
    this.from_address = from_address;
  }
}

export class DeactivateDID {
  constructor(
    public did: string,
    public sig_key_id: string,
    public signature: string,
    public from_address: string,
  ) {}
}

export class DIDDocument {
  public id: string;
  @Type(() => DIDPubKey)
  public publicKey: DIDPubKey[];
  public authentication: string[];

  constructor(id: string, publicKey: DIDPubKey[], authentication: string[]) {
    this.id = id;
    this.publicKey = publicKey;
    this.authentication = authentication;
  }
}

export class DIDPubKey {
  constructor(
    public id: string,
    public type: string,
    public publicKeyBase58: string,
  ) {
  }
}

export const InitialSequence = 0;
