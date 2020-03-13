import { expect } from 'chai';
import decode from '../../src/encoding/decode';

describe('decode', () => {
  const txData = 'swHwYl3uCin1rCMCCg1jZXJ0aWZpY2F0aW9uGhRpzQnhs67Ll6DGrwsgR4eo2nOtthIWChAKBHVtZWQSCDEwMDAwMDAwEMCaDBpqCibrWumHIQMhm0g3O7eef24yI6STg7q3Ii6gPI9gYs3uQNOua2V3+hJArUDhsKm5yAX4C9PsluBsWB10xZVpk7W2L2Pot+8ODIsoVLmdYnnng+Dxy8eji7angvtDPC7/8cqvQ9S5wUR+8Q==';

  const tx = {
    type: 'auth/StdTx',
    value: {
      msg: [
        {
          type: 'aol/MsgCreateTopic',
          value: {
            topic_name: 'certification',
            description: '',
            owner_address: 'panacea1d8xsncdn4m9e0gxx4u9jq3u84rd88tdkthz6pu',
          },
        },
      ],
      fee: {
        amount: [
          {
            denom: 'umed',
            amount: '10000000',
          },
        ],
        gas: '200000',
      },
      signatures: [
        {
          pub_key: {
            type: 'tendermint/PubKeySecp256k1',
            value: 'AyGbSDc7t55/bjIjpJODurciLqA8j2Bize5A065rZXf6',
          },
          signature: 'rUDhsKm5yAX4C9PsluBsWB10xZVpk7W2L2Pot+8ODIsoVLmdYnnng+Dxy8eji7angvtDPC7/8cqvQ9S5wUR+8Q==',
        },
      ],
      memo: '',
    },
  };

  it('decodes tx data to tx', () => {
    const decodedTx = decode(txData);
    expect(decodedTx).to.eql(tx);
  });
});
