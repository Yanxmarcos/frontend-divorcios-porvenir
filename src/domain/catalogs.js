export const CASE_STATUS = {
  SUBMITTED: 'SUBMITTED',
  PRECHECK: 'PRECHECK',
  OBSERVED: 'OBSERVED',
  READY_TO_FILE: 'READY_TO_FILE',
  LEGAL_REVIEW: 'LEGAL_REVIEW',
  HEARING_SCHEDULED: 'HEARING_SCHEDULED',
  SC_RESOLVED: 'SC_RESOLVED',
  DU_AVAILABLE: 'DU_AVAILABLE',
  DU_REVIEW: 'DU_REVIEW',
  DIVORCED: 'DIVORCED',
  CLOSED: 'CLOSED',
}

export const STATUS_META = {
  SUBMITTED: { label: 'Pre-registro recibido', tone: 'info' },
  PRECHECK: { label: 'En revisión previa', tone: 'info' },
  OBSERVED: { label: 'Con observaciones', tone: 'warning' },
  READY_TO_FILE: { label: 'Apto para presentar', tone: 'success' },
  LEGAL_REVIEW: { label: 'Revisión legal SC', tone: 'info' },
  HEARING_SCHEDULED: { label: 'Audiencia programada', tone: 'info' },
  SC_RESOLVED: { label: 'Separación resuelta', tone: 'success' },
  DU_AVAILABLE: { label: 'Divorcio ulterior habilitado', tone: 'warning' },
  DU_REVIEW: { label: 'Revisión legal DU', tone: 'info' },
  DIVORCED: { label: 'Divorcio resuelto', tone: 'success' },
  CLOSED: { label: 'Cerrado sin divorcio', tone: 'neutral' },
}

export const FEES = {
  SC: { code: 'DEMO-SC', label: 'Separación convencional', amountMinor: 27334 },
  DU: { code: 'DEMO-DU', label: 'Divorcio ulterior', amountMinor: 17894 },
}

export const FORMS = [
  { code: 'F01', title: 'Solicitud de separación convencional', file: '/formats/F01-separacion.pdf', applies: 'Todos los casos' },
  { code: 'F02', title: 'Declaración del último domicilio conyugal', file: '/formats/F02-domicilio.pdf', applies: 'Matrimonio fuera de El Porvenir' },
  { code: 'F03', title: 'Declaración de no tener hijos menores', file: '/formats/F03-sin-menores.pdf', applies: 'Sin hijos menores' },
  { code: 'F04', title: 'Declaración sobre hijos mayores con incapacidad', file: '/formats/F04-sin-mayores-incapacidad.pdf', applies: 'Según situación familiar' },
  { code: 'F05', title: 'Declaración de no tener bienes sociales', file: '/formats/F05-sin-bienes.pdf', applies: 'Sin bienes sujetos a gananciales' },
  { code: 'F06', title: 'Solicitud de divorcio ulterior', file: '/formats/F06-disolucion.pdf', applies: 'Después de la separación' },
]

export const REQUIRED_DOCUMENTS = [
  { code: 'REQUEST', title: 'Solicitud dirigida al alcalde', always: true },
  { code: 'DNI_1', title: 'DNI legible del cónyuge 1', always: true },
  { code: 'DNI_2', title: 'DNI legible del cónyuge 2', always: true },
  { code: 'MARRIAGE', title: 'Acta de matrimonio expedida dentro de 3 meses', always: true },
  { code: 'DOMICILE_DJ', title: 'Declaración del último domicilio conyugal', when: (c) => c.marriage?.district !== 'El Porvenir' },
  { code: 'NO_MINOR_DJ', title: 'Declaración de no tener hijos menores', when: (c) => !c.family?.hasMinors },
  { code: 'NO_ADULT_SUPPORT_DJ', title: 'Declaración sobre hijos mayores con incapacidad', when: (c) => !c.family?.hasAdultSupport },
  { code: 'BIRTH_CERT', title: 'Acta de nacimiento de hijos aplicables', when: (c) => c.family?.hasMinors || c.family?.hasAdultSupport },
  { code: 'FAMILY_AGREEMENT', title: 'Alimentos, tenencia y régimen de visitas', when: (c) => c.family?.hasMinors },
  { code: 'NO_ASSETS_DJ', title: 'Declaración de no tener bienes sociales', when: (c) => !c.property?.hasCommunityAssets },
  { code: 'ASSET_DEED', title: 'Escritura inscrita de separación patrimonial', when: (c) => c.property?.hasCommunityAssets },
  { code: 'SPECIAL_POWER', title: 'Poder especial por escritura pública inscrito', when: (c) => c.applicantRole === 'REPRESENTATIVE' },
]

export const getRequirements = (caseData) => REQUIRED_DOCUMENTS.filter((r) => r.always || r.when?.(caseData))

export const formatMoney = (minor = 0) => new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN' }).format(minor / 100)
export const formatDate = (value) => value ? new Intl.DateTimeFormat('es-PE', { dateStyle: 'medium', timeZone: 'America/Lima' }).format(new Date(`${value}T12:00:00-05:00`)) : '—'
