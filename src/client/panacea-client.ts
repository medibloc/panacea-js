import {
  createProtobufRpcClient,
  QueryClient,
  StargateClient,
  StargateClientOptions,
} from "@cosmjs/stargate";
import { Topic } from "../proto/panacea/aol/v2/topic";
import { Tendermint37Client } from "@cosmjs/tendermint-rpc/build/tendermint37";
import { CometClient } from "@cosmjs/tendermint-rpc";
import { PageRequest } from "../proto/cosmos/base/query/v1beta1/pagination";
import {
  QueryClientImpl as AolQueryClientImpl,
  QueryTopicsResponse,
  QueryWritersResponse,
} from "../proto/panacea/aol/v2/query";
import { Writer } from "../proto/panacea/aol/v2/writer";
import { Record } from "../proto/panacea/aol/v2/record";
import Long from "long";
import { DIDDocumentWithSeq } from "../proto/panacea/did/v2/did";
import {
  QueryClientImpl as PnftQueryClientImpl,
  QueryDenomsByOwnerResponse,
  QueryDenomsResponse,
  QueryPNFTsByDenomOwnerResponse,
  QueryPNFTsResponse,
} from "../proto/panacea/pnft/v2/query";
import { QueryClientImpl as DidQueryClientImpl } from "../proto/panacea/did/v2/query";
import { Denom } from "../proto/panacea/pnft/v2/denom";
import { Pnft } from "../proto/panacea/pnft/v2/pnft";

export class PanaceaClient extends StargateClient {
  private readonly aolQueryClient: AolQueryClientImpl;
  private readonly didQueryClient: DidQueryClientImpl;
  private readonly pnftQueryClient: PnftQueryClientImpl;

  constructor(tmClient: CometClient, options: StargateClientOptions) {
    super(tmClient, options);
    const pbRpcClient = createProtobufRpcClient(new QueryClient(tmClient));
    this.aolQueryClient = new AolQueryClientImpl(pbRpcClient);
    this.didQueryClient = new DidQueryClientImpl(pbRpcClient);
    this.pnftQueryClient = new PnftQueryClientImpl(pbRpcClient);
  }

  /**
   * Creates a PanaceaClient.
   */
  static async connect(endpoint: string): Promise<PanaceaClient> {
    const tmClient = await Tendermint37Client.connect(endpoint);
    return new PanaceaClient(tmClient, {});
  }

  async getTopic(
    ownerAddress: string,
    topicName: string,
  ): Promise<Topic | undefined> {
    return fetchWithFallback(() =>
      this.aolQueryClient.Topic({
        ownerAddress: ownerAddress,
        topicName: topicName,
      }),
    ).then((resp) => resp?.topic);
  }

  async getTopics(
    ownerAddress: string,
    pageRequest?: PageRequest,
  ): Promise<QueryTopicsResponse> {
    return this.aolQueryClient.Topics({
      ownerAddress: ownerAddress,
      pagination: pageRequest,
    });
  }

  async getRecord(
    ownerAddress: string,
    topicName: string,
    offset: number,
  ): Promise<Record | undefined> {
    return fetchWithFallback(() =>
      this.aolQueryClient.Record({
        ownerAddress: ownerAddress,
        topicName: topicName,
        offset: new Long(offset),
      }),
    ).then((res) => res?.record);
  }

  async getWriters(
    ownerAddress: string,
    topicName: string,
    pageRequest?: PageRequest,
  ): Promise<QueryWritersResponse> {
    return this.aolQueryClient.Writers({
      ownerAddress: ownerAddress,
      topicName: topicName,
      pagination: pageRequest,
    });
  }

  async getWriter(
    ownerAddress: string,
    topicName: string,
    writerAddress: string,
  ): Promise<Writer | undefined> {
    return fetchWithFallback(() =>
      this.aolQueryClient.Writer({
        ownerAddress: ownerAddress,
        topicName: topicName,
        writerAddress: writerAddress,
      }),
    ).then((res) => res?.writer);
  }

  async getDid(did: string): Promise<DIDDocumentWithSeq | undefined> {
    return fetchWithFallback(() =>
      this.didQueryClient.DID({
        didBase64: Buffer.from(did).toString("base64"),
      }),
    ).then((res) => res?.didDocumentWithSeq);
  }

  async getDenoms(pagination?: PageRequest): Promise<QueryDenomsResponse> {
    return this.pnftQueryClient.Denoms({ pagination });
  }

  async getDenomsByOwner(owner: string): Promise<QueryDenomsByOwnerResponse> {
    return this.pnftQueryClient.DenomsByOwner({ owner });
  }

  async getDenom(id: string): Promise<Denom | undefined> {
    return fetchWithFallback(() => this.pnftQueryClient.Denom({ id })).then(
      (res) => res?.denom,
    );
  }

  async getPnfts(denomId: string): Promise<QueryPNFTsResponse> {
    return this.pnftQueryClient.PNFTs({ denomId });
  }

  async getPnftsByOwner(
    denomId: string,
    owner: string,
  ): Promise<QueryPNFTsByDenomOwnerResponse> {
    return this.pnftQueryClient.PNFTsByDenomOwner({ denomId, owner });
  }

  async getPnft(denomId: string, id: string): Promise<Pnft | undefined> {
    return fetchWithFallback(() =>
      this.pnftQueryClient.PNFT({ denomId, id }),
    ).then((res) => res?.pnft);
  }
}

async function fetchWithFallback<T>(
  fetchFunc: () => Promise<T>,
): Promise<T | undefined> {
  try {
    return await fetchFunc();
  } catch (error) {
    console.error(error);
  }
}
