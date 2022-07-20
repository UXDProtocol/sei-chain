# Install and setup sei chain for local testing

Start the installation process

```sh
## If necessary (on a Mac OS>12 ?), modify `sei-chain/go.mod` as follows, then run `go mod tidy`
# reference: https://github.com/cosmos/cosmos-sdk/pull/11307
# go mod edit -replace github.com/zondax/hid=github.com/itsdevbear/hid@v0.9.1-0.20220302052558-a59c1e68c29a
# go mod tidy

make install
seid version

which seid

rm -r ~/.sei/
seid tendermint unsafe-reset-all

export MONIKER="sei1.0.7beta"
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

# creates 10 accounts for vortex loadtest. test accounts files will be created ~/test_accounts/ta*.json
rm -rf ~/test_accounts/ta*.json
python3 loadtest/scripts/populate_genesis_accounts.py 10 loc

seid gentx $ACCOUNT_NAME 70000000000000000000usei --chain-id sei-chain

seid collect-gentxs

# Setup denoms to SEI
cat ~/.sei/config/genesis.json | jq '.app_state["crisis"]["constant_fee"]["denom"]="usei"' > ~/.sei/config/tmp_genesis.json && mv ~/.sei/config/tmp_genesis.json ~/.sei/config/genesis.json
cat ~/.sei/config/genesis.json | jq '.app_state["gov"]["deposit_params"]["min_deposit"][0]["denom"]="usei"' > ~/.sei/config/tmp_genesis.json && mv ~/.sei/config/tmp_genesis.json ~/.sei/config/genesis.json
cat ~/.sei/config/genesis.json | jq '.app_state["mint"]["params"]["mint_denom"]="usei"' > ~/.sei/config/tmp_genesis.json && mv ~/.sei/config/tmp_genesis.json ~/.sei/config/genesis.json
cat ~/.sei/config/genesis.json | jq '.app_state["staking"]["params"]["bond_denom"]="usei"' > ~/.sei/config/tmp_genesis.json && mv ~/.sei/config/tmp_genesis.json ~/.sei/config/genesis.json

# Setup fast gov proposal settings
cat ~/.sei/config/genesis.json | jq '.app_state["gov"]["deposit_params"]["max_deposit_period"]="300s"' > ~/.sei/config/tmp_genesis.json && mv ~/.sei/config/tmp_genesis.json ~/.sei/config/genesis.json
cat ~/.sei/config/genesis.json | jq '.app_state["gov"]["voting_params"]["voting_period"]="30s"' > ~/.sei/config/tmp_genesis.json && mv ~/.sei/config/tmp_genesis.json ~/.sei/config/genesis.json
cat ~/.sei/config/genesis.json | jq '.consensus_params["block"]["time_iota_ms"]="50"' > ~/.sei/config/tmp_genesis.json && mv ~/.sei/config/tmp_genesis.json ~/.sei/config/genesis.json
```

```sh
seid start

seid query bank balances $ACCOUNT_ADDRESS
seid query bank balances $ALICE_ADD
seid query bank balances $BOB_ADD

```

Meanwhile you can also try using our loadtest script to seed orders: [](https://github.com/sei-protocol/sei-chain/blob/master/loadtest/main.go#L205)

```sh

# You can build it via
go build -o ./build/loadtest ./loadtest

# and then run it via
./build/loadtest <vortex contract address> <number of test accounts to use> <number of blocks you want the orders to be spread across> <min price for long side> <max price for long side> <min price for short side> <max price for long side> <min quantity of an order> <max quantity of an order> sei-chain

# transfer money to each account for loadtest if it was not done at genesis
seid tx bank send $ACCOUNT_ADDRESS $(jq -r '.address' < ~/test_accounts/ta0.json) 100000000usei --chain-id sei-chain --fees 2000usei -y

# run the loadtest on vortex if already instantiated
./build/loadtest $VORTEX_CONTRACT 5 1 10 20 21 30 50 99 sei-chain
```
