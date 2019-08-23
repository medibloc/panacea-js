export const DEFAULT_DENOM = 'umed';

export const ACCOUNT = {
  mnemonic: 'dove verify fault digital wisdom number camera ' +
    'piano ethics sunset smooth defense silk myself person ' +
    'bar total venture custom mushroom until north poet knife',
  privKey: 'beb4ff264d05d37fe616d76c6c13d2ade29ab62ef548b72c15b6ea7f1f53402f',
  pubKey: '03021dfc4159a06eb9da06768bc3566cb42efd04edc3c4792cfd8a02c523d8eb2b',
  address: 'panacea1lcunvvf69undtva5ugfyu00nxvcunacptgar6t',
};
export const ANOTHER_ACCOUNT = {
  mnemonic: 'flavor famous expand drive asset misery bulk ' +
    'bronze awful layer thunder wild tiger myth melody space ' +
    'arrow river soul gym mule razor fluid soup',
  privKey: '6b2b6b1ee95bdbc75e102dd0b0a86b47a881183ef6250b1c8b2d10a604c519e8',
  pubKey: '02679a41e5c655d0c9c83152572f0915df86b620359e5003d1c47b85c5e0a838fd',
  address: 'panacea1tx2ltp7max4jkjy8m5aw575nkh6umlhzrag4ky',
};

export const SIMPLE_TX = {
  chainId: 'test',
  fee: [{
    amount: [
      {
        denom: 'umed',
        amount: 2000000,
      },
    ],
    gas: 200000,
  }],
};

export const MESSAGE = {
  BASE: {
    fromAddress: ACCOUNT.address,
    toAddress: ANOTHER_ACCOUNT.address,
    amount: [{
      denom: DEFAULT_DENOM,
      amount: 100000,
    }],
  },
  AOL: {
    CREATE_TOPIC: {
      topicName: 'test',
      ownerAddress: ACCOUNT.address,
      description: 'test description',
    },
    ADD_WRITER: {
      topicName: 'test',
      moniker: 'test writer',
      description: 'test description',
      writerAddress: ANOTHER_ACCOUNT.address,
      ownerAddress: ACCOUNT.address,
    },
    ADD_RECORD: {
      topicName: 'test',
      key: 'test key',
      value: 'test value',
      writerAddress: ANOTHER_ACCOUNT.address,
      ownerAddress: ACCOUNT.address,
      feePayerAddress: ANOTHER_ACCOUNT.address,
    },
    DELETE_WRITER: {
      topicName: 'test',
      writerAddress: ANOTHER_ACCOUNT.address,
      ownerAddress: ACCOUNT.address,
    },
  },
  DISTR: {
    WITHDRAW_REWARD: {
      delegatorAddress: ACCOUNT.address,
      validatorAddress: ANOTHER_ACCOUNT.address,
    },
    MODIFY_WITHDRAW_ADDR: {
      delegatorAddress: ACCOUNT.address,
      withdrawAddress: ANOTHER_ACCOUNT.address,
    },
  },
  SLASHING: {
    UNJAIL: {
      address: ACCOUNT.address,
    },
  },
  STAKING: {
    CREATE_VALIDATOR: {
      description: {
        moniker: 'test',
        identity: '0123456789',
        website: 'https://test.com',
        details: 'test',
      },
      commission: {
        rate: '0.5',
        maxRate: '1.0',
        maxChangeRate: '0.5',
      },
      minSelfDelegation: '1',
      delegatorAddress: ACCOUNT.address,
      validatorAddress: ANOTHER_ACCOUNT.address,
      pubKey: ACCOUNT.pubKey,
      value: {
        denom: DEFAULT_DENOM,
        amount: 10000,
      },
    },
    EDIT_VALIDATOR: {
      description: {
        identity: 'test',
        website: 'https://test.com',
        details: 'test',
      },
      address: ACCOUNT.address,
      commissionRate: '1.0',
      minSelfDelegation: '1',
    },
    DELEGATE: {
      delegatorAddress: ACCOUNT.address,
      validatorAddress: ANOTHER_ACCOUNT.address,
      amount: {
        denom: DEFAULT_DENOM,
        amount: 1000,
      },
    },
    REDELEGATE: {
      delegatorAddress: ACCOUNT.address,
      validatorSrcAddress: ACCOUNT.address,
      validatorDstAddress: ANOTHER_ACCOUNT.address,
      amount: {
        denom: DEFAULT_DENOM,
        amount: 1000,
      },
    },
    UNDELEGATE: {
      delegatorAddress: ACCOUNT.address,
      validatorAddress: ANOTHER_ACCOUNT.address,
      amount: {
        denom: DEFAULT_DENOM,
        amount: 1000,
      },
    },
  },
};
