/* eslint-disable react/only-export-components */
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { CASE_STATUS, getRequirements } from '../domain/catalogs'
import { getPaymentBalances } from '../domain/rules'
import { clearState, readState, writeState } from '../services/mock/db'
import { createSeed } from '../services/mock/seed'

const DemoContext = createContext(null)
const nowIso = () => new Date().toISOString()
const uid = (prefix) => `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`

export function DemoProvider({ children }) {
  const [state, setState] = useState(null)
  const [notice, setNotice] = useState('')

  useEffect(() => { readState().then((saved) => setState(saved?.version === 2 ? saved : createSeed())).catch(() => setState(createSeed())) }, [])
  useEffect(() => { if (state) writeState(state).catch(() => setNotice('No se pudo guardar localmente. Revise el espacio del navegador.')) }, [state])

  const updateCase = useCallback((id, updater) => {
    setState((current) => ({ ...current, cases: current.cases.map((item) => item.id === id ? { ...updater(item), revision: item.revision + 1 } : item) }))
  }, [])

  const addEvent = (item, command, label, visibility = 'INTERNAL') => ({ ...item, events: [...(item.events || []), { id: uid('event'), command, label, visibility, occurredAt: nowIso(), actor: 'Dra. María García' }] })

  const actions = useMemo(() => ({
    submitRegistration(data, files = []) {
      const sequence = (state?.cases.length || 0) + 1
      const id = uid('case')
      const trackingCode = `TRA-DEMO-2026-${String(sequence).padStart(4, '0')}`
      const documents = files.map((file) => ({ id: uid('doc'), requirementCode: file.requirementCode, name: file.file.name, mime: file.file.type, bytes: file.file.size, uploadedAt: nowIso(), reviewStatus: 'PENDING', versions: 1, blob: file.file }))
      const next = { id, trackingCode, accessCode: '123456', revision: 1, stage: 'SC', status: CASE_STATUS.SUBMITTED, applicantRole: data.applicantRole, createdAt: new Date().toISOString().slice(0, 10), submittedAt: new Date().toISOString().slice(0, 10), assignedTo: 'Dra. María García', spouses: data.spouses, registrant: data.registrant, marriage: data.marriage, family: data.family, property: data.property, officialReferences: [], documents, observations: [], payments: [], hearings: [], resolutions: [], notes: [], events: [{ id: uid('event'), command: 'SUBMIT', label: 'Pre-registro recibido', visibility: 'PUBLIC', occurredAt: nowIso(), actor: 'Ciudadanía' }] }
      setState((current) => ({ ...current, cases: [next, ...current.cases] }))
      return { id, trackingCode, accessCode: next.accessCode }
    },
    reviewDocument(caseId, documentId, status, reason = '') { updateCase(caseId, (item) => addEvent({ ...item, status: status === 'OBSERVED' ? CASE_STATUS.OBSERVED : item.status, resumeStatus: status === 'OBSERVED' ? item.status : item.resumeStatus, documents: item.documents.map((d) => d.id === documentId ? { ...d, reviewStatus: status, reviewReason: reason } : d), observations: status === 'OBSERVED' ? [...item.observations, { id: uid('obs'), documentId, reason, status: 'OPEN', visibility: 'PUBLIC', createdAt: new Date().toISOString().slice(0, 10) }] : item.observations }, 'REVIEW_DOCUMENT', status === 'OBSERVED' ? `Documento observado: ${reason}` : 'Documento marcado conforme', status === 'OBSERVED' ? 'PUBLIC' : 'INTERNAL')) },
    resubmitDocument(caseId, documentId, file) { updateCase(caseId, (item) => addEvent({ ...item, status: CASE_STATUS.PRECHECK, documents: item.documents.map((d) => d.id === documentId ? { ...d, name: file.name, mime: file.type, bytes: file.size, blob: file, versions: (d.versions || 1) + 1, uploadedAt: nowIso(), reviewStatus: 'PENDING', reviewReason: '' } : d), observations: item.observations.map((o) => o.documentId === documentId && o.status === 'OPEN' ? { ...o, status: 'RESOLVED', resolvedAt: nowIso() } : o) }, 'RESUBMIT_DOCUMENT', 'Se presentó una nueva versión del documento', 'PUBLIC')) },
    markReady(caseId) { updateCase(caseId, (item) => addEvent({ ...item, status: CASE_STATUS.READY_TO_FILE }, 'MARK_READY', 'Expediente apto para presentación', 'PUBLIC')) },
    registerReference(caseId, stage, number, receivedAt) { const item = state.cases.find((candidate) => candidate.id === caseId); const valid = (stage === 'SC' && item.status === CASE_STATUS.READY_TO_FILE) || (stage === 'DU' && item.status === CASE_STATUS.DU_AVAILABLE); const duplicate = state.cases.some((candidate) => candidate.officialReferences.some((reference) => reference.number === number)); if (!valid || duplicate) { setNotice(duplicate ? 'Ese número municipal ya está registrado.' : 'La etapa todavía no admite un número municipal.'); return } updateCase(caseId, (current) => addEvent({ ...current, stage, status: stage === 'SC' ? CASE_STATUS.LEGAL_REVIEW : CASE_STATUS.DU_REVIEW, receivedAt, officialReferences: [...current.officialReferences, { id: uid('ref'), stage, number, receivedAt }] }, `REGISTER_${stage}`, `Número de expediente ${stage} registrado`, 'PUBLIC')) },
    registerPayment(caseId, payment) { const duplicate = state.cases.some((candidate) => candidate.payments.some((existing) => existing.receiptNumber === payment.receiptNumber)); if (duplicate || Number(payment.totalMinor) <= 0) { setNotice(duplicate ? 'Ese recibo ya fue registrado.' : 'El importe debe ser mayor a cero.'); return } updateCase(caseId, (item) => addEvent({ ...item, payments: [...item.payments, { id: uid('pay'), ...payment, totalMinor: Number(payment.totalMinor), allocatedSC: Number(payment.allocatedSC || 0), allocatedDU: Number(payment.allocatedDU || 0), status: 'PENDING' }] }, 'REGISTER_PAYMENT', 'Comprobante de pago cargado')) },
    reviewPayment(caseId, paymentId, status) { updateCase(caseId, (item) => addEvent({ ...item, payments: item.payments.map((p) => p.id === paymentId ? { ...p, status } : p) }, 'REVIEW_PAYMENT', status === 'APPROVED' ? 'Pago validado' : 'Pago observado')) },
    scheduleHearing(caseId, hearing) { const candidate = state.cases.find((item) => item.id === caseId); if (!candidate?.officialReferences.some((reference) => reference.stage === 'SC')) { setNotice('La audiencia requiere un expediente SC registrado.'); return } updateCase(caseId, (item) => addEvent({ ...item, status: CASE_STATUS.HEARING_SCHEDULED, hearings: [...item.hearings, { id: uid('hear'), ...hearing, durationMinutes: Number(hearing.durationMinutes || 60), status: 'SCHEDULED', callNumber: item.hearings.length + 1 }] }, 'SCHEDULE_HEARING', 'Audiencia presencial programada', 'PUBLIC')) },
    recordHearing(caseId, hearingId, result, attendance) { updateCase(caseId, (item) => addEvent({ ...item, hearings: item.hearings.map((h) => h.id === hearingId ? { ...h, status: 'COMPLETED', result, attendance } : h) }, 'RECORD_HEARING', `Resultado de audiencia: ${result}`)) },
    issueResolution(caseId, type, data) { const candidate = state.cases.find((item) => item.id === caseId); const validSC = type === 'SC' && candidate.status === CASE_STATUS.HEARING_SCHEDULED && candidate.hearings.some((hearing) => hearing.result === 'RATIFIED'); const validDU = type === 'DU' && candidate.status === CASE_STATUS.DU_REVIEW; if (!validSC && !validDU) { setNotice('El expediente todavía no cumple las precondiciones para registrar esa resolución.'); return } updateCase(caseId, (item) => addEvent({ ...item, stage: type, status: type === 'SC' ? CASE_STATUS.SC_RESOLVED : CASE_STATUS.DIVORCED, resolutions: [...item.resolutions, { id: uid('res'), type, number: data.number, issuedOn: data.issuedOn, notifiedOn: data.notifiedOn || '', status: 'ISSUED' }] }, `ISSUE_${type}`, `Resolución ${type} registrada`, 'PUBLIC')) },
    enableDU(caseId) { const candidate = state.cases.find((item) => item.id === caseId); if (candidate.status !== CASE_STATUS.SC_RESOLVED) { setNotice('La etapa ulterior requiere una resolución de separación.'); return } updateCase(caseId, (item) => addEvent({ ...item, stage: 'DU', status: CASE_STATUS.DU_AVAILABLE }, 'ENABLE_DU', 'Solicitud de divorcio ulterior habilitada', 'PUBLIC')) },
    addNote(caseId, note) { updateCase(caseId, (item) => addEvent({ ...item, notes: [...item.notes, note] }, 'ADD_NOTE', 'Nota interna agregada')) },
    requirements(item) { return getRequirements(item) },
    balances(item) { return getPaymentBalances(item) },
    async reset() { await clearState(); setState(createSeed()); setNotice('Datos de demostración restablecidos.') },
    setClock(value) { setState((current) => ({ ...current, clock: value })) },
  }), [state, updateCase])

  const value = useMemo(() => ({ state, cases: state?.cases || [], ready: Boolean(state), notice, setNotice, ...actions }), [state, notice, actions])
  return <DemoContext.Provider value={value}>{children}</DemoContext.Provider>
}

export const useDemo = () => {
  const value = useContext(DemoContext)
  if (!value) throw new Error('useDemo requiere DemoProvider')
  return value
}
