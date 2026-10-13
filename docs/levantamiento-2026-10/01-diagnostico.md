# Diagnóstico del frontend

Base revisada: commit `99469d9`. Fecha del levantamiento: 6 de octubre de 2026, America/Lima. El alcance de esta entrega es análisis y planificación; no se implementaron las funcionalidades descritas como pendientes.

## Dictamen

Existe un prototipo de navegación con una identidad pública reconocible. No existe todavía una simulación integral del procedimiento. La principal deuda es conectar las pantallas a un mismo expediente y modelar decisiones, documentos, pagos y etapas; cambiar únicamente el aspecto del panel dejaría los problemas principales intactos.

La estrategia recomendada es conservar React, Vite, Tailwind, React Router, React Hook Form, Zod y Lucide; consolidar componentes y un servicio mock persistente; reconstruir la organización interna con criterios de ERP. AdminLTE será una referencia de disposición y densidad, sin incorporar un segundo sistema CSS al proyecto. Impeccable es una herramienta del agente, no una dependencia de la aplicación.

## Inventario y brechas verificadas

| Superficie / archivo | Qué funciona hoy | Qué falta / problema | Prioridad |
|---|---|---|---|
| `src/pages/public/LandingPage.jsx` | Navegación, preguntas y lista condicional, vista de PDF, contacto | Requisitos duplicados; hijos tratados solo por cantidad; faltan declaraciones de ausencia; todos los ejemplos apuntan a un PDF; promesa de disolución en tres meses; contacto general en lugar del área | P0 reglas, P1 contenido |
| `src/pages/public/PreRegistroPage.jsx` | Cinco pasos, validación Zod, DNI demo, selección de archivos, previsualización | Archivo de 1199 líneas; envío solo activa un booleano; no persiste ni genera identificación; faltan domicilios actuales separados y contacto editable; menores y mayores no se distinguen; representación solo por nombre | P0 |
| `src/pages/public/ConsultaEstadoPage.jsx` | Consulta de un DNI de demostración, historial y PDF demo | No lee el registro recién enviado; DNI como único acceso; documentos ficticios; no hay subsanación ni segunda etapa; cuatro estados insuficientes | P0 |
| `src/pages/admin/LoginPage.jsx` | Formulario y navegación | Cualquier envío que pase validación HTML navega al dashboard; sin sesión, roles ni error de credenciales | P0 |
| `src/context/AuthContext.jsx` | Archivo reservado | Solo TODO | P0 |
| `src/routes/AppRouter.jsx` | Ocho rutas explícitas y redirección comodín | Rutas internas sin protección; no hay ruta de documentos; desconocidas vuelven al inicio y ocultan errores | P0 |
| `src/pages/admin/DashboardPage.jsx` | Indicadores, gráfico, tabla, agenda visual | Estadísticas y listas independientes; 47 activos frente a 10 fixtures; estados y fechas no concuerdan con otras pantallas | P1 |
| `src/pages/admin/ExpedientesPage.jsx` | Búsqueda sin distinguir tildes, filtro de estado, paginación, acceso al detalle | Nuevo expediente solo muestra aviso; página fija de cuatro filas; no filtra etapa, pago, fecha, responsable o código municipal | P0 / P1 |
| `src/pages/admin/ExpedienteDetallePage.jsx` | Cónyuges por ID, notas y número municipal en memoria | Acciones de estado/audiencia/documento son mensajes; descargas simuladas; matrimonio, documentos e historial iguales para todos; cambios se pierden al desmontar | P0 |
| `src/pages/admin/AudienciasPage.jsx` | Selección de día, alta en memoria, choque de hora exacta, resultado local | Mayo 2026 fijo; no vincula expediente; fecha demo 10 y límite 25; ausencia de duración, notificación, asistentes, acta y reglas de reprogramación | P0 |
| `src/pages/admin/DocumentosPage.jsx` | Archivo reservado | Solo TODO; el enlace del menú termina en el inicio público | P0 |
| `src/services/api.js` | Punto previsto para integración | Solo comentarios TODO; pantallas importan fixtures directamente | P0 |
| `src/mock/expedientes.js` | Diez casos con solicitantes y estado | No son un modelo del procedimiento; colores guardados junto a datos; DNIs de aspecto real mezclados con 11111111/22222222 | P0 |
| `src/mock/consultaTramite.js` | Caso ciudadano más detallado | Fuente paralela no sincronizada con expediente | P0 |
| `src/mock/estados.js`, `requisitos.js`, `src/utils/validators.js` | Archivos previstos | Solo TODO; lógica efectiva duplicada en pantallas | P0 |
| `AdminSidebar`, `AdminHeader` | Navegación adaptable y cabecera | Layout repetido en cada página; usuario fijo; campana sin acción; salir no invalida sesión; sin breadcrumbs | P1 |
| `Button`, `Input`, `DocumentUpload`, `RequisitosChecklist` | Archivos previstos | Solo TODO; controles se reescriben por pantalla | P1 |
| `Modal` | Cierre con Escape y fondo; semántica dialog | No gestiona foco inicial, encierro y devolución de foco | P1 |
| `FilePreview` | PDF/imágenes y liberación de object URL | Archivos volátiles; tipado por extensión; falta límite de peso y errores de lectura; no implica almacenamiento | P0 |
| `StatusTimeline`, `Stepper`, `ProgressBar`, `Badge` | Componentes reutilizables | Estados/colores deben derivarse del dominio; progreso del trámite no debe presentarse como porcentaje jurídico | P1 |
| `src/index.css` | Tokens, dos tipografías, identidad roja, movimiento reducido | Las mismas escalas grandes y redondeadas se aplican al panel; fuentes remotas; requiere tokens de superficie interna | P1 |
| `vite.config.js`, `vercel.json` | React + Tailwind y fallback SPA | Falta contrato de variables, modo mock/HTTP y separación de despliegue demo; no se requiere cambiar hosting para esta semana | P1 |

