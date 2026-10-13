import test from 'node:test'
import assert from 'node:assert/strict'
import { getRequirements } from '../src/domain/catalogs.js'
import { getPaymentBalances, hasHearingConflict, publicProjection } from '../src/domain/rules.js'
import { createSeed } from '../src/services/mock/seed.js'

test('requirements cover conditional branches', () => {
  const data = { applicantRole: 'REPRESENTATIVE', marriage: { district: 'Trujillo' }, family: { hasMinors: true, hasAdultSupport: true }, property: { hasCommunityAssets: true } }
  const codes = getRequirements(data).map((item) => item.code)
  for (const code of ['DOMICILE_DJ', 'BIRTH_CERT', 'FAMILY_AGREEMENT', 'ASSET_DEED', 'SPECIAL_POWER']) assert.ok(codes.includes(code))
  assert.ok(!codes.includes('NO_MINOR_DJ'))
  assert.ok(!codes.includes('NO_ASSETS_DJ'))
})

test('only approved allocations reduce balances', () => {
  const item = { payments: [{ status: 'APPROVED', allocatedSC: 27334, allocatedDU: 20000 }, { status: 'OBSERVED', allocatedSC: 10000, allocatedDU: 0 }] }
  assert.deepEqual(getPaymentBalances(item), { SC: 0, DU: 0 })
})

test('hearing conflicts use intervals', () => {
  const hearings = [{ status: 'SCHEDULED', startsAt: '2026-10-09T09:00:00-05:00', durationMinutes: 60 }]
  assert.equal(hasHearingConflict(hearings, '2026-10-09T09:30:00-05:00', 60), true)
  assert.equal(hasHearingConflict(hearings, '2026-10-09T10:00:00-05:00', 30), false)
})

test('public projection excludes internal data', () => {
  const projected = publicProjection({ id: '1', trackingCode: 'TRA-1', stage: 'SC', status: 'OBSERVED', spouses: [{ names: 'Persona A', documentNumber: '123' }], observations: [{ id: 'o1', documentId: 'd1', visibility: 'PUBLIC' }, { id: 'o2', visibility: 'INTERNAL' }], events: [{ id: 'e1', visibility: 'PUBLIC' }, { id: 'e2', visibility: 'INTERNAL' }], documents: [{ id: 'd1', name: 'a.pdf', reviewStatus: 'OBSERVED', reviewReason: 'ilegible', versions: 1 }], payments: [{ totalMinor: 100 }], notes: ['privada'] })
  assert.equal(projected.events.length, 1)
  assert.equal(projected.observations.length, 1)
  assert.equal('payments' in projected, false)
  assert.equal('notes' in projected, false)
  assert.equal('documentNumber' in projected.spouses[0], false)
})

test('demo seed provides sixteen isolated scenarios', () => {
  const seed = createSeed()
  assert.equal(seed.cases.length, 16)
  assert.equal(new Set(seed.cases.map((item) => item.id)).size, 16)
  const documents = seed.cases.flatMap((item) => item.spouses.map((person) => person.documentNumber))
  assert.equal(new Set(documents).size, documents.length)
})
