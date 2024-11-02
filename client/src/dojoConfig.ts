import manifest from '../../contracts/manifests/dev/deployment/manifest.json'

import { createDojoConfig } from '@dojoengine/core'

export const dojoConfig = createDojoConfig({
  toriiUrl: 'http://localhost:8080',
  rpcUrl: 'http://localhost:5050',
  manifest,
  masterAddress: '0xb3ff441a68610b30fd5e2abbf3a1548eb6ba6f3559f2862bf2dc757e5828ca',
  masterPrivateKey: '0x2bbf4f9fd0bbb2e60b0316c1fe0b76cf7a4d0198bd493ced9b8df2a3a24d68a',
})

export type Config = typeof dojoConfig
