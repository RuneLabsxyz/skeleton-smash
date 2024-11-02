import manifest from '../../contracts/manifests/dev/deployment/manifest.json'

import { createDojoConfig } from '@dojoengine/core'

export const dojoConfig = createDojoConfig({
  toriiUrl: 'https://api.cartridge.gg/x/skelton-smash/torii',
  rpcUrl: 'https://api.cartridge.gg/x/skelton-smash/katana',
  manifest,
  masterAddress: '0x4a92c703ced69b13e696e68086516cdadbcf7d9b0c22899bf0e280280f0210a',
  masterPrivateKey: '0xb053744d9d6b1d8f5dbfe7502052c2716849fe5ef2609a62d52d25940a4455',
})

export type Config = typeof dojoConfig
