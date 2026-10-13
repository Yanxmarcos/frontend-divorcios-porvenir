# Ejecución por Codex, backlog y aceptación

## Alcance y modo de ejecución

Objetivo de esta semana: frontend navegable y persistente con datos ficticios, que permita demostrar el procedimiento de punta a punta y entregar un contrato útil al equipo .NET. No incluye integración real con caja, RENIEC, Mesa de Partes, WhatsApp, firma digital ni registro de resoluciones válidas.

**Aclaración del usuario:** solo él trabajará en frontend y quiere que Codex ejecute el plan, sin cronograma. Por tanto, el orden se expresa mediante fases y dependencias, sin fechas, reparto entre integrantes ni compromiso de horas. El alcance integral se conserva; una fase terminada no equivale a concluir el proyecto.

## Backlog ejecutable

Cada tarea debe cerrar con implementación, comprobación y nota de handoff; no basta una pantalla con botones sin efecto.

| Tarea | Depende de | Entrega concreta y archivos | Requisitos / evidencia | Aceptación |
|---|---|---|---|---|
| B01 Congelar decisiones y catálogo | Lectura de este dossier | `domain/catalogs`, reglas con fuente/pendiente, inventario de formas, tarifas demo | RF04–12, RF18–20; I/F/A | Listas comunes; códigos oficiales no inventados |
| B02 Modelo y transiciones | B01 | Esquemas Zod, comandos, `requirements`, `eligibility`, `transitions`, proyección pública | RF15–25, RF30–33 | Unitarias de ramas/estados, transición inválida rechazada |
| B03 Repositorio mock persistente | B02 | IndexedDB, archivos Blob, seeds, reloj, latencia, idempotencia, revision; hooks | RF13/14/30/32/33 | Crear, recargar y recuperar caso/archivo; sin duplicado por doble envío |
| B04 Layout ERP y componentes | B01 | `AdminLayout`, sidebar, header, tabla, tabs, controles y modal; tokens internos; `AuthContext` y protección de rutas con sesión demo | RF28/29/34, U | Bandeja compacta, rutas operativas, cierre de sesión efectivo, teclado y móvil |
| B05 Registro y catálogo público | B02/B03 | Descomponer `PreRegistroPage`; contacto, registrante, condiciones, formatos, revisión y constancia | RF01–14, A1/A2/A4/A5/F | Tres variantes completas; envío alimenta bandeja |
| B06 Bandeja y revisión de expediente | B03/B04 | Filtros URL, detalle por tabs, revisión/observación/versionado, notas, referencia SC | RF15/16/19/28/31 | Observar y subsanar mismo ID; aprobar previo != ingreso oficial |
| B07 Pagos por etapa | B03/B06 | Tab pagos, bandeja pagos, comprobantes, validación y asignaciones | RF18, I/A4/A5 | Total adelantado cubre DU sin duplicación; observado no cuenta validado |
| B08 Agenda presencial y avisos | B03/B06 | Agenda real, intervalos, acta/asistencia, reprogramación y mensaje WhatsApp mock | RF21–23/26 | Choque rechazado, cancelación conserva antecedente, aviso vinculado |
| B09 Separación y divorcio ulterior | B06/B07/B08 | Resoluciones, espera, F06, nueva referencia DU, revisión y cierre | RF19/24/25/36, F06/A5 | Caso conserva dos números y no permite DU anticipada |
| B10 Consulta y subsanación | B03/B05/B06 | Localización, challenge demo, DTO público, correcciones, seguimiento y recuperación orientada | RF16/17/31, A3 | Otro contacto no abre ni edita; nota interna ausente |
| B11 Reportes de resoluciones | B03/B09 | `ReportesPage`, filtros mes/tipo, CSV; dashboard derivado | RF27/30, A5 | Tabla/total/exportación coinciden y usan número de etapa |
| B12 Escenarios y QA integral | Todos los recorridos | Fixtures, casos de aceptación, pruebas críticas, revisión visual, errores | RF32/34 | Guion completo sin editar fixtures a mano |
| B13 Handoff backend y demo | B12 | DTO/comandos/errores, README, notas de límites, recorrido grabable | RF33/U | Otra persona arranca y reproduce flujo sin explicación oral |

