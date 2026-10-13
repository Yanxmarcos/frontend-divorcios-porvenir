# Arquitectura frontend y contrato propuesto para .NET

Este contrato es una propuesta del frontend. No describe endpoints ya implementados ni acuerdos confirmados con backend. El primer entregable debe funcionar sin conexión a .NET.

## Decisiones

1. Mantener JavaScript y el stack actual. Definir esquemas Zod y tipos JSDoc para DTO y entidades; evitar una migración de lenguaje que consuma la semana.
2. Crear una interfaz asíncrona de repositorios consumida por hooks. Implementar `mockAdapter` e interfaz `httpAdapter`; seleccionar mediante `VITE_DATA_MODE=mock|http`. Nunca hacer fallback silencioso a mock ante una falla de producción.
3. Un único store normalizado para pre-registro, bandeja, detalle, agenda, pagos y consulta. Ninguna pantalla importa fixtures directamente una vez migrada.
4. Persistencia demo en IndexedDB, incluidos Blob de documentos; metadata versionada y migración/reset de seed. `sessionStorage` solo para sesión ficticia efímera. No almacenar contraseñas o tokens reales en almacenamiento local.
5. Cada comando valida precondiciones, aplica cambios y registra evento en una misma transacción. Publicar actualización a las vistas; invalidar consultas después de mutar. Recarga debe reproducir el mismo estado.
6. Fechas de calendario como `YYYY-MM-DD`; instantes como ISO con zona; presentación `es-PE` y `America/Lima`. Dinero en céntimos enteros, moneda `PEN`; sin operaciones monetarias con flotantes.
7. Catálogos y reglas versionados. Tarifas, códigos oficiales, horarios y disparadores de plazos no se dispersan en JSX. Datos por confirmar permanecen marcados como tales.

## Distribución de archivos objetivo

```text
src/
  app/Providers.jsx
  routes/AppRouter.jsx
  layouts/PublicLayout.jsx, AdminLayout.jsx
  context/AuthContext.jsx, DemoContext.jsx
  domain/
    schemas/{case,person,document,payment,hearing}.js
    catalogs/{statuses,documentTypes,procedureTypes}.js
    rules/{requirements,eligibility,transitions,deadlines}.js
    selectors/{dashboard,publicCase,paymentBalance}.js
  services/
    index.js, contracts.js
    mock/{adapter,db,seed,scenarios,clock}.js
    http/{client,adapter,problemDetails}.js
  hooks/{useCases,useCase,useDocuments,useHearings,usePayments}.js
  features/
    registration/{steps,schemas,RegistrationForm}.jsx
    case-detail/{SummaryTab,DocumentsTab,PaymentsTab,HearingsTab,ResolutionsTab,HistoryTab}.jsx
    requirements/RequirementsList.jsx
  components/ui/{Button,Input,Select,Textarea,DataTable,Tabs,Dialog,Toast,EmptyState,...}.jsx
  pages/public/ [rutas actuales y subsanación/ulterior si se separan]
  pages/admin/ [pantallas actuales más pagos y reportes de resoluciones]
  styles/{tokens,admin}.css
  mock/ [retirar o convertir en seeds; no dejar fuentes activas paralelas]
```

Mantener nomenclatura inglesa coherente para código y español para etiquetas. No crear archivos vacíos “por arquitectura”: agregar cada módulo cuando la tarea lo necesite.

## Entidades y invariantes

