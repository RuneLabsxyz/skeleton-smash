import manifest from '../../contracts/manifests/dev/deployment/manifest.json'

import { createDojoConfig } from '@dojoengine/core'

export const dojoConfig = createDojoConfig({
  toriiUrl: 'https://api.cartridge.gg/x/skeleton-smash/torii',
  rpcUrl: 'https://api.cartridge.gg/x/skeleton-smash/katana',
  manifest,
  masterAddress: '0x7643cbab4d78a1357657350d4dc84e45207e33f174eb3b36603a02d442deffa',
  masterPrivateKey: '0x7bf528a357279d6adf9c70287f878e9451d2c8b7c1c28c4aa0c3c6cbf25efde',
})

export type Config = typeof dojoConfig