**Dependencias principales:** B01 → B02 → B03 → B06 → B08 → B09 → B11 → B12. B04 debe preceder a B06; B05/B07/B10 reutilizan el repositorio estabilizado. Codex mantendrá una única autoridad para dominio/servicio/layout; no creará un mock alternativo por pantalla.

### Orden de implementación recomendado a Codex

1. Construir una rebanada funcional: registro → bandeja → detalle → observación → subsanación → recarga. Todavía con estilo mínimo consistente.
2. Incorporar referencia SC, pagos y agenda presencial; revisar el mismo caso desde consulta ciudadana.
3. Incorporar resolución SC, habilitación controlada, F06 y referencia DU distinta; resolución final y reporte mensual.
4. Completar densidad/estados de interfaz y errores. Derivar dashboard de store, sustituir todos los placeholders y revisar accesibilidad.
5. Ejecutar aceptación y entregar contrato con limitaciones reales.

No empezar por rehacer el dashboard: sus contadores dependen del modelo y el flujo. No dedicar la primera fase a detalles ornamentales.

## Puntos de control sin cronograma

Fase 1 terminada: solicitud nueva aparece y sobrevive recarga. Fase 2 terminada: ciudadano corrige y abogada revisa; estado y saldo concuerdan. Fase 3 terminada: audiencia → SC → DU con segundo número → resolución → reporte. Fase 4 terminada: pruebas y handoff verificables. No detener la ejecución al terminar solo la primera fase si el usuario ha autorizado implementar el plan completo.

## Escenarios seed obligatorios

| ID | Situación ficticia | Qué prueba |
|---|---|---|
| DEMO01 | Sin menores, sin mayores en situación especial, sin bienes, ambos presentes | Camino ordinario y declaraciones |
| DEMO02 | Matrimonio en otro distrito y último domicilio en El Porvenir | Competencia OR |
| DEMO03 | Menor con solo sentencia de alimentos | Faltan tenencia/visitas y subsanación por más de un documento |
| DEMO04 | Hijo adulto sin situación del F04 | No exigir conciliación de menores automáticamente |
| DEMO05 | Mayor que requiere revisión especializada | No aprobación automática de rama compleja |
| DEMO06 | Cónyuge en extranjero con representante | Poder especial, partida y persona representada |
| DEMO07 | Bienes y escritura inscrita observada | Revisión documental patrimonial |
| DEMO08 | Acta con expedición antigua | Alerta y reemplazo de versión |
| DEMO09 | Pago parcial SC | DU pendiente; saldo visible |
| DEMO10 | Pago total con dos asignaciones | No doble cobro al iniciar DU |
| DEMO11 | Audiencia programada e inasistencia | Reprogramación motivada y conservación de acta |
| DEMO12 | SC resuelta, espera aún no cumplida | Bloqueo de transición anticipada |
| DEMO13 | Habilitado para DU con nuevo expediente | Referencias relacionadas y documentos por etapa |
| DEMO14 | DU resuelta y notificada | Reporte mensual y cierre |
| DEMO15 | No ratificación / cierre sin divorcio | No confundir con disolución |
| DEMO16 | Sin resultados, error de red, conflicto de revisión, archivo grande | Estados de error/recuperación |

Usar nombres “Persona Demo …”, números ficticios controlados, correos `example.test`, documentos marcados DEMOSTRACIÓN. Ningún fixture debe proceder de las grabaciones. Un reloj controlado permite mostrar espera cumplida sin cambiar la hora del equipo ni eliminar reglas.

## Matriz de aceptación

