const unavailable = async () => {
  const error = new Error('El adaptador HTTP todavía no está conectado al backend municipal.')
  error.code = 'HTTP_ADAPTER_UNAVAILABLE'
  error.status = 503
  throw error
}

export const httpAdapter = {
  registrations: { submit: unavailable },
  tracking: { requestAccess: unavailable, verifyAccess: unavailable, getCase: unavailable, resubmit: unavailable },
  cases: { list: unavailable, get: unavailable, executeCommand: unavailable },
  documents: { uploadVersion: unavailable, review: unavailable, getFile: unavailable },
  payments: { register: unavailable, review: unavailable },
  hearings: { list: unavailable, schedule: unavailable, recordResult: unavailable },
  resolutions: { register: unavailable },
  dashboard: { getSummary: unavailable },
  reports: { listResolutions: unavailable },
}

export const dataMode = import.meta.env.VITE_DATA_MODE || 'mock'
