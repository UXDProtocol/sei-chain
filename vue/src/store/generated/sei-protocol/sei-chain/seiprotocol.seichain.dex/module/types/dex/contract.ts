/* eslint-disable */
import * as Long from "long";
import { util, configure, Writer, Reader } from "protobufjs/minimal";

export const protobufPackage = "seiprotocol.seichain.dex";

export interface ContractInfo {
  codeId: number;
  contractAddr: string;
  NeedHook: boolean;
  NeedOrderMatching: boolean;
}

const baseContractInfo: object = {
  codeId: 0,
  contractAddr: "",
  NeedHook: false,
  NeedOrderMatching: false,
};

export const ContractInfo = {
  encode(message: ContractInfo, writer: Writer = Writer.create()): Writer {
    if (message.codeId !== 0) {
      writer.uint32(8).uint64(message.codeId);
    }
    if (message.contractAddr !== "") {
      writer.uint32(18).string(message.contractAddr);
    }
    if (message.NeedHook === true) {
      writer.uint32(24).bool(message.NeedHook);
    }
    if (message.NeedOrderMatching === true) {
      writer.uint32(32).bool(message.NeedOrderMatching);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): ContractInfo {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseContractInfo } as ContractInfo;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.codeId = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.contractAddr = reader.string();
          break;
        case 3:
          message.NeedHook = reader.bool();
          break;
        case 4:
          message.NeedOrderMatching = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ContractInfo {
    const message = { ...baseContractInfo } as ContractInfo;
    if (object.codeId !== undefined && object.codeId !== null) {
      message.codeId = Number(object.codeId);
    } else {
      message.codeId = 0;
    }
    if (object.contractAddr !== undefined && object.contractAddr !== null) {
      message.contractAddr = String(object.contractAddr);
    } else {
      message.contractAddr = "";
    }
    if (object.NeedHook !== undefined && object.NeedHook !== null) {
      message.NeedHook = Boolean(object.NeedHook);
    } else {
      message.NeedHook = false;
    }
    if (
      object.NeedOrderMatching !== undefined &&
      object.NeedOrderMatching !== null
    ) {
      message.NeedOrderMatching = Boolean(object.NeedOrderMatching);
    } else {
      message.NeedOrderMatching = false;
    }
    return message;
  },

  toJSON(message: ContractInfo): unknown {
    const obj: any = {};
    message.codeId !== undefined && (obj.codeId = message.codeId);
    message.contractAddr !== undefined &&
      (obj.contractAddr = message.contractAddr);
    message.NeedHook !== undefined && (obj.NeedHook = message.NeedHook);
    message.NeedOrderMatching !== undefined &&
      (obj.NeedOrderMatching = message.NeedOrderMatching);
    return obj;
  },

  fromPartial(object: DeepPartial<ContractInfo>): ContractInfo {
    const message = { ...baseContractInfo } as ContractInfo;
    if (object.codeId !== undefined && object.codeId !== null) {
      message.codeId = object.codeId;
    } else {
      message.codeId = 0;
    }
    if (object.contractAddr !== undefined && object.contractAddr !== null) {
      message.contractAddr = object.contractAddr;
    } else {
      message.contractAddr = "";
    }
    if (object.NeedHook !== undefined && object.NeedHook !== null) {
      message.NeedHook = object.NeedHook;
    } else {
      message.NeedHook = false;
    }
    if (
      object.NeedOrderMatching !== undefined &&
      object.NeedOrderMatching !== null
    ) {
      message.NeedOrderMatching = object.NeedOrderMatching;
    } else {
      message.NeedOrderMatching = false;
    }
    return message;
  },
};

declare var self: any | undefined;
declare var window: any | undefined;
var globalThis: any = (() => {
  if (typeof globalThis !== "undefined") return globalThis;
  if (typeof self !== "undefined") return self;
  if (typeof window !== "undefined") return window;
  if (typeof global !== "undefined") return global;
  throw "Unable to locate global object";
})();

type Builtin = Date | Function | Uint8Array | string | number | undefined;
export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

function longToNumber(long: Long): number {
  if (long.gt(Number.MAX_SAFE_INTEGER)) {
    throw new globalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
  }
  return long.toNumber();
}

if (util.Long !== Long) {
  util.Long = Long as any;
  configure();
}