| ID | Dado / cuando | Resultado esperado |
|---|---|---|
| QA01 | DNI sintácticamente válido y datos declarados; registrar sin código de dirección | Se permite pre-registro; no se devuelve padrón ni se afirma autenticación real |
| QA02 | Registra representante; cónyuges distintos y domicilios distintos | Registrante separado; datos persisten y resumen identifica a cada parte; DNI repetido rechazado |
| QA03 | Fecha futura, menos de dos años, aniversario exacto, matrimonio fuera con domicilio local, ambos fuera | Errores/aceptación coherentes; OR correcto; dudas jurídicas orientadas, no diagnósticos automáticos |
| QA04 | Combinar presencia/ausencia de menores y mayores; más de cuatro hijos relevantes | DJ y documentación correspondientes; no hay límite arbitrario ni listas contradictorias entre pantallas |
| QA05 | Expedición hoy, tres meses exactos, anterior y fecha futura; fin de mes | Fecha futura inválida; alerta coherente con política configurada, no 90 días asumidos sin fuente |
| QA06 | Conciliación solo alimentos; luego agregar tenencia y visitas | No conforme inicialmente; checklist cubierto con documentos adicionales y revisión humana |
| QA07 | Sin bienes versus escritura inscrita versus situación no resuelta | Documento correcto por rama; ningún PDF por sí solo aprueba el requisito |
| QA08 | Representante para uno/ambos; poder genérico o sin inscripción | Revisión individual; observación con motivo, sin confundir representante y cónyuge |
| QA09 | Abrir seis formatos y compararlos; revisar instrucciones de firma | Cada uno corresponde al requisito; ningún formulario genérico se rotula como acta registral |
| QA10 | PDF/JPG/PNG válido, extensión falsa/MIME discordante, vacío, sobre límite, error de almacenamiento | Mensaje preciso, datos conservados, vista previa de archivo correcto; límites demo configurables (propuesta inicial 10 MB/archivo) |
| QA11 | Enviar dos veces por doble clic, recargar y entrar en bandeja/consulta | Un caso, código estable, metadata/Blob recuperables y constancia consistente |
| QA12 | Completar revisión previa | “Apto para presentación”; no aparece audiencia ni número municipal inventado |
| QA13 | Observar un documento, subir reemplazo, revisar nuevamente | Mismo caso, dos versiones, observación resuelta por revisión; eventos conservados |
| QA14 | DNI solo / contacto distinto / challenge incorrecto / expirado / correcto | No acceso no autorizado; con sesión demo válida solo proyección autorizada; notas internas nunca se devuelven |
| QA15 | Registrar cuota SC, abono total, comprobante duplicado, importe negativo, monto observado | Saldos correctos en céntimos; duplicado/negativo rechazados; pago observado no cubre obligación |
| QA16 | Registrar SC y DU con números distintos, corregir referencia, repetir un número existente | Dos referencias vinculadas; historial de corrección; control de duplicados según sistema/año/tipo; oficios DU usan DU |
| QA17 | Programar 09:00–10:00 y 09:30–10:30; otro día; sin expediente | Solapamiento rechazado; otro día permitido según horario; expediente obligatorio; solo presencial |
| QA18 | Asiste representante, falta una parte, no ratifica, nueva ausencia | Asistencia/resultado por parte, acta y motivo; transición correcta y revisión legal para cierre |
| QA19 | Tratar de pasar de recibido a divorciado; solicitar DU antes y después de habilitación | Comandos inválidos rechazados también por servicio; DU crea nueva referencia dentro del mismo caso |
| QA20 | Reloj demo avanza por fin de mes/año; SC emitida pero no notificada; feriados sin validar | No confundir meses con 60 días; indicar política/falta de dato; no emitir conclusión legal automática |
| QA21 | Preparar aviso y simular éxito/falla | Expediente, destinatario y audiencia correctos; no envío externo; retry conserva operación sin duplicar avisos |
| QA22 | Filtrar mes y SC/DU; incluir borrador, resolución emitida y notificada en meses distintos | Contar emisión según criterio de reporte; excluir borrador; CSV coincide con tabla y número de etapa |
| QA23 | Recorrido teclado, zoom 200%, 360/390/768/1366/1440 px | Sin contenido inaccesible ni scroll global; foco visible, errores asociados y diálogo accesible |
| QA24 | URL interna sin sesión, credenciales inválidas, lector intenta mutar, cerrar sesión y volver | Redirección/403 demo coherentes; sesión invalidada y datos internos retirados |
| QA25 | Cambiar estado/pago/audiencia y navegar a dashboard/consulta/reportes | Las vistas muestran el mismo caso; métricas calculadas, no constantes |
| QA26 | Reiniciar escenario; restaurar tras recarga; inyectar falla | Seed determinista, aviso demo visible, solo elimina datos locales de demostración previa confirmación |
| QA27 | Sustituir adaptador por stub HTTP con errores 401/409/422/500 | Componentes no cambian; errores de campo/global se presentan correctamente |
| QA28 | Importación futura con IDs repetidos/columnas incompletas | Se especifica validación y vista previa antes de activar importador; P1 |
| QA29 | Imprimir constancia, resumen y borrador de resolución | Datos propios del caso, paginado razonable, marca demo, sin firmas inventadas |

