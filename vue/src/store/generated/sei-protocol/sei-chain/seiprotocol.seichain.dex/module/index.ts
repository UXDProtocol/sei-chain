// THIS FILE IS GENERATED AUTOMATICALLY. DO NOT MODIFY.

import { StdFee } from "@cosmjs/launchpad";
import { SigningStargateClient } from "@cosmjs/stargate";
import { Registry, OfflineSigner, EncodeObject, DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";
import { Api } from "./rest";
import { MsgRegisterContract } from "./types/dex/tx";
import { MsgLiquidation } from "./types/dex/tx";
import { MsgPlaceOrders } from "./types/dex/tx";
import { MsgCancelOrders } from "./types/dex/tx";


const types = [
  ["/seiprotocol.seichain.dex.MsgRegisterContract", MsgRegisterContract],
  ["/seiprotocol.seichain.dex.MsgLiquidation", MsgLiquidation],
  ["/seiprotocol.seichain.dex.MsgPlaceOrders", MsgPlaceOrders],
  ["/seiprotocol.seichain.dex.MsgCancelOrders", MsgCancelOrders],
  
];
export const MissingWalletError = new Error("wallet is required");

export const registry = new Registry(<any>types);

const defaultFee = {
  amount: [],
  gas: "200000",
};

interface TxClientOptions {
  addr: string
}

interface SignAndBroadcastOptions {
  fee: StdFee,
  memo?: string
}

const txClient = async (wallet: OfflineSigner, { addr: addr }: TxClientOptions = { addr: "http://localhost:26657" }) => {
  if (!wallet) throw MissingWalletError;
  let client;
  if (addr) {
    client = await SigningStargateClient.connectWithSigner(addr, wallet, { registry });
  }else{
    client = await SigningStargateClient.offline( wallet, { registry });
  }
  const { address } = (await wallet.getAccounts())[0];

  return {
    signAndBroadcast: (msgs: EncodeObject[], { fee, memo }: SignAndBroadcastOptions = {fee: defaultFee, memo: ""}) => client.signAndBroadcast(address, msgs, fee,memo),
    msgRegisterContract: (data: MsgRegisterContract): EncodeObject => ({ typeUrl: "/seiprotocol.seichain.dex.MsgRegisterContract", value: MsgRegisterContract.fromPartial( data ) }),
    msgLiquidation: (data: MsgLiquidation): EncodeObject => ({ typeUrl: "/seiprotocol.seichain.dex.MsgLiquidation", value: MsgLiquidation.fromPartial( data ) }),
    msgPlaceOrders: (data: MsgPlaceOrders): EncodeObject => ({ typeUrl: "/seiprotocol.seichain.dex.MsgPlaceOrders", value: MsgPlaceOrders.fromPartial( data ) }),
    msgCancelOrders: (data: MsgCancelOrders): EncodeObject => ({ typeUrl: "/seiprotocol.seichain.dex.MsgCancelOrders", value: MsgCancelOrders.fromPartial( data ) }),
    
  };
};

interface QueryClientOptions {
  addr: string
}

const queryClient = async ({ addr: addr }: QueryClientOptions = { addr: "http://localhost:1317" }) => {
  return new Api({ baseUrl: addr });
};

export {
  txClient,
  queryClient,
};
