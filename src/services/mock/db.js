const DB_NAME = 'divorcio-municipal-demo'
const STORE = 'app'
const VERSION = 1

const openDb = () => new Promise((resolve, reject) => {
  const request = indexedDB.open(DB_NAME, VERSION)
  request.onupgradeneeded = () => {
    if (!request.result.objectStoreNames.contains(STORE)) request.result.createObjectStore(STORE)
  }
  request.onsuccess = () => resolve(request.result)
  request.onerror = () => reject(request.error)
})

export async function readState() {
  const db = await openDb()
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, 'readonly')
    const request = tx.objectStore(STORE).get('state')
    request.onsuccess = () => resolve(request.result || null)
    request.onerror = () => reject(request.error)
  })
}

export async function writeState(state) {
  const db = await openDb()
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, 'readwrite')
    tx.objectStore(STORE).put(state, 'state')
    tx.oncomplete = resolve
    tx.onerror = () => reject(tx.error)
  })
}

export async function clearState() {
  const db = await openDb()
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, 'readwrite')
    tx.objectStore(STORE).delete('state')
    tx.oncomplete = resolve
    tx.onerror = () => reject(tx.error)
  })
}