### Pruebas automatizadas que aportan valor

Agregar Vitest para funciones puras de requisitos, elegibilidad, estados, asignación de pagos y proyección pública; usar Testing Library donde importe comportamiento de formulario; Playwright para 3–5 recorridos integrados. No escribir snapshots masivos de JSX ni pruebas que solo repitan constantes. Probar especialmente fronteras de fecha, combinación de requisitos, rechazo de comandos inválidos, aislamiento de casos y recarga de archivos.

Recorridos E2E mínimos: (1) registro→revisión→observación→subsanación; (2) pago SC→ingreso→audiencia→SC; (3) DU habilitada→segundo número→resolución→reporte; (4) acceso inválido/nota interna; (5) pago total/reintento sin duplicación.

## Guion de demostración de 12–15 minutos

1. Portal: elegir situación y abrir dos formatos distintos.
2. Registrar caso ficticio con contacto y escaneos; generar constancia y recargar.
3. Abogada: encontrarlo, revisar y observar un documento con motivo.
4. Ciudadano: acceder mediante mecanismo demo y subir nueva versión sin duplicar solicitud.
5. Abogada: aprobar revisión previa; registrar comprobante/número SC tras presentación simulada.
6. Programar audiencia presencial y preparar aviso WhatsApp simulado.
7. Registrar ratificación y resolución de separación con archivo ficticio.
8. Con reloj demo, mostrar la habilitación; solicitar DU, registrar segundo número y saldo.
9. Registrar resolución DU y consultar informe mensual/exportación.
10. Mostrar historial completo y que las notas internas no aparecen al ciudadano.

No modificar código entre pasos; el evaluador debe poder repetirlos. Si alguna parte usa un fixture avanzado, decirlo expresamente.

## Definición de terminado

- No quedan botones de operaciones requeridas que únicamente muestren mensajes sin efecto.
- Se cubren todos los P0; cualquier exclusión se declara con tarea y motivo, no como “implementado”.
- Registro nuevo, corrección y segunda etapa mantienen identidad y relaciones al recargar.
- Formularios, pagos, agenda y resoluciones tienen estados de carga, error y éxito reales dentro del mock.
- Reporte mensual de resoluciones utiliza datos derivados y descarga efectiva.
- Build/lint/pruebas críticas pasan; revisión visual desktop/móvil y teclado realizada con evidencia.
- Documento de contrato y guion están actualizados al comportamiento entregado.
- Reglas legales inciertas, costos demo y servicios simulados están identificados; no existen datos reales de ciudadanos.

## Riesgos y reducción de alcance responsable

R1, extensión de la tarea: mantener progreso por fase y comunicar pendientes concretos. R2, normas/códigos: configuración y marcación de pendiente. R3, integración: estabilizar DTO y comandos antes de extender pantallas. R4, diseño: mantener stack e identidad; nada de migración AdminLTE/Bootstrap. R5, almacenamiento demo: manejar cuota/error y reset explícito. R6, ruido de audios: usar matriz sintetizada y revisar marcas inciertas con la oficina. R7, uso indebido del prototipo: demo visible y sin operaciones reales.

Implementar los P0 completos y después las mejoras P1 que no dependan de decisiones municipales faltantes. Importación Excel y plantillas oficiales faltantes quedan documentadas hasta contar con sus fuentes. No eliminar persistencia, subsanación, distinción de números SC/DU, pago coherente, privacidad de consulta ni reporte mensual requerido para declarar el sistema completo.
