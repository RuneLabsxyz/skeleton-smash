#!/bin/bash
set -euo pipefail
pushd $(dirname "$0")/..

export RPC_URL="http://localhost:5050";

export WORLD_ADDRESS=$(cat ./manifests/dev/manifest.json | jq -r '.world.address')

# sozo execute --world <WORLD_ADDRESS> <CONTRACT> <ENTRYPOINT>
sozo execute --world $WORLD_ADDRESS skeleton_smash::systems::actions::actions move -c 1 --wait
