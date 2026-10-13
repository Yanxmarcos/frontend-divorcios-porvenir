# Control de avance para la implementación

Estado actual: **implementación integral ejecutada el 7 de octubre de 2026**. El frontend funciona con un repositorio mock persistente y las superficies principales leen la misma fuente.

## Tareas

| Tarea | Estado | Evidencia / siguiente paso |
|---|---|---|
| B01 Catálogos | Verificado | Requisitos, estados, tarifas y seis formatos centralizados |
| B02 Dominio | Verificado | Reglas de requisitos, saldo, solapamiento y proyección pública con pruebas |
| B03 Mock | Verificado | IndexedDB conserva casos y Blob; escenarios reiniciables |
| B04 ERP | Verificado | Layout compacto, sesión demo, rutas protegidas y navegación adaptable |
| B05 Registro | Verificado | Cinco pasos, datos declarados, requisitos condicionales y constancia |
| B06 Revisión | Verificado | Bandeja, detalle, observaciones, versiones, notas e historial |
| B07 Pagos | Verificado | Registro, validación, asignación SC/DU y saldos derivados |
| B08 Audiencias | Verificado | Agenda presencial, intervalos, resultado y aviso simulado |
| B09 SC/DU | Verificado | Referencias separadas, resoluciones y habilitación ulterior |
| B10 Consulta | Verificado | Código, DNI, correo, challenge demo y subsanación |
| B11 Reportes | Verificado | Filtro mensual/tipo y CSV compatible con Excel |
| B12 QA | Verificado | Pruebas de dominio, lint/build y revisión visual desktop/móvil |
| B13 Handoff | Verificado | README operativo, PRODUCT/DESIGN y contrato conservado |

## Reglas para actualizar

Usar Pendiente / En curso / Verificado / Bloqueado por dato específico. Una tarea solo pasa a Verificado con evidencia del criterio de aceptación. Registrar bloqueos con Qxx y continuar tareas independientes. No marcar todo completo si una pantalla solo contiene un aviso simulado sin modificar datos.

## Registro de fases

Al cerrar una fase, añadir fecha, tareas, archivos principales, comandos/pruebas y resultado, cambios respecto al plan, asuntos pendientes y siguiente tarea. Los audios sin revisar humanamente y las preguntas municipales no se convierten en confirmaciones por el paso del tiempo.

## Preparación verificada

Base auditada `99469d9`; build/lint pasan. Seis audios procesados localmente y seis formularios revisados. Impeccable instalado; motor/hooks no verificados por falla de lanzador. Modificaciones de esta entrega: documentación y exclusión de herramientas temporales en `.gitignore`; sin cambios de aplicación.

## Registro de implementación — 2026-10-07

Se sustituyeron los fixtures aislados por un estado único en IndexedDB. Se construyeron el portal ciudadano, el pre-registro, la consulta autorizada y el panel ERP con expedientes, pagos, audiencias, documentos, reportes y configuración demo. Los seis PDF oficiales se sirven desde `public/formats/`.

Validación: `npm test` (4/4), `npm run lint` sin hallazgos y `npm run build` exitoso. Revisión visual realizada en escritorio y 390 px. El lanzador de Impeccable continuó fallando en Windows con `cache_directory_failed`; se aplicaron directamente las reglas de modo Operate y craft floor.

Persisten decisiones institucionales Q01–Q12: tarifa y códigos vigentes, cómputo legal, formatos de actos, autenticación real e integraciones. En la demo quedan etiquetadas o aisladas detrás del repositorio local.
