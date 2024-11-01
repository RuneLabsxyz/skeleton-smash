import { overridableComponent } from '@dojoengine/recs'
import { defineContractComponents } from './models.gen'

export type ClientComponents = ReturnType<typeof createClientComponents>

export function createClientComponents({
  contractComponents,
}: {
  contractComponents: Awaited<ReturnType<typeof defineContractComponents>>
}) {
  return {
    ...contractComponents,
    Player: overridableComponent(contractComponents.Player),
    Room: overridableComponent(contractComponents.Room),
    Run: overridableComponent(contractComponents.Run),
    RoomList: overridableComponent(contractComponents.RoomList),
  }
}
