/* eslint-disable */

export const protobufPackage = "panacea.burn.v2";

/** Query defines the gRPC querier service. */
export interface Query {
}

export const QueryServiceName = "panacea.burn.v2.Query";
export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || QueryServiceName;
    this.rpc = rpc;
  }
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}
