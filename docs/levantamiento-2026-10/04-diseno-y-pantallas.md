# Diseño y especificación de pantallas

Estado: propuesta implementable para revisión del equipo. Se apoya en la petición de conservar la identidad pública y llevar el panel de la abogada a un patrón profesional de gestión. No es una interfaz ya implementada.

## Dirección visual

**Portal público:** mantener escudo, rojo institucional, estructura informativa y navegación existente. Corregir contenido, accesibilidad y formularios sin convertirlo en una landing comercial. El ciudadano debe entender si puede iniciar, qué necesita y cuál es el siguiente paso.

**Panel interno:** modo operativo de Impeccable. La unidad principal es el expediente; la tarea principal es revisar lo pendiente y registrar una actuación. Inspiración de [layout AdminLTE 4](https://adminlte.io/themes/v4/docs/layout.html): cabecera, navegación lateral, área de trabajo y pie discreto; barra lateral colapsable. Implementar estos patrones con React/Tailwind existentes. No copiar sus datos, plugins, mensajes ni marca.

### Sistema propuesto para el panel

| Elemento | Especificación |
|---|---|
| Fondo / superficies | Fondo `#F4F6F9`, superficie `#FFFFFF`, borde `#D7DEE7` |
| Texto | Principal `#1F2937`, secundario `#475569`; contraste AA a verificar |
| Identidad | Conservar `#B91C1C` y `#7F1D1D`; rojo en acción principal y marca, no en toda la tabla |
| Navegación | Fondo oscuro sobrio; activo con acento institucional y texto inequívoco |
| Estados | Azul: recibido/en revisión; ámbar: atención/observado; verde: validado/finalizado; rojo: error o cierre con incidencia; gris: borrador/archivado. Siempre acompañar color con texto |
| Tipografía interna | Una familia funcional: `Source Sans 3` autoalojada, con fallback del sistema. Tamaño base 14–16 px; tabla 14 px; título 22–24 px; etiquetas 13–14 px. Conservar fuentes públicas por ahora |
| Espaciado | Escala 4/8/12/16/24/32; contenido a 24 px en desktop y 16 px en móvil |
| Bordes | Radio 4–6 px; campos/acciones consistentes; sombra solo en overlays |
| Dimensiones | Sidebar 240 px, mini 64 px; cabecera 56–64 px; fila habitual 44–48 px; controles 36–40 px desktop y al menos 44 px en táctil |
| Movimiento | 150–200 ms para expansión/cambio; sin tarjetas que saltan ni entradas coreografiadas; respetar movimiento reducido |
| Iconos | Lucide, 16–20 px, etiqueta visible en acciones relevantes |

No son valores normativos de la municipalidad: son decisiones de diseño propuestas para producir consistencia y densidad. Verificarlos en navegador antes de considerarlos aprobados.

### Reglas contra aspecto genérico

Sin gradientes decorativos, brillos, grandes bloques de bienvenida, mosaicos de iconos o estadísticas inventadas. No duplicar título de cabecera y título de página. No envolver cada etiqueta en otra tarjeta. No usar nombres reales del personal sin confirmación; fixture “Abogada de demostración”. Tablas con números monoespaciados/tabulares cuando corresponda y acciones con verbos concretos: “Registrar ingreso”, “Observar documento”, “Programar audiencia”.

## Navegación propuesta

```text
Inicio / Mi bandeja
Expedientes
Audiencias
Documentos y formatos
Pagos [vista operativa, no caja]
Reportes de resoluciones [P0]
Configuración de demostración [solo demo]
```

No crear un módulo de usuarios completo esta semana. Roles mínimos simulados y permisos declarativos; si la visita no confirma más perfiles, trabajar con abogada y lector demo, manteniendo Mesa de Partes como sistema externo.

## P01 — Inicio público `/`

- Mantener accesos “Iniciar pre-registro”, “Consultar trámite”, “Requisitos y formatos”.
- Explicar dos etapas y diferenciar recepción digital de ingreso municipal.
- Mostrar condiciones generales antes de pedir documentos. No afirmar que el procedimiento concluye obligatoriamente en tres meses.
- Reemplazar cantidad genérica de hijos por preguntas separadas sobre menores y mayores en la situación indicada por el formulario oficial; bienes y representación independientes.
- Lista de requisitos calculada con la misma función que usa el formulario y la revisión interna.
- Cada requisito debe tener: motivo, condición de aplicación, documento esperado, formato oficial cuando exista y orientación de obtención cuando no exista formato municipal.
- No usar una misma muestra para DNI, acta registral y declaración jurada.
- Mostrar tarifas con fuente y vigencia pendientes de confirmar, y contacto del área desde configuración única. Incluir alternativa de orientación presencial.

## P02 — Pre-registro `/pre-registro`

Descomponer en pasos sin perder los datos al retroceder. Encabezado compacto, progreso del formulario y ayuda contextual. Un formulario no se identifica con una resolución ni con un expediente oficial.

1. **Quién registra.** Seleccionar cónyuge o representante; datos declarados del registrante. Retirar el bloqueo por los tres caracteres de la dirección del DNI: Sistemas cuestiona esa validación al inicio (A2, 01:22–03:10). La consulta de identidad externa no es prerrequisito del pre-registro. Si se demuestra una validación opcional, no devolver domicilio u otros datos de terceros ni simular RENIEC conectado.
2. **Cónyuges y contacto.** “Cónyuge 1” y “Cónyuge 2”; nombres y apellidos ingresados por el usuario, DNI u otro tipo sujeto a catálogo aprobado, dirección actual completa por persona, teléfono y correo de contacto. Evitar denominar “otro cónyuge” cuando registra un representante. Prohibir DNI iguales en ambas partes.
3. **Matrimonio y competencia.** Fecha, municipalidad/lugar de celebración, último domicilio conyugal completo, acuerdo de ambas partes. Validar fecha y competencia con alternativas; no confundir dirección actual o DNI con domicilio conyugal.
4. **Situación familiar, patrimonio y representación.** Separar menores/mayores; una fila por hijo relevante si se requieren datos individuales; no limitar a cuatro. Patrimonio y documento registral. Representación por cada cónyuge: representante, identificación, contacto, facultades, inscripción y archivo de poder; residencia extranjera es un dato, no la única razón de representación.
5. **Documentos y pago.** Lista condicional; cargas con versión, estado, fecha de expedición y vista previa. Registrar comprobante de pago cuando corresponda al flujo confirmado; permitir orientar al pago tras revisión si esa es la práctica. Distinguir aporte total y aplicación por etapa.
6. **Revisión y envío.** Resumen editable por sección, aceptación veraz, aviso de privacidad con texto pendiente de aprobación y aviso demo. Envío único con estado de carga; errores conservan datos; éxito genera identificador único y constancia imprimible con marca de demostración.

Borrador local: recuperación explícita, fecha de guardado y opción de descartar. Para la demo solo datos ficticios. Guardar archivos como Blob en IndexedDB si deben sobrevivir a recarga; no guardar object URLs ni serializar File a JSON. Si una persistencia falla, informarlo antes de declarar éxito.

## P03 — Consulta y subsanación `/consulta-estado`

- Propuesta de acceso: DNI y correo/teléfono registrado para localizar sin revelar datos, seguidos de verificación de contacto simulada para abrir documentos o subsanar. Una referencia de trámite puede facilitar la búsqueda, pero no será una clave obligatoria que la persona deba recordar. Sistemas pide una solución intermedia y cuestiona DNI aislado (A3, 00:00–03:33); mecanismo final pendiente. En demo, el código de prueba se identifica como ficticio y no se envía realmente.
- Respuesta pública resumida: código interno, número municipal cuando exista, etapa, estado comprensible, última actualización y próximo paso.
- Historial ciudadano construido por lista explícita de eventos públicos. Nunca incluir comentarios internos, resultados de identidad, datos de otros casos ni el JSON interno completo.
- Documentos propios con acceso de demostración; observaciones con descripción precisa y botón para cargar una nueva versión. Conservar versión observada como antecedente.
- Vista de solicitud ulterior cuando corresponda; puede solicitarla uno de los cónyuges, sin obligar a repetir toda la primera etapa.
- Enlaces a resoluciones disponibles únicamente cuando se registre su publicación/entrega; un archivo borrador no se vuelve ciudadano automáticamente.
- Estados de carga, consulta no válida sin enumerar DNIs, expiración, sin actuaciones y error recuperable.

## A01 — Acceso interno `/admin/login`

Sesión mock explícita con perfiles ficticios. Validar credenciales de demo, mostrar error genérico y limitar doble envío. `ProtectedRoute` conserva la ruta solicitada y vuelve a ella tras acceso. Cerrar sesión invalida sesión y caché de datos internos. No afirmar que una protección React constituye seguridad de producción.

## A02 — Bandeja `/admin/dashboard`

Primera franja: búsqueda global y fecha operativa. Segunda: cuatro contadores derivados — pendientes de revisión, observados, audiencias próximas y solicitudes ulteriores disponibles. Clic en cada contador abre un filtro real. Zona principal: tabla priorizada de pendientes; secundaria: agenda del día y alertas con expediente enlazado. El gráfico mensual es P1 y solo se agrega si aporta a una decisión y deriva del mismo repositorio.

## A03 — Expedientes `/admin/expedientes`

- Barra superior: título, recuento, “Registrar expediente” y exportación P1.
- Filtros visibles: búsqueda por código/número/nombres; etapa; estado. Avanzados: fecha ingreso, pago pendiente, observación y responsable.
- Filtros, orden y página en URL para volver desde el detalle sin perder contexto.
- Columnas: código interno; expediente municipal; cónyuges; etapa/estado; pendiente principal; ingreso; última actuación; acción abrir.
- Número de filas 10/25/50. Cabeceras ordenables con semántica accesible. No esconder el número municipal en tooltip.
- Sin resultados: mostrar filtros y “Limpiar filtros”. Sin expedientes: explicar cómo ingresar el primero. Error: reintentar sin borrar filtros.
- Alta asistida: reutilizar esquema ciudadano, agregar origen presencial, fecha de ingreso y referencias municipales; nunca duplicar una segunda implementación de requisitos.

## A04 — Detalle `/admin/expedientes/:id`

```text
Expedientes > TRA-...                          [Acción válida siguiente]
Código interno | Expediente municipal | Etapa | Estado | Responsable
Pendiente principal / observación / vencimiento por confirmar
Resumen | Documentos | Pagos | Audiencias | Resoluciones | Historial
Área activa de trabajo                         Resumen breve del caso
```

**Resumen:** cónyuges, contacto, domicilios, matrimonio, competencia, hijos aplicables, patrimonio, representación y referencias de Mesa de Partes. Registro/edición del número con unicidad simulada y motivo si se corrige.

**Documentos:** visor a la izquierda y checklist a la derecha en desktop; apilados en móvil. Seleccionar documento, consultar metadatos/versión/expedición, marcar conforme u observado con motivo y publicar o reservar observación. El visto bueno jurídico es una actuación explícita y no resulta de subir un archivo.

**Pagos:** conceptos por etapa, importe esperado, abonado, aplicado y saldo; registrar comprobante; validar/observar; historial. No llamar “pago exitoso” a la carga de una imagen. Detalle de adelanto de segunda etapa si hubo pago total.

**Audiencias:** fechas, sede presencial, participantes/representantes, notificaciones, convocatoria, resultado y acta. Programar desde el expediente preseleccionado; toda audiencia debe tener expediente. Retirar la opción virtual: A5 11:47–12:24 confirma presencialidad.

**Resoluciones:** tipo, número, fechas de emisión/notificación, archivo, firmante indicado por la entidad y estado de documento. Se puede preparar borrador o cargar documento demo; no firmar ni emitir un acto municipal real. Registrar separación y disolución por separado.

**Historial:** eventos cronológicos con autor, fecha/hora, tipo, motivo y visibilidad; filtrar eventos públicos/internos sin mezclarlos. Notas internas en panel propio; nunca sirven como notificación al ciudadano.

Acciones disponibles se calculan por estado, requisitos, permisos y revisión. No ofrecer un selector libre que salte de recibido a divorciado. Confirmar cierres y actuaciones relevantes mostrando expediente, cambio y motivo; no confirmar acciones triviales de lectura.

## A05 — Audiencias `/admin/audiencias`

Vista agenda como predeterminada; calendario mes/semana complementario. Navegación de mes real, reloj de demo único, zona America/Lima. Formulario con expediente elegible, fecha/hora, duración, sede presencial, convocados y observación. Detectar solapamientos por intervalos, no solo igualdad de hora. Mostrar plazos como alertas configurables sujetas a validación legal. Guardar cancelación/reprogramación como nueva actuación y mantener la fecha original. Acción “Preparar aviso por WhatsApp” con vista previa, destinatario ficticio y registro simulado; no abrir envíos reales durante la demo.

Resultado: asistencia por participante, identidad de representante, ratificación de cada parte, motivo de ausencia y acta. Separar reprogramación, no ratificación y reiteración de ausencia. La conclusión sin divorcio debe tener razón legible; no mostrarla como disolución.

## A06 — Documentos y formatos `/admin/documentos`

Dos pestañas: “Documentos de expedientes” (búsqueda, tipo, revisión, fecha y vínculo al caso) y “Formatos oficiales” (seis formatos descargados, URL de origen y versión). Mostrar faltante cuando un formato no existe; una escritura pública o partida registral no se reemplaza por una declaración municipal inventada. Si se habilita prellenado, generar borrador, conservar el original y no dibujar firmas/huellas.

## A07 — Pagos `/admin/pagos`

Bandeja de comprobantes pendientes de validación con etapa, concepto, importe, fecha y expediente. Comparación visual del comprobante y monto esperado. Validación local simula la revisión humana; integración con caja es futura. El mismo comprobante puede distribuirse entre dos conceptos sin contarse dos veces.

## A08 — Configuración demo y reportes

Configuración demo accesible solo en modo mock: escenario, reloj controlado, latencia, error simulado y reinicio de datos con confirmación. La interfaz de trabajo debe mostrar una franja discreta “Demostración — datos ficticios”. Configuración operativa de tarifas, códigos, plazos y contactos se modela, pero su editor de producción es P1.

Reporte mensual de resoluciones P0 (pedido A5 08:33–09:45): período, tipo separación/disolución, número y fecha de resolución, número de expediente de su etapa y solicitantes, con totales y exportación CSV UTF-8 compatible con Excel. Excluir borradores de “emitidas”; distinguir fecha de emisión de notificación. Filtro por mes y tipo debe cambiar tabla y exportación. Reportes adicionales P1: expedientes por etapa/estado, audiencias y pagos. Exportar únicamente resultados filtrados; neutralizar fórmulas ejecutables en CSV y no incluir datos ocultos. La importación de Excel no queda confirmada como requisito; requerir primero muestra de columnas y regla de deduplicación. No presentar caja contable ni estadísticas oficiales.

## Accesibilidad y adaptación

Revisión en 360/390 px, 768 px, 1366×768 y 1440×900; zoom 200%; teclado completo. Sidebar se convierte en drawer con foco administrado. En móvil la bandeja resume columnas, con acceso al detalle; el scroll horizontal puede quedar dentro de tablas complejas, nunca en toda la página. Campos con etiqueta, ayuda y error asociados; focus visible; diálogos con foco inicial, Escape, encierro y devolución; mensajes asincrónicos con `aria-live`; estados nunca solo por color; alternativas para PDF no renderizable. Tablas deben conservar cabeceras y lectura razonable por lector de pantalla.
