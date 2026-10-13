const today = '2026-10-07'
const event = (id, command, label, visibility = 'PUBLIC') => ({ id, command, label, visibility, occurredAt: `${today}T09:00:00-05:00`, actor: 'Sistema demo' })

const scenarioCase = (number, title, overrides = {}) => {
  const serial = String(number).padStart(4, '0')
  const firstDni = String(78000000 + number * 2)
  const secondDni = String(78000001 + number * 2)
  return {
    id: 'case-demo-' + serial,
    trackingCode: 'TRA-DEMO-2026-' + serial,
    accessCode: '123456',
    revision: 2,
    stage: 'SC',
    status: 'PRECHECK',
    applicantRole: 'SPOUSE_1',
    createdAt: '2026-10-01',
    submittedAt: '2026-10-01',
    assignedTo: 'Dra. María García',
    spouses: [
      { id: 'p-' + serial + '-1', documentNumber: firstDni, names: 'Persona Demo ' + title + ' A', address: 'Domicilio ficticio ' + number + ', El Porvenir', phone: '900000' + String(number).padStart(3, '0'), email: 'caso' + number + 'a@example.test' },
      { id: 'p-' + serial + '-2', documentNumber: secondDni, names: 'Persona Demo ' + title + ' B', address: 'Domicilio ficticio ' + number + ' B, El Porvenir', phone: '911000' + String(number).padStart(3, '0'), email: 'caso' + number + 'b@example.test' },
    ],
    registrant: { role: 'SPOUSE_1', documentNumber: firstDni, names: 'Persona Demo ' + title + ' A', phone: '900000' + String(number).padStart(3, '0'), email: 'caso' + number + 'a@example.test' },
    marriage: { date: '2017-04-12', district: 'El Porvenir', lastMaritalAddress: 'Domicilio conyugal ficticio, El Porvenir', certificateIssuedOn: '2026-09-18' },
    family: { hasMinors: false, hasAdultSupport: false },
    property: { hasCommunityAssets: false },
    officialReferences: [],
    documents: [],
    observations: [],
    payments: [],
    hearings: [],
    resolutions: [],
    notes: ['Escenario: ' + title],
    events: [event('event-' + serial, 'SUBMIT', 'Pre-registro recibido')],
    ...overrides,
  }
}

const additionalCases = () => [
  scenarioCase(5, 'Sin menores ni bienes', { status: 'READY_TO_FILE' }),
  scenarioCase(6, 'Competencia por domicilio', { marriage: { date: '2016-03-10', district: 'Chiclayo', lastMaritalAddress: 'Calle Demo 60, El Porvenir', certificateIssuedOn: '2026-09-15' } }),
  scenarioCase(7, 'Menor con documentos incompletos', { status: 'OBSERVED', family: { hasMinors: true, hasAdultSupport: false }, observations: [{ id: 'obs-007', reason: 'Falta acreditar tenencia y régimen de visitas.', status: 'OPEN', visibility: 'PUBLIC', createdAt: today }] }),
  scenarioCase(8, 'Hijo adulto sin condición especial'),
  scenarioCase(9, 'Revisión especializada', { family: { hasMinors: false, hasAdultSupport: true }, notes: ['Revisión jurídica especializada requerida.'] }),
  scenarioCase(10, 'Representación en extranjero', { applicantRole: 'REPRESENTATIVE', notes: ['Validar poder especial inscrito y alcance.'] }),
  scenarioCase(11, 'Bienes sociales', { property: { hasCommunityAssets: true }, status: 'OBSERVED', observations: [{ id: 'obs-011', reason: 'La escritura requiere revisión registral.', status: 'OPEN', visibility: 'PUBLIC', createdAt: today }] }),
  scenarioCase(12, 'Acta antigua', { marriage: { date: '2014-07-20', district: 'El Porvenir', lastMaritalAddress: 'Calle Demo 12, El Porvenir', certificateIssuedOn: '2026-05-01' }, status: 'OBSERVED' }),
  scenarioCase(13, 'Pago parcial SC', { status: 'LEGAL_REVIEW', officialReferences: [{ id: 'ref-sc-013', stage: 'SC', number: 'EXP-2026-0213', receivedAt: '2026-10-02' }], payments: [{ id: 'pay-013', receiptNumber: 'REC-DEMO-2013', paidOn: '2026-10-02', totalMinor: 15000, allocatedSC: 15000, allocatedDU: 0, status: 'APPROVED' }] }),
  scenarioCase(14, 'Inasistencia', { status: 'HEARING_SCHEDULED', officialReferences: [{ id: 'ref-sc-014', stage: 'SC', number: 'EXP-2026-0214', receivedAt: '2026-09-25' }], hearings: [{ id: 'hear-014', startsAt: '2026-10-10T11:00:00-05:00', durationMinutes: 60, location: 'Oficina de Asesoría Jurídica', status: 'COMPLETED', callNumber: 1, result: 'ABSENCE' }] }),
  scenarioCase(15, 'Espera ulterior', { stage: 'SC', status: 'SC_RESOLVED', officialReferences: [{ id: 'ref-sc-015', stage: 'SC', number: 'EXP-2026-0215', receivedAt: '2026-09-01' }], resolutions: [{ id: 'res-sc-015', type: 'SC', number: 'RES-DEMO-2026-0215', issuedOn: '2026-09-25', notifiedOn: '2026-09-28', status: 'ISSUED' }] }),
  scenarioCase(16, 'Cierre sin divorcio', { status: 'CLOSED', notes: ['Cierre demo por no ratificación; no existe resolución de divorcio.'] }),
]

