import * as AOL from "./AOL";
import * as Base from "./Base";
import * as DID from "./DID";
import * as Distr from "./Distribution";
import * as Staking from "./Staking";
import * as Slashing from "./Slashing";
import {MSG_TYPE} from "../config/default";
import {classToPlain, plainToClass} from "class-transformer";

export {
  AOL,
  Base,
  DID,
  Distr,
  Staking,
  Slashing,
}

export class Message {
  type: string;
  value: Record<string, any>;

  constructor(type: string, value: InnerMsg) {
    this.type = type;
    this.value = classToPlain(value);
  }
}

export type InnerMsg =
  |  AOL.CreateTopic | AOL.AddWriter | AOL.AddRecord | AOL.DeleteWriter
  | Base.Base
  | DID.CreateDID | DID.UpdateDID | DID.DeactivateDID
  | Distr.WithdrawReward | Distr.ModifyWithdrawAddress
  | Staking.CreateValidator | Staking.EditValidator | Staking.Delegate | Staking.Redelegate | Staking.Undelegate
  | Slashing.Unjail

export function wrap(inner: InnerMsg): Message {
  switch (inner.constructor) {
    case AOL.CreateTopic:
      return new Message(MSG_TYPE.AOL.CREATE_TOPIC, inner);
    case AOL.AddWriter:
      return new Message(MSG_TYPE.AOL.ADD_WRITER, inner);
    case AOL.AddRecord:
      return new Message(MSG_TYPE.AOL.ADD_RECORD, inner);
    case AOL.DeleteWriter:
      return new Message(MSG_TYPE.AOL.DELETE_WRITER, inner);
    case Base.Base:
      return new Message(MSG_TYPE.BASE.SEND, inner);
    case DID.CreateDID:
      return new Message(MSG_TYPE.DID.CREATE_DID, inner);
    case DID.UpdateDID:
      return new Message(MSG_TYPE.DID.UPDATE_DID, inner);
    case DID.DeactivateDID:
      return new Message(MSG_TYPE.DID.DEACTIVATE_DID, inner);
    case Distr.WithdrawReward:
      return new Message(MSG_TYPE.DISTR.WITHDRAW_DELEGATION_REWARD, inner);
    case Distr.ModifyWithdrawAddress:
      return new Message(MSG_TYPE.DISTR.MODIFY_WITHDRAW_ADDR, inner);
    case Staking.CreateValidator:
      return new Message(MSG_TYPE.STAKING.CREATE_VALIDATOR, inner);
    case Staking.EditValidator:
      return new Message(MSG_TYPE.STAKING.EDIT_VALIDATOR, inner);
    case Staking.Delegate:
      return new Message(MSG_TYPE.STAKING.DELEGATE, inner);
    case Staking.Redelegate:
      return new Message(MSG_TYPE.STAKING.REDELEGATE, inner);
    case Staking.Undelegate:
      return new Message(MSG_TYPE.STAKING.UNDELEGATE, inner);
    case Slashing.Unjail:
      return new Message(MSG_TYPE.SLASHING.UNJAIL, inner);
    default:
      throw new Error(`unsupported inner message type: ${inner.constructor}`);
  }
}

export function unwrap(message: Message): InnerMsg {
  switch (message.type) {
    case MSG_TYPE.AOL.CREATE_TOPIC:
      return plainToClass(AOL.CreateTopic, message.value);
    case MSG_TYPE.AOL.ADD_WRITER:
      return plainToClass(AOL.AddWriter, message.value);
    case MSG_TYPE.AOL.ADD_RECORD:
      return plainToClass(AOL.AddRecord, message.value);
    case MSG_TYPE.AOL.DELETE_WRITER:
      return plainToClass(AOL.DeleteWriter, message.value);
    case MSG_TYPE.BASE.SEND:
      return plainToClass(Base.Base, message.value);
    case MSG_TYPE.DID.CREATE_DID:
      return plainToClass(DID.CreateDID, message.value);
    case MSG_TYPE.DID.UPDATE_DID:
      return plainToClass(DID.UpdateDID, message.value);
    case MSG_TYPE.DID.DEACTIVATE_DID:
      return plainToClass(DID.DeactivateDID, message.value);
    case MSG_TYPE.DISTR.WITHDRAW_DELEGATION_REWARD:
      return plainToClass(Distr.WithdrawReward, message.value);
    case MSG_TYPE.DISTR.MODIFY_WITHDRAW_ADDR:
      return plainToClass(Distr.ModifyWithdrawAddress, message.value);
    case MSG_TYPE.STAKING.CREATE_VALIDATOR:
      return plainToClass(Staking.CreateValidator, message.value);
    case MSG_TYPE.STAKING.EDIT_VALIDATOR:
      return plainToClass(Staking.EditValidator, message.value);
    case MSG_TYPE.STAKING.DELEGATE:
      return plainToClass(Staking.Delegate, message.value);
    case MSG_TYPE.STAKING.REDELEGATE:
      return plainToClass(Staking.Redelegate, message.value);
    case MSG_TYPE.STAKING.UNDELEGATE:
      return plainToClass(Staking.Undelegate, message.value);
    case MSG_TYPE.SLASHING.UNJAIL:
      return plainToClass(Slashing.Unjail, message.value);
    default:
      throw new Error(`unsupported message type: ${message.type}`);
  }
}
