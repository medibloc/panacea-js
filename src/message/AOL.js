import { MSG_TYPE } from '../../config';
import { checkParams } from '../utils/validate';

const { AOL } = MSG_TYPE;

class CreateTopic {
  constructor(data) {
    const requiredParams = ['topicName', 'ownerAddress'];
    checkParams(requiredParams, data);

    this.type = AOL.CREATE_TOPIC;
    this.value = {
      topic_name: data.topicName,
      description: data.description || '',
      owner_address: data.ownerAddress,
    };
  }
}

class AddWriter {
  constructor(data) {
    const requiredParams = ['topicName', 'writerAddress', 'ownerAddress'];
    checkParams(requiredParams, data);

    this.type = AOL.ADD_WRITER;
    this.value = {
      topic_name: data.topicName,
      moniker: data.moniker || '',
      description: data.description || '',
      writer_address: data.writerAddress,
      owner_address: data.ownerAddress,
    };
  }
}

class AddRecord {
  constructor(data) {
    const requiredParams = ['topicName', 'key', 'value', 'writerAddress', 'ownerAddress'];
    checkParams(requiredParams, data);

    this.type = AOL.ADD_RECORD;
    this.value = {
      topic_name: data.topicName,
      key: Buffer.from(data.key).toString('base64'),
      value: Buffer.from(data.value).toString('base64'),
      writer_address: data.writerAddress,
      owner_address: data.ownerAddress,
      fee_payer_address: data.feePayerAddress || '',
    };
  }
}

class DeleteWriter {
  constructor(data) {
    const requiredParams = ['topicName', 'writerAddress', 'ownerAddress'];
    checkParams(requiredParams, data);

    this.type = AOL.DELETE_WRITER;
    this.value = {
      topic_name: data.topicName,
      writer_address: data.writerAddress,
      owner_address: data.ownerAddress,
    };
  }
}

export {
  CreateTopic,
  AddWriter,
  AddRecord,
  DeleteWriter,
};