## Hallazgos de flujo

1. `submitApplication()` solo ejecuta `setPreRegistrationCompleted(true)`: el mensaje de recepción no representa un registro recuperable.
2. El éxito promete avisar por correo/teléfono, aunque el formulario no recoge esos datos de contacto ni existe envío.
3. El verificador acepta solo dos pares DNI/código y devuelve nombres. Debe revisarse según lo conversado con Sistemas, sin simular acceso real a RENIEC.
4. El estado observado aparece en el dashboard, pero no en el filtro general. El mismo texto pre-registrado tiene distintos colores.
5. La identificación interna `TRA2026-...` ya se distingue verbalmente del expediente de Mesa de Partes. Es una base útil, pero falta persistencia y relación entre las dos etapas.
6. Todas las páginas públicas abren `public/EJEMPLO.pdf` independientemente del requisito. Ya se recuperaron los seis formularios oficiales para planificar un catálogo real.
7. No hay registro de pago ni constancia de validación, pese a ser un punto explícito de la visita.
8. No existe un camino funcional de separación convencional a divorcio ulterior; un estado genérico concluido no distingue disolución de cierre sin ratificación.
9. La regla actual “15 días posteriores al registro” se aplica globalmente a la agenda. No diferencia prerregistro, ingreso oficial y revisión jurídica.

## Evaluación visual

Se abrió el portal y el listado interno en navegador, a un ancho aproximado de 1265 px. La portada tiene jerarquía clara, escudo y color institucional reconocibles; conviene conservarlos. El listado interno desperdicia altura con título duplicado, filtros en un contenedor grande, márgenes amplios y badges que parten su texto. A esa anchura solo se ven dos filas completas antes del borde inferior. Un expediente debe poder leerse y operarse con menos desplazamiento.

La nueva composición debe priorizar: cabecera compacta, bandeja de trabajo, filtros sobre la tabla y detalle con pestañas. Las cifras del dashboard deben responder a preguntas operativas: qué revisar, qué vence, qué audiencia sigue y qué tiene observaciones. Evitar gráficos ornamentales y tarjetas dentro de tarjetas.

## Verificación realizada

- `npm run build`: exitoso; JS principal 494.31 kB / 139.68 kB gzip y CSS 49.97 kB / 8.93 kB gzip en la base revisada.
- `npm run lint`: exit code 0.
- No hay script de pruebas automatizadas en `package.json`.
- Revisión estática de páginas, componentes, rutas, mocks, estilos y configuración; comprobación visual inicial de portada y bandeja.
- Estos resultados no prueban accesibilidad completa, seguridad, reglas legales, experiencia móvil ni funcionamiento de extremo a extremo. Esas verificaciones están especificadas como trabajo de implementación.

## Qué preservar

Identidad municipal y escudo; organización pública general; búsqueda insensible a tildes; validaciones y mensajes útiles; separación conceptual entre trámite interno y expediente municipal; previsualización con liberación de URLs; preferencia de movimiento reducido.

## Qué no hacer esta semana

No reescribir en otro framework; no migrar masivamente a TypeScript; no instalar Bootstrap junto a Tailwind para imitar AdminLTE; no implementar .NET ni inventar endpoints existentes; no presentar verificación de identidad, cobros, firma, notificaciones o inscripción registral simuladas como operaciones reales. No añadir módulos de inventario, contabilidad o recursos humanos por llamar ERP al panel.
