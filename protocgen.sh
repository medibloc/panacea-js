#!/bin/bash

set -euo pipefail

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"

SRC_PATH="${SCRIPT_DIR}/third_party/proto"
DST_PATH="${SCRIPT_DIR}/src/proto"

if [[ ! -f "${SRC_PATH}/PANACEA_CORE_VERSION" ]]; then
  echo "Missing vendored Panacea Core version marker" >&2
  exit 1
fi

rm -rf "${DST_PATH}"

# Generate only the vendored Panacea schemas and their imported dependencies.
PATH="${SCRIPT_DIR}/node_modules/.bin:${PATH}" \
  buf generate "${SRC_PATH}" \
    --template "${SCRIPT_DIR}/buf.gen.yaml" \
    --path "${SRC_PATH}/panacea"

# These descriptors only define protobuf code-generation options. No generated
# Panacea runtime type imports them, and descriptor.ts exceeds TypeScript's
# declaration serialization limit.
rm -rf \
  "${DST_PATH}/amino" \
  "${DST_PATH}/cosmos/msg" \
  "${DST_PATH}/cosmos_proto"
rm -f "${DST_PATH}/google/protobuf/descriptor.ts"