export const createSeed = () => ({
  version: 2,
  clock: '2026-10-07T10:00:00-05:00',
  cases: [
    {
      id: 'case-demo-001', trackingCode: 'TRA-DEMO-2026-0001', accessCode: '246810', revision: 3, stage: 'SC', status: 'OBSERVED', resumeStatus: 'PRECHECK', applicantRole: 'SPOUSE_1', createdAt: '2026-10-03', submittedAt: '2026-10-03', assignedTo: 'Dra. María García',
      spouses: [{ id: 'p1', documentNumber: '70112233', names: 'Persona Demo Ana Torres', address: 'Jr. Los Cedros 145, El Porvenir', phone: '999111222', email: 'ana@example.test' }, { id: 'p2', documentNumber: '70889911', names: 'Persona Demo Luis Vega', address: 'Mz. C Lt. 8, El Porvenir', phone: '999333444', email: 'luis@example.test' }],
      registrant: { role: 'SPOUSE_1', documentNumber: '70112233', names: 'Persona Demo Ana Torres', phone: '999111222', email: 'ana@example.test' },
      marriage: { date: '2018-05-12', district: 'Trujillo', lastMaritalAddress: 'Av. Pumacahua 620, El Porvenir', certificateIssuedOn: '2026-09-12' }, family: { hasMinors: true, hasAdultSupport: false }, property: { hasCommunityAssets: false },
      officialReferences: [],
      documents: [
        { id: 'doc-001', requirementCode: 'REQUEST', name: 'Solicitud-firmada.pdf', mime: 'application/pdf', bytes: 280000, uploadedAt: '2026-10-03T11:00:00-05:00', reviewStatus: 'APPROVED', versions: 1 },
        { id: 'doc-002', requirementCode: 'MARRIAGE', name: 'Acta-matrimonio.pdf', mime: 'application/pdf', bytes: 390000, uploadedAt: '2026-10-03T11:04:00-05:00', reviewStatus: 'OBSERVED', reviewReason: 'La copia está cortada y no permite leer la fecha de expedición.', versions: 1 },
      ],
      observations: [{ id: 'obs-001', documentId: 'doc-002', reason: 'La copia está cortada y no permite leer la fecha de expedición.', status: 'OPEN', visibility: 'PUBLIC', createdAt: '2026-10-05' }], payments: [], hearings: [], resolutions: [], notes: ['Confirmar legibilidad al recibir la nueva versión.'], events: [event('e1', 'SUBMIT', 'Pre-registro recibido'), event('e2', 'REQUEST_CORRECTION', 'Se publicó una observación')],
    },
    {
      id: 'case-demo-002', trackingCode: 'TRA-DEMO-2026-0002', accessCode: '135790', revision: 7, stage: 'SC', status: 'HEARING_SCHEDULED', applicantRole: 'SPOUSE_2', createdAt: '2026-09-10', submittedAt: '2026-09-10', receivedAt: '2026-09-18', assignedTo: 'Dra. María García',
      spouses: [{ id: 'p3', documentNumber: '71234567', names: 'Persona Demo Carla Ríos', address: 'Calle Uno 320, El Porvenir', phone: '988111555', email: 'carla@example.test' }, { id: 'p4', documentNumber: '72345678', names: 'Persona Demo Jorge Díaz', address: 'Calle Dos 115, El Porvenir', phone: '988222666', email: 'jorge@example.test' }], registrant: { role: 'SPOUSE_2', documentNumber: '72345678', names: 'Persona Demo Jorge Díaz', phone: '988222666', email: 'jorge@example.test' }, marriage: { date: '2015-02-15', district: 'El Porvenir', lastMaritalAddress: 'Calle Dos 115, El Porvenir', certificateIssuedOn: '2026-09-01' }, family: { hasMinors: false, hasAdultSupport: false }, property: { hasCommunityAssets: false },
      officialReferences: [{ id: 'ref-sc-002', stage: 'SC', number: 'EXP-2026-0147', receivedAt: '2026-09-18' }], documents: [{ id: 'doc-003', requirementCode: 'REQUEST', name: 'Expediente-completo.pdf', mime: 'application/pdf', bytes: 820000, uploadedAt: '2026-09-10T10:00:00-05:00', reviewStatus: 'APPROVED', versions: 1 }], observations: [], payments: [{ id: 'pay-001', receiptNumber: 'REC-DEMO-1021', paidOn: '2026-09-17', totalMinor: 27334, allocatedSC: 27334, allocatedDU: 0, status: 'APPROVED' }], hearings: [{ id: 'hear-001', startsAt: '2026-10-09T09:00:00-05:00', durationMinutes: 60, location: 'Oficina de Asesoría Jurídica', status: 'SCHEDULED', callNumber: 1 }], resolutions: [], notes: [], events: [event('e3', 'REGISTER_SC', 'Expediente de separación registrado'), event('e4', 'SCHEDULE_HEARING', 'Audiencia presencial programada')],
    },
    {
      id: 'case-demo-003', trackingCode: 'TRA-DEMO-2026-0003', accessCode: '112233', revision: 12, stage: 'DU', status: 'DU_AVAILABLE', applicantRole: 'SPOUSE_1', createdAt: '2026-05-02', submittedAt: '2026-05-02', receivedAt: '2026-05-09', assignedTo: 'Dra. María García',
      spouses: [{ id: 'p5', documentNumber: '73456789', names: 'Persona Demo Rosa Silva', address: 'Av. Central 400, El Porvenir', phone: '977111333', email: 'rosa@example.test' }, { id: 'p6', documentNumber: '74567890', names: 'Persona Demo Pedro León', address: 'Av. Central 402, El Porvenir', phone: '977222444', email: 'pedro@example.test' }], registrant: { role: 'SPOUSE_1', documentNumber: '73456789', names: 'Persona Demo Rosa Silva', phone: '977111333', email: 'rosa@example.test' }, marriage: { date: '2010-03-22', district: 'El Porvenir', lastMaritalAddress: 'Av. Central 400, El Porvenir', certificateIssuedOn: '2026-04-20' }, family: { hasMinors: false, hasAdultSupport: false }, property: { hasCommunityAssets: false },
      officialReferences: [{ id: 'ref-sc-003', stage: 'SC', number: 'EXP-2026-0088', receivedAt: '2026-05-09' }], documents: [], observations: [], payments: [{ id: 'pay-002', receiptNumber: 'REC-DEMO-0990', paidOn: '2026-05-08', totalMinor: 45228, allocatedSC: 27334, allocatedDU: 17894, status: 'APPROVED' }], hearings: [{ id: 'hear-002', startsAt: '2026-05-20T10:00:00-05:00', durationMinutes: 60, location: 'Oficina de Asesoría Jurídica', status: 'COMPLETED', callNumber: 1, result: 'RATIFIED' }], resolutions: [{ id: 'res-sc-003', type: 'SC', number: 'RES-DEMO-2026-0088', issuedOn: '2026-06-01', notifiedOn: '2026-06-03', status: 'ISSUED' }], notes: [], events: [event('e5', 'ISSUE_SC', 'Resolución de separación registrada'), event('e6', 'ENABLE_DU', 'Solicitud ulterior habilitada')],
    },
    {
      id: 'case-demo-004', trackingCode: 'TRA-DEMO-2026-0004', accessCode: '445566', revision: 16, stage: 'DU', status: 'DIVORCED', applicantRole: 'SPOUSE_1', createdAt: '2026-01-10', submittedAt: '2026-01-10', receivedAt: '2026-01-17', assignedTo: 'Dra. María García',
      spouses: [{ id: 'p7', documentNumber: '75678901', names: 'Persona Demo Elena Paz', address: 'Jr. Norte 51, El Porvenir', phone: '966111777', email: 'elena@example.test' }, { id: 'p8', documentNumber: '76789012', names: 'Persona Demo Mario Sol', address: 'Jr. Sur 84, El Porvenir', phone: '966222888', email: 'mario@example.test' }], registrant: { role: 'SPOUSE_1', documentNumber: '75678901', names: 'Persona Demo Elena Paz', phone: '966111777', email: 'elena@example.test' }, marriage: { date: '2008-08-12', district: 'El Porvenir', lastMaritalAddress: 'Jr. Norte 51, El Porvenir', certificateIssuedOn: '2025-12-28' }, family: { hasMinors: false, hasAdultSupport: false }, property: { hasCommunityAssets: false }, officialReferences: [{ id: 'ref-sc-004', stage: 'SC', number: 'EXP-2026-0021', receivedAt: '2026-01-17' }, { id: 'ref-du-004', stage: 'DU', number: 'EXP-2026-0198', receivedAt: '2026-09-15' }], documents: [], observations: [], payments: [{ id: 'pay-003', receiptNumber: 'REC-DEMO-0801', paidOn: '2026-01-16', totalMinor: 45228, allocatedSC: 27334, allocatedDU: 17894, status: 'APPROVED' }], hearings: [], resolutions: [{ id: 'res-sc-004', type: 'SC', number: 'RES-DEMO-2026-0021', issuedOn: '2026-02-01', notifiedOn: '2026-02-03', status: 'ISSUED' }, { id: 'res-du-004', type: 'DU', number: 'RES-DEMO-2026-0198', issuedOn: '2026-10-02', notifiedOn: '2026-10-05', status: 'ISSUED' }], notes: [], events: [event('e7', 'REGISTER_DU', 'Expediente ulterior registrado'), event('e8', 'ISSUE_DU', 'Resolución de divorcio registrada')],
    },
    ...additionalCases(),
  ],
})
