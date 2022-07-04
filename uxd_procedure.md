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