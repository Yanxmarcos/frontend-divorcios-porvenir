import { identidadDemo } from './identidad.js'

// Escenario ficticio: pre-registro recibido, pendiente de revisión municipal.
export const consultaTramiteDemo = {
  dni: identidadDemo.dni,
  titular: identidadDemo.nombres,
  estado: 'Pre-registrado',
  etapa: 1,
  fecha: '02/10/2026',
  mensaje: 'Su pre-registro fue recibido. La Oficina de Divorcios revisará los documentos presentados. Si se requiere alguna subsanación, se informará por este medio. Aún no tiene una audiencia programada.',
  historial: [
    { date: '02/10/2026', description: 'Pre-registro de solicitud de divorcio recibido', status: 'complete' },
    { date: 'Pendiente', description: 'Revisión de documentos por la Oficina de Divorcios', status: 'current' },
    { date: 'Pendiente', description: 'Programación de audiencia de ratificación', status: 'pending' },
    { date: 'Pendiente', description: 'Resolución de separación convencional', status: 'pending' },
    { date: 'Pendiente', description: 'Solicitud de divorcio ulterior', status: 'pending' },
    { date: 'Pendiente', description: 'Resolución final de disolución del vínculo matrimonial', status: 'pending' },
  ],
  documentos: [
    'Solicitud de separación convencional',
    'Copia del DNI de ambos cónyuges',
    'Acta de matrimonio',
    'Declaración jurada del último domicilio conyugal',
    'Declaración jurada de no tener bienes',
  ],
}