| Entidad | Campos mínimos | Invariante |
|---|---|---|
| Case | id, trackingCode, officialReferences[], stage, status, applicantRole, registrantId, spouseIds[2], marriage, family, property, createdAt, submittedAt, receivedAt, assignedTo, revision | IDs estables; códigos separados del ID; dos cónyuges distintos; no duplicar por subsanación |
| Person | id, documentType, documentNumber, givenNames, familyNames, currentAddress, contacts | DNI cadena con ceros iniciales; direcciones por persona, no reutilizar dirección del DNI |
| Address | line, districtCode/name, provinceCode/name, departmentCode/name, countryCode | Mantener domicilio conyugal aparte de domicilios actuales |
| Representation | id, caseId, representedPersonId, representativePersonId, powerDocumentId, registryReference, scope, reviewedAt, reviewStatus | Puede haber representación por cónyuge; archivo de poder no equivale a facultades validadas |
| ProcedureStage | id, caseId, type SC/DU, openedAt, officialReferenceId, status | DU relacionada con SC; no inventar un código TUPA con SC/DU |
| OfficialReference | id, stageId, externalSystem, number, year, procedureCode, receivedAt, source, recordedBy | Numeración externa ingresada o integrada, nunca generada como oficial por frontend |
| Requirement | code, title, condition, stage, sourceRef, ruleVersion | Mismo motor para ciudadanía y revisión; condición distinta de estado documental |
| Document | id, caseId, requirementCode, kind, ownerPersonId?, visibility, currentVersionId | Tipo y propietario explícitos; no todos los documentos son públicos |
| DocumentVersion | id, documentId, fileId, name, mime, bytes, issuedOn?, uploadedAt, uploadedBy, reviewStatus, reviewedBy?, reviewReason? | Nueva carga crea versión; no sobrescribir revisión histórica |
| Observation | id, caseId, documentVersionId?, fieldPath?, reason, visibility, status, createdAt, resolvedAt? | Visible al ciudadano solo con publicación explícita; resolución ligada a nueva revisión |
| Payment | id, caseId, receiptNumber, paidOn, totalMinor, currency, receiptDocumentId, status, reviewedBy | Carga != validación; comprobante repetido debe detectarse |
| PaymentAllocation | paymentId, stageId, feeCode, amountMinor | Suma asignada <= total; no aplicar el mismo importe dos veces |
| Hearing | id, caseId, stageId, startsAt, durationMinutes, modality=PRESENCIAL, location, callNumber, status, participants[], result, actDocumentId | Sin audiencia huérfana; sin solapamientos; número de convocatoria preservado; sede presencial obligatoria |
| Resolution | id, caseId, stageId, type, number, issuedOn, notifiedOn?, fileId, status | Fecha de emisión y notificación distintas; borrador != acto emitido |
| Notification | id, caseId, recipientRef, channel, template, relatedEventId, status, createdAt, sentAt?, acknowledgedAt? | Simulada explícitamente; aviso en pantalla no demuestra entrega |
| CaseEvent | id, caseId, command, fromState?, toState?, actorId, occurredAt, reason?, visibility, entityRefs | Append-only en demo; nunca borrar antecedentes al reprogramar |
| OperationalConfig | version, effectiveFrom, fees, procedureCodes, contacts, deadlines, businessCalendar | Mostrar fuente y validación pendiente cuando corresponda |

## Ejemplo de respuesta interna (ficticia)

```json
{
  "id": "case-demo-001",
  "trackingCode": "TRA-DEMO-2026-0001",
  "revision": 3,
  "stage": "SC",
  "status": "OBSERVED",
  "officialReferences": [],
  "spouseIds": ["person-demo-001", "person-demo-002"],
  "submittedAt": "2026-10-06T15:00:00-05:00",
  "receivedAt": null,
  "pendingActions": ["RESUBMIT_DOCUMENTS"],
  "isDemo": true
}
```

La proyección ciudadana es otro DTO explícito, no `...caseData` con algunos campos borrados. Solo incluye referencias, etapa/estado público, mensaje, próximos pasos y documentos autorizados. En producción .NET debe filtrar y autorizar; esconder campos en React no protege los datos.

## Servicios mock que deben quedar operativos

```text
auth.login / logout / getSession
catalogs.getRequirements / getForms / getOperationalConfig
registrations.saveDraft / submit
tracking.requestAccess / verifyAccess / getPublicCase / resubmit
cases.list / get / createAssisted / registerOfficialReference
documents.uploadVersion / getFile / review / publishObservation
payments.register / review / allocate
hearings.list / schedule / reschedule / recordAttendance / recordResult
resolutions.saveDraft / attachIssued / recordNotification
cases.executeCommand / addInternalNote
dashboard.getSummary
reports.listResolutions / exportResolutions
demo.reset / setClock / setScenario
```

La UI llama comandos semánticos. `executeCommand` no acepta un estado arbitrario; valida una enumeración de actuaciones y sus datos. Igual política en mock y contrato HTTP.

## Contrato HTTP a negociar

Prefijo orientativo `/api/v1`. JSON camelCase, IDs opacos, estados con códigos estables, textos localizados en frontend o catálogo. Backend .NET decide implementación interna y autenticación efectiva. Esta tabla es el inventario de capacidades que necesita la demo, no una imposición sobre rutas finales.

