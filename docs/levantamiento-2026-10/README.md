# Plan maestro — Frontend de divorcios, Municipalidad de El Porvenir

**Entrega: análisis, requisitos centralizados y plan de implementación.** Fecha del encargo: 6 de octubre de 2026. Base de código: `99469d9`. El usuario confirmó que trabajará solo con Codex: este plan no asigna personas ni impone cronograma.

## Conclusión ejecutiva

El repositorio es un prototipo visual con funciones locales aisladas. Compila y pasa lint, pero el registro no alimenta la bandeja, la consulta usa otro fixture, varias acciones solo muestran avisos y el procedimiento no distingue sus dos expedientes oficiales. El rediseño interno debe hacerse junto con un modelo de trámite coherente y persistente.

Conservar la identidad del portal ciudadano. Transformar el panel de la abogada en una interfaz de gestión sobria, compacta y centrada en expedientes, con Impeccable y patrones de AdminLTE como referencia. Mantener React/Tailwind; no migrar de framework ni añadir Bootstrap.

## Cómo usar este dossier

| Documento | Contenido | Quién lo necesita |
|---|---|---|
| [01 — Diagnóstico](01-diagnostico.md) | Inventario del proyecto, brechas, evidencias y verificación actual | Usuario y Codex |
| [02 — Fuentes y decisiones](02-fuentes-y-decisiones.md) | Fotografía, formularios, contraste de fuentes y preguntas pendientes | Usuario, abogada, Sistemas |
| [03 — Requisitos y flujo](03-requisitos-y-flujo.md) | Síntesis de seis audios con tiempos, 36 requisitos, estados y transiciones | Codex y backend |
| [04 — Diseño y pantallas](04-diseno-y-pantallas.md) | Dirección ERP, componentes, navegación y comportamiento por pantalla | Codex/frontend |
| [05 — Arquitectura y contrato](05-arquitectura-y-contrato.md) | Entidades, persistencia, adaptadores, API propuesta, errores y límites | Codex y .NET |
| [06 — Ejecución y pruebas](06-ejecucion-y-pruebas.md) | 13 tareas con dependencias, escenarios, 29 aceptaciones y guion demo | Codex y evaluador |
| [07 — Prompt de implementación](07-prompt-para-codex.md) | Instrucción lista para iniciar la siguiente etapa | Usuario |
| [08 — Control de avance](08-control-de-avance.md) | Registro inicial de tareas y decisiones para continuar entre sesiones | Codex |

Evidencia: `transcripciones/` contiene seis transcripciones automáticas en Markdown y JSON, correspondientes a 32 minutos y 49 segundos de grabación. `fuentes/` contiene los seis formularios oficiales PDF y sus extracciones de texto, copias de la fotografía y las notas, más un manifiesto con enlaces y hashes. Los originales permanecen en la carpeta municipal de Downloads. No se incluyen datos de estas grabaciones en fixtures de la aplicación.

## Cambios imprescindibles derivados de la visita

1. **Simplificar el pre-registro:** datos declarados, domicilios actuales y contacto; retirar verificación obligatoria con tres caracteres de dirección. Identificar por separado registrante, cónyuges y representante.
2. **Revisión previa real en el mock:** recibir documentos, observarlos, subsanar el mismo caso y marcarlo apto para presentación. La presentación en Mesa de Partes es un paso posterior.
3. **Consulta protegida:** no permitir acceso a información/documentos con solo DNI; solución sencilla con verificación de contacto simulada y recuperación orientada, pendiente de acuerdo final con Sistemas.
4. **Requisitos condicionales completos:** menores y mayores por separado; declaraciones faltantes; acta reciente; tres materias de conciliación; poder especial inscrito; bienes y régimen correctamente denominados.
5. **Formularios correctos:** seis formatos descargados y revisados, cada uno ligado a su requisito. Explicar impresión, firma/huella y escaneo.
6. **Pagos por etapas:** registrar y revisar comprobantes, admitir total o parcial y evitar doble cobro. Importes de la fotografía solo como referencia demo pendiente de vigencia.
7. **Dos números de Mesa de Partes:** uno para separación y otro para la solicitud ulterior, ligados al mismo caso. Oficios posteriores con referencia DU.
8. **Audiencias presenciales:** agenda vinculada al expediente, asistencia/ratificación, acta y reprogramación. Avisos de WhatsApp simulados.
9. **Separación y divorcio ulterior:** resoluciones distintas, espera/habilitación controlada, solicitud posterior y cierre con historial; no disolución automática.
10. **Reporte mensual de resoluciones:** filtro por período/tipo, número de etapa y descarga compatible con Excel; dashboard derivado del mismo repositorio.

## Orden de ejecución para Codex

```text
Catálogos y reglas → modelo y transiciones → repositorio mock persistente
→ layout ERP → registro y revisión/subsanación
→ pagos y número SC → audiencia presencial y resolución SC
→ solicitud DU y segundo número → resolución DU y reporte mensual
→ QA integral, estados de error, accesibilidad y handoff .NET
```

La consulta ciudadana se integra en cuanto exista el ciclo de revisión/subsanación. Una única base local de demostración alimenta todas las superficies. El contrato .NET queda detrás de un adaptador reemplazable.

## Qué se hizo en esta entrega

- Inspección del código de las páginas, componentes, rutas, estilos, mocks y configuración; revisión visual de portada, bandeja y detalle.
- Build y lint exitosos sobre la base actual; ausencia de suite de pruebas identificada.
- Procesamiento local de los seis audios con marcas de tiempo y síntesis trazable.
- Lectura de notas y fotografía; consulta de web municipal; recuperación, extracción y revisión visual de sus seis PDF.
- Instalación de la skill Impeccable desde `pbakaus/impeccable`, versión declarada 4.5.0, en `C:/Users/Marcos/.codex/skills/impeccable`.
- Preparación de este plan, contrato propuesto y prompt. **No se cambió `src/`, `package.json` ni las dependencias del frontend.**

## Limitaciones explícitas

Las transcripciones tienen ruido, errores y cifras ambiguas; se han identificado los pasajes dudosos. No son una transcripción humana certificada. Tarifas/códigos TUPA, cómputos jurídicos y algunos formatos operativos necesitan confirmación de la entidad. Las respuestas pendientes no impiden implementar una demo configurable, pero no deben presentarse como decisiones oficiales.

La skill Impeccable está instalada y estará disponible para invocarla en el próximo turno. Se leyeron sus orientaciones de planificación y diseño operativo. Su lanzador automático de contexto falló en Windows con `cache_directory_failed`; no se verificaron motor ni hooks, y no se afirma que estén activos. Se puede continuar con lectura directa de este dossier y de la skill. AdminLTE se utilizó como referencia; no se instaló como dependencia.

El siguiente paso es usar [el prompt de implementación](07-prompt-para-codex.md). No es necesario volver a narrar la visita: las fuentes, decisiones y criterios están aquí. Si una regla cambia tras consultar a la municipalidad, actualizar primero su entrada Q/RF para evitar que Codex implemente versiones contradictorias.
