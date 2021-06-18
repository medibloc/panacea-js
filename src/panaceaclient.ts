import { createProtobufRpcClient, StargateClient } from "@cosmjs/stargate";
import { Tendermint34Client } from "@cosmjs/tendermint-rpc";
import {
  QueryClientImpl as AolQueryClientImpl,
  QueryListTopicsResponse,
  QueryListWritersResponse
} from "proto/panacea/aol/v2/query";
import { Topic } from "proto/panacea/aol/v2/topic";
import { PageRequest } from "proto/cosmos/base/query/v1beta1/pagination";
import { Writer } from "proto/panacea/aol/v2/writer";
import { Record } from "proto/panacea/aol/v2/record";
import Long from "long";

export class PanaceaClient extends StargateClient {
  constructor(tmClient: Tendermint34Client | undefined) {
    super(tmClient);
  }

  static async connect(endpoint: string): Promise<PanaceaClient> {
    const tmClient = await Tendermint34Client.connect(endpoint);
    return new PanaceaClient(tmClient);
  }

  async getTopic(ownerAddress: string, topicName: string): Promise<Topic | undefined> {
    const queryService = new AolQueryClientImpl(createProtobufRpcClient(this.forceGetQueryClient()));
    const resp = await queryService.Topic({ownerAddress: ownerAddress, topicName: topicName});
    return resp.Topic;
  }

  async getTopics(ownerAddress: string, pageRequest?: PageRequest): Promise<QueryListTopicsResponse> {
    const queryService = new AolQueryClientImpl(createProtobufRpcClient(this.forceGetQueryClient()));
    return await queryService.Topics({ownerAddress: ownerAddress, pagination: pageRequest});
  }

  async getWriter(ownerAddress: string, topicName: string, writerAddress: string): Promise<Writer | undefined> {
    const queryService = new AolQueryClientImpl(createProtobufRpcClient(this.forceGetQueryClient()));
    const resp = await queryService.Writer({ownerAddress: ownerAddress, topicName: topicName, writerAddress: writerAddress});
    return resp.Writer;
  }

  async getWriters(ownerAddress: string, topicName: string, pageRequest?: PageRequest): Promise<QueryListWritersResponse> {
    const queryService = new AolQueryClientImpl(createProtobufRpcClient(this.forceGetQueryClient()));
    return await queryService.Writers({ownerAddress: ownerAddress, topicName: topicName, pagination: pageRequest});
  }

  async getRecord(ownerAddress: string, topicName: string, offset: Long): Promise<Record | undefined> {
    const queryService = new AolQueryClientImpl(createProtobufRpcClient(this.forceGetQueryClient()));
    const resp = await queryService.Record({ownerAddress: ownerAddress, topicName: topicName, offset: offset})
    return resp.Record;
  }
}