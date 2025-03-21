/* eslint-disable */
import { Reader, util, configure, Writer } from "protobufjs/minimal";
import * as Long from "long";
import { Order } from "../dex/order";
import { Coin } from "../cosmos/base/v1beta1/coin";
import { ContractInfo } from "../dex/contract";

export const protobufPackage = "seiprotocol.seichain.dex";

export interface MsgPlaceOrders {
  creator: string;
  orders: Order[];
  contractAddr: string;
  funds: Coin[];
}

export interface MsgPlaceOrdersResponse {
  orderIds: number[];
}

export interface MsgCancelOrders {
  creator: string;
  orderIds: number[];
  contractAddr: string;
}

export interface MsgCancelOrdersResponse {}

export interface MsgLiquidation {
  creator: string;
  accountToLiquidate: string;
  contractAddr: string;
}

export interface MsgLiquidationResponse {}

export interface MsgRegisterContract {
  creator: string;
  contract: ContractInfo | undefined;
}

export interface MsgRegisterContractResponse {}

const baseMsgPlaceOrders: object = { creator: "", contractAddr: "" };

export const MsgPlaceOrders = {
  encode(message: MsgPlaceOrders, writer: Writer = Writer.create()): Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    for (const v of message.orders) {
      Order.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.contractAddr !== "") {
      writer.uint32(26).string(message.contractAddr);
    }
    for (const v of message.funds) {
      Coin.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgPlaceOrders {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgPlaceOrders } as MsgPlaceOrders;
    message.orders = [];
    message.funds = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.orders.push(Order.decode(reader, reader.uint32()));
          break;
        case 3:
          message.contractAddr = reader.string();
          break;
        case 4:
          message.funds.push(Coin.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgPlaceOrders {
    const message = { ...baseMsgPlaceOrders } as MsgPlaceOrders;
    message.orders = [];
    message.funds = [];
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    if (object.orders !== undefined && object.orders !== null) {
      for (const e of object.orders) {
        message.orders.push(Order.fromJSON(e));
      }
    }
    if (object.contractAddr !== undefined && object.contractAddr !== null) {
      message.contractAddr = String(object.contractAddr);
    } else {
      message.contractAddr = "";
    }
    if (object.funds !== undefined && object.funds !== null) {
      for (const e of object.funds) {
        message.funds.push(Coin.fromJSON(e));
      }
    }
    return message;
  },

  toJSON(message: MsgPlaceOrders): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    if (message.orders) {
      obj.orders = message.orders.map((e) => (e ? Order.toJSON(e) : undefined));
    } else {
      obj.orders = [];
    }
    message.contractAddr !== undefined &&
      (obj.contractAddr = message.contractAddr);
    if (message.funds) {
      obj.funds = message.funds.map((e) => (e ? Coin.toJSON(e) : undefined));
    } else {
      obj.funds = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<MsgPlaceOrders>): MsgPlaceOrders {
    const message = { ...baseMsgPlaceOrders } as MsgPlaceOrders;
    message.orders = [];
    message.funds = [];
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    if (object.orders !== undefined && object.orders !== null) {
      for (const e of object.orders) {
        message.orders.push(Order.fromPartial(e));
      }
    }
    if (object.contractAddr !== undefined && object.contractAddr !== null) {
      message.contractAddr = object.contractAddr;
    } else {
      message.contractAddr = "";
    }
    if (object.funds !== undefined && object.funds !== null) {
      for (const e of object.funds) {
        message.funds.push(Coin.fromPartial(e));
      }
    }
    return message;
  },
};

const baseMsgPlaceOrdersResponse: object = { orderIds: 0 };

export const MsgPlaceOrdersResponse = {
  encode(
    message: MsgPlaceOrdersResponse,
    writer: Writer = Writer.create()
  ): Writer {
    writer.uint32(10).fork();
    for (const v of message.orderIds) {
      writer.uint64(v);
    }
    writer.ldelim();
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgPlaceOrdersResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgPlaceOrdersResponse } as MsgPlaceOrdersResponse;
    message.orderIds = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.orderIds.push(longToNumber(reader.uint64() as Long));
            }
          } else {
            message.orderIds.push(longToNumber(reader.uint64() as Long));
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgPlaceOrdersResponse {
    const message = { ...baseMsgPlaceOrdersResponse } as MsgPlaceOrdersResponse;
    message.orderIds = [];
    if (object.orderIds !== undefined && object.orderIds !== null) {
      for (const e of object.orderIds) {
        message.orderIds.push(Number(e));
      }
    }
    return message;
  },

  toJSON(message: MsgPlaceOrdersResponse): unknown {
    const obj: any = {};
    if (message.orderIds) {
      obj.orderIds = message.orderIds.map((e) => e);
    } else {
      obj.orderIds = [];
    }
    return obj;
  },

  fromPartial(
    object: DeepPartial<MsgPlaceOrdersResponse>
  ): MsgPlaceOrdersResponse {
    const message = { ...baseMsgPlaceOrdersResponse } as MsgPlaceOrdersResponse;
    message.orderIds = [];
    if (object.orderIds !== undefined && object.orderIds !== null) {
      for (const e of object.orderIds) {
        message.orderIds.push(e);
      }
    }
    return message;
  },
};

const baseMsgCancelOrders: object = {
  creator: "",
  orderIds: 0,
  contractAddr: "",
};

export const MsgCancelOrders = {
  encode(message: MsgCancelOrders, writer: Writer = Writer.create()): Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    writer.uint32(18).fork();
    for (const v of message.orderIds) {
      writer.uint64(v);
    }
    writer.ldelim();
    if (message.contractAddr !== "") {
      writer.uint32(26).string(message.contractAddr);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgCancelOrders {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgCancelOrders } as MsgCancelOrders;
    message.orderIds = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.orderIds.push(longToNumber(reader.uint64() as Long));
            }
          } else {
            message.orderIds.push(longToNumber(reader.uint64() as Long));
          }
          break;
        case 3:
          message.contractAddr = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgCancelOrders {
    const message = { ...baseMsgCancelOrders } as MsgCancelOrders;
    message.orderIds = [];
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    if (object.orderIds !== undefined && object.orderIds !== null) {
      for (const e of object.orderIds) {
        message.orderIds.push(Number(e));
      }
    }
    if (object.contractAddr !== undefined && object.contractAddr !== null) {
      message.contractAddr = String(object.contractAddr);
    } else {
      message.contractAddr = "";
    }
    return message;
  },

  toJSON(message: MsgCancelOrders): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    if (message.orderIds) {
      obj.orderIds = message.orderIds.map((e) => e);
    } else {
      obj.orderIds = [];
    }
    message.contractAddr !== undefined &&
      (obj.contractAddr = message.contractAddr);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgCancelOrders>): MsgCancelOrders {
    const message = { ...baseMsgCancelOrders } as MsgCancelOrders;
    message.orderIds = [];
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    if (object.orderIds !== undefined && object.orderIds !== null) {
      for (const e of object.orderIds) {
        message.orderIds.push(e);
      }
    }
    if (object.contractAddr !== undefined && object.contractAddr !== null) {
      message.contractAddr = object.contractAddr;
    } else {
      message.contractAddr = "";
    }
    return message;
  },
};

