# Prompt para iniciar la implementación

Copiar el siguiente texto en el chat del mismo repositorio. Es una instrucción para una etapa posterior; este archivo no autoriza por sí solo a comenzar durante el análisis.

---

Actúa como desarrollador frontend senior y ejecuta el plan completo del sistema de separación convencional y divorcio ulterior de la Municipalidad Distrital de El Porvenir. Trabajo solo contigo, Codex; organiza la ejecución por dependencias, sin cronograma ni reparto entre personas.

El repositorio ya existe. Lee primero `docs/levantamiento-2026-10/README.md` y los documentos 01 a 06; usa `08-control-de-avance.md` para registrar estado, decisiones y comprobaciones. Si el repositorio cambió desde el diagnóstico, inspecciona la diferencia y adapta las tareas sin borrar trabajo del usuario. No vuelvas a hacer el levantamiento desde cero salvo que falte una evidencia concreta.

Objetivo: sustituir las simulaciones aisladas por un frontend completo con datos ficticios persistentes y un flujo coherente, que sirva para demostrar la operación y guiar los endpoints .NET. Implementa primero los P0 y luego las mejoras P1 que no requieran información externa faltante. No termines al mostrar pantallas ni al cerrar la primera fase: completa la definición de terminado y explica cualquier bloqueo real con precisión.

Conserva React, Vite, Tailwind, React Router, React Hook Form, Zod y Lucide. Mantén la identidad pública municipal y mejora su consistencia; rediseña el panel de la abogada como herramienta ERP sobria y compacta, conforme a `04-diseno-y-pantallas.md`. Usa la skill Impeccable instalada; si su lanzador de Windows falla, lee directamente el contexto y continúa. AdminLTE es referencia de layout/densidad, no motivo para instalar Bootstrap ni migrar el proyecto. No añadas decoración genérica, gráficos sin propósito ni componentes sobredimensionados.

Implementa una única capa asíncrona de servicios con adaptador mock persistente en IndexedDB, incluidos archivos Blob, y contrato para adaptador HTTP posterior. Las pantallas no deben importar fixtures directamente. Una actuación cambia el expediente, la consulta, la agenda, el saldo y los reportes de manera consistente. Usa esquemas compartidos, transiciones con precondiciones, eventos históricos, idempotencia y control de revisión. No implementes backend .NET ni inventes que existen los endpoints propuestos.

Respeta especialmente lo levantado:

- Pre-registro con datos declarados y sin bloqueo por los tres caracteres de la dirección del DNI; no mostrar datos privados de un padrón.
- Registrante separado de cónyuge 1/cónyuge 2 y representantes, con domicilios actuales, último domicilio conyugal y contacto.
- Requisitos separados por menores, mayores, patrimonio y representación; poder especial inscrito; alimentos, tenencia y visitas; seis formatos oficiales correctos y guía de escaneo con firmas/huellas.
- Revisión previa → observación/subsanación del mismo caso → apto para presentación → ingreso oficial por Mesa de Partes.
- Dos etapas relacionadas y dos números municipales distintos, SC y DU; códigos internos separados de códigos TUPA/expediente oficial.
- Pagos por etapa o total adelantado, comprobantes, validación humana simulada y asignación de saldo sin duplicación. La fotografía muestra 273.34 + 178.94 = 452.28 PEN, como referencia demo pendiente de TUPA vigente.
- Consulta con protección adicional al DNI y subsanación autorizada. La verificación de contacto/OTP es una propuesta mock, no una integración real ni una decisión textual del ingeniero.
- Audiencia presencial, expediente vinculado, agenda real, asistencia por parte, ratificación, acta y reprogramación motivada. Retira la opción virtual del flujo de esta entidad.
- Avisos por WhatsApp solo simulados, con vista previa y trazabilidad; nada se envía externamente.
- Resolución de separación, espera/habilitación, solicitud ulterior por un cónyuge, segundo número de Mesa de Partes, resolución de disolución y cierre documentado. No emitir divorcio automáticamente al vencer un plazo.
- Reporte mensual de resoluciones emitidas, filtrable y exportable, con el número de expediente de su etapa. No confundirlo con gráfico de expedientes ingresados.

No inventes respuestas a Q01–Q12. Parametriza las pendientes y usa supuestos demo visibles; continúa con trabajo independiente sin detener toda la implementación por una duda jurídica. El cómputo oficial de plazos, tarifas vigentes, códigos exactos y formatos de resoluciones los valida la entidad. No publiques datos reales ni reutilices las conversaciones como fixtures. No conectes RENIEC, caja, Mesa de Partes, WhatsApp, correo, firma digital o registros externos durante esta demo.

Sigue las tareas B01–B13 y sus dependencias. Divide el formulario extenso, completa componentes reservados, protege rutas internas en modo demo, conecta Documentos/Pagos/Reportes y elimina botones que únicamente anuncian éxito. Mantén datos al navegar/recargar. Los formularios tendrán carga, error, vacío, validación y recuperación; archivos y notas conservarán versiones/visibilidad. La demo tendrá escenarios reproducibles y reloj controlado sin cambiar la hora del equipo.

Comprueba con pruebas de valor: motor de requisitos, transiciones, dinero, fechas y proyección pública; recorridos integrados registro→subsanación y SC→DU→reporte; recarga de archivos; aislamiento de casos y sesión. Ejecuta build/lint y revisa visualmente desktop/móvil, teclado y zoom. No sustituyas esas comprobaciones por una afirmación de que “debería funcionar”.

Actualiza `08-control-de-avance.md` después de cada fase con archivos modificados, pruebas y próximos pasos para continuar entre sesiones. Mantén el contrato backend y guion de demo alineados con lo implementado. Al finalizar, entrega resumen de cambios, instrucciones de ejecución, perfiles/escenarios de prueba, evidencias de validación y pendientes municipales. No despliegues públicamente ni contactes terceros como parte de esta implementación.

Empieza ahora por revisar el estado de trabajo y ejecutar B01–B03; continúa con las fases restantes hasta completar el objetivo autorizado.

---

## Prompt breve de continuación

Continúa la implementación del plan en `docs/levantamiento-2026-10/`. Lee `08-control-de-avance.md`, comprueba el estado real del repositorio y retoma la primera tarea pendiente. Conserva lo implementado, completa dependencias y valida los criterios de aceptación. No vuelvas a planificar desde cero ni des por terminada la implementación por haber acabado una sola fase.
