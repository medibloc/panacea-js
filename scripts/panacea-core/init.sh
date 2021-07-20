#!/bin/bash

set -eou pipefail

rm -rf ~/.panacea

# Initialize a chain
panacead init node1 --chain-id=${CHAIN_ID}
echo -e "${MNEMONIC}\n\n" | panacead keys add validator -i
panacead add-genesis-account $(panacead keys show validator -a) 100000000000000umed
panacead gentx validator 1000000000000umed --commission-rate 0.1 --commission-max-rate 0.2 --commission-max-change-rate 0.01  --min-self-delegation 1000000 --chain-id ${CHAIN_ID}
panacead collect-gentxs

# Open a 26657 RPC port publicly
sed -i 's|^laddr = "tcp://127.0.0.1:26657"$|laddr = "tcp://0.0.0.0:26657"|g' ~/.panacea/config/config.toml
sed -i 's|^cors_allowed_origins = .*|cors_allowed_origins = \["*"\]|g' ~/.panacea/config/config.toml

panacead start