const baseMsgCancelOrdersResponse: object = {};

export const MsgCancelOrdersResponse = {
  encode(_: MsgCancelOrdersResponse, writer: Writer = Writer.create()): Writer {
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgCancelOrdersResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgCancelOrdersResponse,
    } as MsgCancelOrdersResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgCancelOrdersResponse {
    const message = {
      ...baseMsgCancelOrdersResponse,
    } as MsgCancelOrdersResponse;
    return message;
  },

  toJSON(_: MsgCancelOrdersResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(
    _: DeepPartial<MsgCancelOrdersResponse>
  ): MsgCancelOrdersResponse {
    const message = {
      ...baseMsgCancelOrdersResponse,
    } as MsgCancelOrdersResponse;
    return message;
  },
};

const baseMsgLiquidation: object = {
  creator: "",
  accountToLiquidate: "",
  contractAddr: "",
};

export const MsgLiquidation = {
  encode(message: MsgLiquidation, writer: Writer = Writer.create()): Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.accountToLiquidate !== "") {
      writer.uint32(18).string(message.accountToLiquidate);
    }
    if (message.contractAddr !== "") {
      writer.uint32(26).string(message.contractAddr);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgLiquidation {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgLiquidation } as MsgLiquidation;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.accountToLiquidate = reader.string();
          break;
        case 3:
          message.contractAddr = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgLiquidation {
    const message = { ...baseMsgLiquidation } as MsgLiquidation;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    if (
      object.accountToLiquidate !== undefined &&
      object.accountToLiquidate !== null
    ) {
      message.accountToLiquidate = String(object.accountToLiquidate);
    } else {
      message.accountToLiquidate = "";
    }
    if (object.contractAddr !== undefined && object.contractAddr !== null) {
      message.contractAddr = String(object.contractAddr);
    } else {
      message.contractAddr = "";
    }
    return message;
  },

  toJSON(message: MsgLiquidation): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.accountToLiquidate !== undefined &&
      (obj.accountToLiquidate = message.accountToLiquidate);
    message.contractAddr !== undefined &&
      (obj.contractAddr = message.contractAddr);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgLiquidation>): MsgLiquidation {
    const message = { ...baseMsgLiquidation } as MsgLiquidation;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    if (
      object.accountToLiquidate !== undefined &&
      object.accountToLiquidate !== null
    ) {
      message.accountToLiquidate = object.accountToLiquidate;
    } else {
      message.accountToLiquidate = "";
    }
    if (object.contractAddr !== undefined && object.contractAddr !== null) {
      message.contractAddr = object.contractAddr;
    } else {
      message.contractAddr = "";
    }
    return message;
  },
};

