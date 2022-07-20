## Install and setup sei chain for local testing

```
# cd sei-chain

make install
seid version

which seid

rm -r ~/.sei/
seid tendermint unsafe-reset-all

export MONIKER="sei1.0.6beta"
export ACCOUNT_NAME="<root account name>"
export ALICE="alice"
export BOB="bob"

seid init $MONIKER --chain-id sei-chain

seid keys add $ACCOUNT_NAME
export ACCOUNT_ADDRESS="<add address here>"
export ACCOUNT_SEED="<add seed here>"

seid keys add $ALICE
export ALICE_ADD="<add address here>"
export ALICE_SEED="<add seed here>"

seid keys add $BOB
export BOB_ADD="<add address here>"
export BOB_SEED="<add seed here>"

seid add-genesis-account $ACCOUNT_ADDRESS 100000000000000000000usei
seid add-genesis-account $ALICE_ADD 1000000000000000000usei
seid add-genesis-account $BOB_ADD 1000000000000000000usei

seid gentx $ACCOUNT_NAME 70000000000000000000usei --chain-id sei-chain

seid collect-gentxs

cat ~/.sei/config/genesis.json | jq '.app_state["crisis"]["constant_fee"]["denom"]="usei"' > ~/.sei/config/tmp_genesis.json && mv ~/.sei/config/tmp_genesis.json ~/.sei/config/genesis.json
cat ~/.sei/config/genesis.json | jq '.app_state["gov"]["deposit_params"]["min_deposit"][0]["denom"]="usei"' > ~/.sei/config/tmp_genesis.json && mv ~/.sei/config/tmp_genesis.json ~/.sei/config/genesis.json
cat ~/.sei/config/genesis.json | jq '.app_state["mint"]["params"]["mint_denom"]="usei"' > ~/.sei/config/tmp_genesis.json && mv ~/.sei/config/tmp_genesis.json ~/.sei/config/genesis.json
cat ~/.sei/config/genesis.json | jq '.app_state["staking"]["params"]["bond_denom"]="usei"' > ~/.sei/config/tmp_genesis.json && mv ~/.sei/config/tmp_genesis.json ~/.sei/config/genesis.json

seid start

seid query bank balances $ACCOUNT_ADDRESS
seid query bank balances $ALICE_ADD
seid query bank balances $BOB_ADD

```

Meanwhile you can also try using our loadtest script to seed orders: [](https://github.com/sei-protocol/sei-chain/blob/master/loadtest/main.go#L205) You can build it via
`go build -o ./build/loadtest /loadtest` , and then run it via

```sh
./build/loadtest <vortex contract address> <number of test accounts to use> <number of blocks you want the orders to be spread across> <min price for long side> <max price for long side> <min price for short side> <max price for long side> <min quantity of an order> <max quantity of an order> sei-chain
```

```go
replace (
github.com/gogo/protobuf => github.com/regen-network/protobuf v1.3.3-alpha.regen.1
github.com/keybase/go-keychain => github.com/99designs/go-keychain v0.0.0-20191008050251-8e49817e8af4
github.com/zondax/hid => github.com/itsdevbear/hid v0.9.1-0.20220302052558-a59c1e68c29a
google.golang.org/grpc => google.golang.org/grpc v1.33.2
)
// https://github.com/cosmos/cosmos-sdk/pull/11307
```
