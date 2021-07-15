import { createProtobufRpcClient, StargateClient } from "@cosmjs/stargate";
import { Tendermint34Client } from "@cosmjs/tendermint-rpc";
import {
  QueryClientImpl as AolQueryClientImpl,
  QueryTopicsResponse,
  QueryWritersResponse
} from "./proto/panacea/aol/v2/query";
import { Topic } from "./proto/panacea/aol/v2/topic";
import { PageRequest } from "./proto/cosmos/base/query/v1beta1/pagination";
import { Writer } from "./proto/panacea/aol/v2/writer";
import { Record } from "./proto/panacea/aol/v2/record";
import Long from "long";

const rpcErrMsgNotFound = /rpc error: code = NotFound/i;

/**
 * A class for querying Panacea.
 * It extends StargateClient, so that you can call Stargate general queries, such as getBalance.
 */
export class PanaceaClient extends StargateClient {
  constructor(tmClient: Tendermint34Client | undefined) {
    super(tmClient);
  }

  /**
   * Creates a PanaceaClient.
   */
  static async connect(endpoint: string): Promise<PanaceaClient> {
    const tmClient = await Tendermint34Client.connect(endpoint);
    return new PanaceaClient(tmClient);
  }

  async getTopic(ownerAddress: string, topicName: string): Promise<Topic | null> {
    const queryService = new AolQueryClientImpl(createProtobufRpcClient(this.forceGetQueryClient()));
    try {
      const resp = await queryService.Topic({ownerAddress: ownerAddress, topicName: topicName});
      return resp.topic ?? null;
    } catch (error) {
      if (rpcErrMsgNotFound.test(error)) {
        return null;
      }
      throw error;
    }
  }

  async getTopics(ownerAddress: string, pageRequest?: PageRequest): Promise<QueryTopicsResponse> {
    const queryService = new AolQueryClientImpl(createProtobufRpcClient(this.forceGetQueryClient()));
    return await queryService.Topics({ownerAddress: ownerAddress, pagination: pageRequest});
  }

  async getWriter(ownerAddress: string, topicName: string, writerAddress: string): Promise<Writer | null> {
    const queryService = new AolQueryClientImpl(createProtobufRpcClient(this.forceGetQueryClient()));
    try {
      const resp = await queryService.Writer({
        ownerAddress: ownerAddress,
        topicName: topicName,
        writerAddress: writerAddress
      });
      return resp.writer ?? null;
    } catch (error) {
      if (rpcErrMsgNotFound.test(error)) {
        return null;
      }
      throw error;
    }
  }

  async getWriters(ownerAddress: string, topicName: string, pageRequest?: PageRequest): Promise<QueryWritersResponse> {
    const queryService = new AolQueryClientImpl(createProtobufRpcClient(this.forceGetQueryClient()));
    return await queryService.Writers({ownerAddress: ownerAddress, topicName: topicName, pagination: pageRequest});
  }

  async getRecord(ownerAddress: string, topicName: string, offset: Long): Promise<Record | null> {
    const queryService = new AolQueryClientImpl(createProtobufRpcClient(this.forceGetQueryClient()));
    try {
      const resp = await queryService.Record({ownerAddress: ownerAddress, topicName: topicName, offset: offset})
      return resp.record ?? null;
    } catch (error) {
      if (rpcErrMsgNotFound.test(error)) {
        return null;
      }
      throw error;
    }
  }

  // TODO: implement x/did, x/token queries
}
