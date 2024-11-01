import manifest from '../../contracts/manifests/dev/deployment/manifest.json'

import { createDojoConfig } from '@dojoengine/core'

export const dojoConfig = createDojoConfig({
  toriiUrl: 'http://127.0.0.1:8080',
  rpcUrl: 'http://127.0.0.1:5050',
  manifest,
  masterAddress: '0x541da8f7f3ab8247329d22b3987d1ffb181bc8dc7f9611a6eccec3b0749a585',
  masterPrivateKey: '0x736adbbcdac7cc600f89051db1abbc16b9996b46f6b58a9752a11c1028a8ec8',
})

export type Config = typeof dojoConfig