const baseMsgLiquidationResponse: object = {};

export const MsgLiquidationResponse = {
  encode(_: MsgLiquidationResponse, writer: Writer = Writer.create()): Writer {
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgLiquidationResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgLiquidationResponse } as MsgLiquidationResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgLiquidationResponse {
    const message = { ...baseMsgLiquidationResponse } as MsgLiquidationResponse;
    return message;
  },

  toJSON(_: MsgLiquidationResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(_: DeepPartial<MsgLiquidationResponse>): MsgLiquidationResponse {
    const message = { ...baseMsgLiquidationResponse } as MsgLiquidationResponse;
    return message;
  },
};

const baseMsgRegisterContract: object = { creator: "" };

export const MsgRegisterContract = {
  encode(
    message: MsgRegisterContract,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.contract !== undefined) {
      ContractInfo.encode(message.contract, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgRegisterContract {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgRegisterContract } as MsgRegisterContract;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.contract = ContractInfo.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgRegisterContract {
    const message = { ...baseMsgRegisterContract } as MsgRegisterContract;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    if (object.contract !== undefined && object.contract !== null) {
      message.contract = ContractInfo.fromJSON(object.contract);
    } else {
      message.contract = undefined;
    }
    return message;
  },

  toJSON(message: MsgRegisterContract): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.contract !== undefined &&
      (obj.contract = message.contract
        ? ContractInfo.toJSON(message.contract)
        : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgRegisterContract>): MsgRegisterContract {
    const message = { ...baseMsgRegisterContract } as MsgRegisterContract;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    if (object.contract !== undefined && object.contract !== null) {
      message.contract = ContractInfo.fromPartial(object.contract);
    } else {
      message.contract = undefined;
    }
    return message;
  },
};

const baseMsgRegisterContractResponse: object = {};

export const MsgRegisterContractResponse = {
  encode(
    _: MsgRegisterContractResponse,
    writer: Writer = Writer.create()
  ): Writer {
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): MsgRegisterContractResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgRegisterContractResponse,
    } as MsgRegisterContractResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgRegisterContractResponse {
    const message = {
      ...baseMsgRegisterContractResponse,
    } as MsgRegisterContractResponse;
    return message;
  },

  toJSON(_: MsgRegisterContractResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(
    _: DeepPartial<MsgRegisterContractResponse>
  ): MsgRegisterContractResponse {
    const message = {
      ...baseMsgRegisterContractResponse,
    } as MsgRegisterContractResponse;
    return message;
  },
};

/** Msg defines the Msg service. */
export interface Msg {
  PlaceOrders(request: MsgPlaceOrders): Promise<MsgPlaceOrdersResponse>;
  CancelOrders(request: MsgCancelOrders): Promise<MsgCancelOrdersResponse>;
  Liquidate(request: MsgLiquidation): Promise<MsgLiquidationResponse>;
  /** privileged endpoints below */
  RegisterContract(
    request: MsgRegisterContract
  ): Promise<MsgRegisterContractResponse>;
}

export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
  }
  PlaceOrders(request: MsgPlaceOrders): Promise<MsgPlaceOrdersResponse> {
    const data = MsgPlaceOrders.encode(request).finish();
    const promise = this.rpc.request(
      "seiprotocol.seichain.dex.Msg",
      "PlaceOrders",
      data
    );
    return promise.then((data) =>
      MsgPlaceOrdersResponse.decode(new Reader(data))
    );
  }

  CancelOrders(request: MsgCancelOrders): Promise<MsgCancelOrdersResponse> {
    const data = MsgCancelOrders.encode(request).finish();
    const promise = this.rpc.request(
      "seiprotocol.seichain.dex.Msg",
      "CancelOrders",
      data
    );
    return promise.then((data) =>
      MsgCancelOrdersResponse.decode(new Reader(data))
    );
  }

  Liquidate(request: MsgLiquidation): Promise<MsgLiquidationResponse> {
    const data = MsgLiquidation.encode(request).finish();
    const promise = this.rpc.request(
      "seiprotocol.seichain.dex.Msg",
      "Liquidate",
      data
    );
    return promise.then((data) =>
      MsgLiquidationResponse.decode(new Reader(data))
    );
  }

  RegisterContract(
    request: MsgRegisterContract
  ): Promise<MsgRegisterContractResponse> {
    const data = MsgRegisterContract.encode(request).finish();
    const promise = this.rpc.request(
      "seiprotocol.seichain.dex.Msg",
      "RegisterContract",
      data
    );
    return promise.then((data) =>
      MsgRegisterContractResponse.decode(new Reader(data))
    );
  }
}

interface Rpc {
  request(
    service: string,
    method: string,
    data: Uint8Array
  ): Promise<Uint8Array>;
}

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
