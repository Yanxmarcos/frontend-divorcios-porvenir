import { FEES } from './catalogs.js'

export function getPaymentBalances(item) {
  const approved = item.payments.filter((payment) => payment.status === 'APPROVED')
  const paidSC = approved.reduce((sum, payment) => sum + (payment.allocatedSC || 0), 0)
  const paidDU = approved.reduce((sum, payment) => sum + (payment.allocatedDU || 0), 0)
  return { SC: Math.max(0, FEES.SC.amountMinor - paidSC), DU: Math.max(0, FEES.DU.amountMinor - paidDU) }
}

export function hasHearingConflict(hearings, startsAt, durationMinutes) {
  const proposedStart = new Date(startsAt).getTime()
  const proposedEnd = proposedStart + durationMinutes * 60000
  return hearings.some((hearing) => {
    if (hearing.status !== 'SCHEDULED') return false
    const existingStart = new Date(hearing.startsAt).getTime()
    const existingEnd = existingStart + hearing.durationMinutes * 60000
    return proposedStart < existingEnd && proposedEnd > existingStart
  })
}

export function publicProjection(item) {
  return {
    id: item.id,
    trackingCode: item.trackingCode,
    stage: item.stage,
    status: item.status,
    spouses: item.spouses.map(({ names }) => ({ names })),
    observations: item.observations.filter((observation) => observation.visibility === 'PUBLIC'),
    events: item.events.filter((event) => event.visibility === 'PUBLIC'),
    documents: item.documents.filter((document) => item.observations.some((observation) => observation.documentId === document.id && observation.visibility === 'PUBLIC')).map(({ id, name, reviewStatus, reviewReason, versions }) => ({ id, name, reviewStatus, reviewReason, versions })),
  }
}