| Operación | Ruta propuesta | Entrada / salida clave |
|---|---|---|
| Catálogos | GET `/catalogs/requirements`, `/catalogs/forms`, `/catalogs/operational-config` | Reglas/versiones, formas, códigos y vigencia |
| Registrar solicitud | POST `/registrations` | Datos declarados, referencias de archivos, aceptación; devuelve id y trackingCode |
| Acceso a consulta | POST `/tracking/access-requests` | Referencia opcional + documento y contacto; respuesta genérica sin confirmar existencia |
| Verificar acceso | POST `/tracking/access-verifications` | Challenge y código; sesión/recurso limitado según diseño backend |
| Consulta pública | GET `/tracking/cases/{id}` | DTO público autorizado |
| Subsanar | POST `/tracking/cases/{id}/corrections` | Campos/documentVersionIds permitidos, revision |
| Login/sesión | POST `/auth/login`, POST `/auth/logout`, GET `/auth/me` | Contrato de sesión por acordar; no fijar JWT en localStorage |
| Bandeja | GET `/cases` | q, stage, status, dateFrom/dateTo, page, pageSize, sort; items,total,page,pageSize |
| Detalle | GET `/cases/{id}` | Modelo interno autorizado y revision |
| Alta asistida | POST `/cases` | Origen presencial y datos de solicitud |
| Referencia municipal | POST `/cases/{id}/official-references` | Sistema, código, número, etapa, fecha |
| Archivos | POST `/cases/{id}/documents`, GET `/documents/{id}/content` | Multipart; metadata + archivo; download autorizado |
| Nueva versión | POST `/documents/{id}/versions` | Multipart; conserva anterior |
| Revisión | POST `/document-versions/{id}/reviews` | Conforme/observado, motivo, visibilidad |
| Actuación | POST `/cases/{id}/actions` | command, expectedRevision, datos específicos, motivo |
| Notas | POST `/cases/{id}/notes` | Contenido interno; autor por sesión |
| Pagos | POST `/cases/{id}/payments`, POST `/payments/{id}/reviews` | Comprobante, importe, asignaciones y revisión |
| Audiencias | GET/POST `/hearings`, POST `/hearings/{id}/reschedules`, POST `/hearings/{id}/results` | Intervalo, expediente, convocatoria, asistencia, resultado y acta |
| Resoluciones | POST `/cases/{id}/resolutions`, POST `/resolutions/{id}/notifications` | Tipo, número, emisión, archivo, notificación |
| Resumen | GET `/dashboard/summary` | Contadores y pendientes derivados |
| Reporte resoluciones | GET `/reports/resolutions` | month, year, type, page; filas y totales ligados a SC/DU |

### Errores, concurrencia y reintentos

Usar formato compatible con Problem Details: `type`, `title`, `status`, `detail`, `instance`, más `code`, `errors` por campo y `traceId`. 400/422 para entrada inválida, 401 sin sesión, 403 sin permiso, 404 recurso no disponible, 409 conflicto de versión/horario/duplicado, 413 archivo grande, 415 tipo no admitido, 429 límite, 500/503 error recuperable. El adaptador traduce a un modelo de error común que consume el formulario.

Enviar `expectedRevision` o `If-Match` en actuaciones; si otra persona modificó el caso, ofrecer recargar y revisar antes de repetir. `Idempotency-Key` para registrar solicitud/pago/actuación; el mock debe devolver el mismo resultado cuando se repite la misma operación. No reintentar automáticamente una mutación no idempotente.

Cancelación de búsquedas con AbortController y descarte de respuestas tardías. Latencia mock configurable 300–800 ms, sin aleatoriedad de fallos por defecto. Escenarios de error deterministas para demostración y pruebas. Debounce de búsqueda 300 ms; paginación validada y filtros conservados.

## Seguridad y límites de la simulación

- Solo personas, DNIs, contactos, comprobantes y documentos ficticios para ejecutar la demo. No incorporar las conversaciones ni esta fotografía en `public/`.
- Mock de sesión, verificación, cobro y notificación siempre identificado. Ningún correo, SMS o WhatsApp real.
- No solicitar claves de RENIEC ni otros sistemas en el cliente. La integración y control de acceso reales pertenecen a .NET.
- Validaciones de archivo en cliente mejoran UX; en servidor deben repetirse junto a autorización, inspección y almacenamiento privado.
- Eliminar `dangerouslySetInnerHTML` si se considera para notas; mostrar texto seguro. No registrar datos de familia en consola/telemetría.
- Frontend no firma ni emite resoluciones válidas ni declara automáticamente elegibilidad jurídica. El personal registra actuaciones.

## Matriz de simulación versus integración

| Capacidad esta semana | Qué verá el evaluador | Trabajo futuro backend |
|---|---|---|
| Datos persistentes locales | Crear, recargar y recuperar el mismo trámite | Base de datos transaccional y control multiusuario |
| Comprobantes | Cargar, observar, validar y aplicar saldo | Consulta/conciliación con caja y reglas oficiales |
| Identidad/contacto | Entrada declarada y challenge demo | Mecanismo aprobado, rate limits y auditoría |
| Mesa de Partes | Referencia ingresada por personal y antecedente | Integración con sistema municipal, sin doble numeración |
| Documentos | Blob local y versiones | Almacenamiento privado y URLs autorizadas |
| Actuaciones | Transiciones validadas y bitácora | Autorización, concurrencia e integridad real |
| Notificaciones | Bandeja de eventos y estados simulados | Canal contratado y evidencia de entrega |
| Plazos | Reloj demo y regla configurada | Cómputo oficial validado y calendario institucional |

## Entrega a backend

Exportar fixtures JSON, esquema de DTO, catálogo de comandos/errores, ejemplos de request/response y guion de aceptación. Reunión de contraste para resolver rutas, nombres, sesión, adjuntos, folios/códigos y paginación. Cambiar a HTTP mediante adaptador, no reescribir pantallas. No se deben construir endpoints guiándose solo por capturas de UI.
