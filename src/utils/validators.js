export const isValidDni = (value) => /^\d{8}$/.test(String(value || ''))
export const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || ''))
export const isAcceptedFile = (file, maxBytes = 10 * 1024 * 1024) => Boolean(file && ['application/pdf', 'image/jpeg', 'image/png'].includes(file.type) && file.size > 0 && file.size <= maxBytes)
