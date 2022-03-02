#!/bin/bash

set -eo pipefail

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"

SRC_PATH="${SCRIPT_DIR}/third_party/proto"
DST_PATH="${SCRIPT_DIR}/src/proto"

# Fetch 3rd-party proto files
PANACEA_CORE_VER_SHORT="2.0.2"
PANACEA_CORE_VER="v${PANACEA_CORE_VER_SHORT}"

mkdir -p ${SRC_PATH}
curl https://codeload.github.com/medibloc/panacea-core/tar.gz/${PANACEA_CORE_VER} | \
	tar -xz -C ${SRC_PATH} --strip=3 panacea-core-${PANACEA_CORE_VER_SHORT}/third_party/proto
curl https://codeload.github.com/medibloc/panacea-core/tar.gz/${PANACEA_CORE_VER} | \
	tar -xz -C ${SRC_PATH} --strip=2 panacea-core-${PANACEA_CORE_VER_SHORT}/proto

# Compile only Panacea proto files
mkdir -p ${DST_PATH}
protoc \
  --plugin=./node_modules/.bin/protoc-gen-ts_proto \
  --ts_proto_out="${DST_PATH}" \
  --proto_path="${SRC_PATH}" \
  --ts_proto_opt="esModuleInterop=true,forceLong=long,useOptional=true" \
  $(find "${SRC_PATH}/panacea" -name '*.proto')
