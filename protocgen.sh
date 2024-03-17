#!/bin/bash

set -eo pipefail

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"

SRC_PATH="${SCRIPT_DIR}/third_party/proto"
DST_PATH="${SCRIPT_DIR}/src/proto"

mkdir -p ${SRC_PATH}

buf export buf.build/medibloc/panacea-core -o ${SRC_PATH}
buf export buf.build/cosmos/cosmos-sdk -o ${SRC_PATH}
buf export buf.build/cosmos/gogo-proto -o ${SRC_PATH}

# Compile only Panacea proto files
mkdir -p ${DST_PATH}
protoc \
  --plugin=./node_modules/.bin/protoc-gen-ts_proto \
  --ts_proto_out="${DST_PATH}" \
  --proto_path="${SRC_PATH}" \
  --ts_proto_opt="esModuleInterop=true,forceLong=long,useOptional=true" \
  $(find "${SRC_PATH}/panacea" -name '*.proto')
