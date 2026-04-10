import { useTest } from './composables/useTest'

let testStore = null

export function createTestStore() {
  if (!testStore) {
    testStore = useTest()
  }
  return testStore
}
