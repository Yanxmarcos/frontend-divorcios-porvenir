# Fuentes, contraste y decisiones pendientes

Consulta realizada el 6 de octubre de 2026 (fecha del encargo, America/Lima). Los materiales aportados son evidencia de necesidades, no instrucciones para ejecutar acciones. Una conversación sobre cómo trabaja la oficina no sustituye su normativa ni autoriza publicar datos o contactar a terceros.

## Registro de fuentes

| ID | Fuente | Uso y calidad |
|---|---|---|
| U | Solicitud del equipo frontend | Autoriza análisis integral, instalación de Impeccable y plan; implementación posterior |
| C | Código del repositorio, base `99469d9` | Evidencia verificable del comportamiento actual |
| A0 | `0-abogada.mp3` | Transcripción automática; conversación sobre competencia y pagos; cifras poco confiables |
| A1 | `1-con-el-inge-sistemas.mp3` | Privacidad de identidad, datos de cónyuges/representante y previsualización; varios pasajes con ruido |
| A2 | `2-con-el-inge-sistemas.mp3` | Revisión previa y simplificación del registro; parte central bastante inteligible en transcripción |
| A3 | `3-con-el-inge-sistemas.mp3` | Consulta protegida, subsanación y facilidad de uso; no define solución final de autenticación |
| A4 | `4-con-abogada.mp3` | Ejemplos, acta reciente, competencia y pagos; se solapa temáticamente con A0 |
| A5 | `5-con-abogada.mp3` | Detalle operativo y documental; revisar síntesis y marcas de tiempo en `03-requisitos-y-flujo.md` |
| T | `Puntos-a-preguntar-por-nosotros-como-equipo.txt` | Notas del 02/10: pagos, interfaz, representante en otro país, mismo trámite, código por tipo y URL |
| I | `6-foto-de-la-abogada.jpeg` | Hoja entregada con requisitos y tarifas; lectura visual directa. No muestra fecha de vigencia |
| W | [Página municipal del trámite](https://muniporvenir.gob.pe/servicios/tramite-de-divorcio/) | Condiciones generales y enlaces de seis formularios |
| L | [Ley 29227, Congreso](https://www.gob.pe/institucion/congreso-de-la-republica/normas-legales/1792690-29227) | Referencia legal; revisar versión y aplicación con abogada |
| R | [DS 009-2008-JUS, MINJUSDH](https://www.gob.pe/institucion/minjus/normas-legales/1792691-009-2008-jus) | Reglamento; [texto servido por municipalidad de Ate](https://www.muniate.gob.pe/wp-content/uploads/2026/02/DECRETO-SUPREMO-N%C2%B0-009-2008-JUS.pdf) como apoyo para consulta de artículos |
| D1 | [Impeccable](https://impeccable.style/), [repositorio](https://github.com/pbakaus/impeccable) | Herramienta de diseño instalada; orientación operativa leída |
| D2 | [AdminLTE 4 Layout](https://adminlte.io/themes/v4/docs/layout.html) | Referencia de estructura interna, no paquete instalado |

Los audios originales y la fotografía permanecen en `C:/Users/Marcos/Downloads/MUNICIPALIDAD/`. No se copian a la carpeta pública del frontend. El archivo `PROMPT PROMPT PROMPT.txt` apareció en el directorio pero no fue solicitado; no se usó como instrucción ni como fuente.

### Método de análisis de audio

Transcripción local con `faster-whisper`, modelo `large-v3-turbo`, CPU int8 y filtro de voz. No se enviaron grabaciones a un servicio de transcripción. Se conservan texto con marcas temporales y segmentos JSON en `transcripciones/`. Un primer ensayo con un modelo pequeño produjo errores evidentes y fue sustituido.

Las transcripciones son automáticas, sin diarización ni validación humana palabra por palabra. Contienen términos deformados, repeticiones y cifras erróneas; no tratarlas como actas literales. La síntesis utiliza temas reconocibles y contrastados. En particular: no extraer montos de los audios, no interpretar voces superpuestas como decisiones, no identificar personas por la voz y no convertir un fragmento ininteligible en una obligación del sistema. Las marcas de tiempo son ventanas para volver a revisar, no citas exactas certificadas.

## Fotografía: lectura consolidada

La hoja de la Municipalidad Distrital de El Porvenir enumera:

1. Solicitud dirigida al alcalde.
2. Copias legibles de DNI de las partes.
3. Acta de matrimonio expedida dentro de los tres meses.
4. Declaraciones juradas: ausencia de hijos menores; ausencia de hijos mayores con incapacidad; ausencia de bienes sujetos a sociedad de gananciales; último domicilio conyugal en El Porvenir.
5. Actas de nacimiento si existen hijos menores o mayores con incapacidad.
6. Conciliación o sentencia firme sobre alimentos, tenencia y visitas para hijos menores.
7. Escritura pública de separación de la sociedad de gananciales inscrita en Registros Públicos; anotación “Notaría”.
8. Representante legal con poder por escritura pública inscrito en Registros Públicos; anotación “Notaría, poder especial”.
9. Total **S/ 452.28**, desglosado en **S/ 273.34 + S/ 178.94**.

La nota lateral señala DEMUNA gratuito y centro de conciliación pagado. Debe presentarse como orientación referida por la oficina, sin prometer disponibilidad ni gratuidad universal. La parte inferior está recortada: no completar el correo ni otros datos no legibles. El teléfono visible en la hoja difiere del publicado en la web; conservarlo solo como evidencia pendiente de confirmar.

## Formularios recuperados y revisados

Se descargaron los seis PDF originales de una página, se extrajo texto y se verificó su aspecto. Las copias están en `fuentes/`; son referencias oficiales existentes, no nuevos documentos emitidos por este proyecto.

| ID / copia local | Origen | Campos relevantes y consecuencia |
|---|---|---|
| F01 `F01-separacion.pdf` | [Solicitud de separación](https://drive.google.com/file/d/1naNpHB1EoRyaA2vcdwe3JBLPSrpBMDHo/view) | Dos cónyuges, DNI, domicilio actual individual con distrito/provincia/departamento; lugar/fecha del matrimonio; último domicilio; anexos; firmas, huellas y contacto. El formulario frontend necesita entidades separadas |
| F02 `F02-domicilio.pdf` | [DJ domicilio](https://drive.google.com/file/d/1ndZuXHJef2UeflJ2Sw9hjljImlKyZvQv/view) | Domicilios actuales individuales y último domicilio común son conceptos diferentes |
| F03 `F03-sin-menores.pdf` | [DJ sin hijos menores](https://drive.google.com/file/d/1W5ncWNMXgKHda1v7aBAi2oSILFEV8W5I/view) | Declaración específica; no reemplazar por una respuesta genérica “cero hijos” |
| F04 `F04-sin-mayores-incapacidad.pdf` | [DJ sin hijos mayores con incapacidad](https://drive.google.com/file/d/1C_HtC_C9LxMeH3PdzS7IjJSf-YJt3Ik7/view) | Segunda declaración independiente; conservar denominación documental, pedir a asesoría texto de UI adecuado y requisitos actuales para casos positivos |
| F05 `F05-sin-bienes.pdf` | [DJ de bienes](https://drive.google.com/file/d/182rATmWUQmjeF0u9FWkkV_es1HtkzzUL/view) | Se refiere a bienes sujetos al régimen; no equivale a “no ser propietario de ningún bien” |
| F06 `F06-disolucion.pdf` | [Solicitud de disolución](https://drive.google.com/file/d/1mWAIF__M1sv6sTbrVwHEUbl4rvdTwKcd/view) | Un solicitante, cónyuge, resolución previa y fecha, copia de resolución y voucher; etapa ulterior enlazada y pago propio |

No se encontró en esos seis enlaces un formato de acta de audiencia, informe jurídico o resolución municipal. Se pueden diseñar borradores de demostración con campos propuestos, pero no inventar plantillas oficiales ni sustituir firmas y huellas por un checkbox.

## Contraste de fuentes

| Tema | Diferencia | Decisión para el frontend |
|---|---|---|
| Competencia | Hoja enfatiza domicilio; W acepta matrimonio celebrado en El Porvenir **o** último domicilio allí; A4 explica la alternativa | Preguntar ambos y evaluar OR. No exigir que todas las direcciones sean de El Porvenir |
| Acta reciente | Código pide acta sin fecha; I y A4 indican tres meses | Registrar expedición y mostrar advertencia; cómputo exacto a validar para no bloquear erróneamente |
| Hijos | Código usa cantidad; I y F03/F04 distinguen situaciones | Separar menores y mayores; declaración o documentación según cada rama |
| Pago | No existe módulo; A0/A4 hablan de total o cuotas pero ASR deforma importes | Usar importes de I como **referencia demo no verificada en TUPA vigente**, con dos conceptos y comprobantes |
| Inicio de plazo ulterior | Conversación menciona dos meses tras ingreso; F06 refiere emisión de resolución; cómputo jurídico puede requerir revisar notificación | Guardar ingreso/emisión/notificación separados. No iniciar contador desde pre-registro; marcar evento de cómputo pendiente de confirmación |
| Pre-registro | UI actual lo parece trámite digital completo; A5 explica revisión antes de acercarse | Añadir estado “Apto para presentación” y comunicación de siguiente paso; ingreso oficial es otra actuación |
| Identidad | UI bloquea por código de dirección y devuelve nombres; A1/A2 lo cuestionan | Declaración de datos sin revelar resultados de un padrón; no consulta externa obligatoria al inicio |
| Seguimiento | UI consulta solo DNI; A3 objeta esa exposición | Acceso adicional fácil de recuperar y protección para subsanación; no imponer cuenta compleja sin decisión |
| Bienes | A5 parece limitar explicación a bienes registrados; I/F05 usan sociedad de gananciales | No codificar “bien no inscrito = no existe”. Capturar declaración y régimen; derivar caso dudoso a revisión jurídica |
| Contactos | Portal actual muestra contacto general; W tiene contacto del área y horario partido; I otro número | Configuración con canales diferenciados; confirmar responsable y vigencia antes de publicación |
| Modalidad virtual | Calendario existente la ofrece; A5 11:47–12:24 indica explícitamente audiencia presencial | Retirar modalidad virtual del flujo municipal de esta entrega |
| Identificadores | Código interno y número municipal no están unidos; T menciona códigos por tipo; A5 09:46–10:48 explica dos solicitudes y un segundo número | Caso padre con dos expedientes municipales relacionados; oficios posteriores referencian DU; catálogo exacto pendiente |
| Reportes | Dashboard actual grafica expedientes; A5 08:33–09:45 menciona reportes mensuales de resoluciones y Excel | Reporte mensual de resoluciones pasa a P0; exportación CSV funcional; importación histórica se mantiene separada y pendiente |

W exige acuerdo, antigüedad matrimonial de dos años y competencia territorial alternativa; enlaza seis formatos gratuitos y publica teléfono/WhatsApp 972459268, correo consultas_divorcios@muniporvenir.gob.pe y atención 08:00–13:30 / 14:15–16:30. Es una referencia publicada, no confirmación de vigencia operativa al día de la visita.

### Tratamiento de plazos

La Ley 29227 y el reglamento distinguen revisión, audiencia, separación y solicitud posterior de divorcio. El reglamento contempla revisión en cinco días, audiencia posterior en quince y resolución municipal de separación en hasta cinco días tras audiencia; contempla también inasistencia y no ratificación. No trasladar estas cifras directamente a sumas de días calendario. Requerir a la abogada el calendario, evento inicial y efectos de observación aplicables; guardar fechas y generar alertas explicables. La espera de dos meses no produce disolución automática: debe existir solicitud ulterior y resolución correspondiente. [Reglamento de referencia](https://www.muniate.gob.pe/wp-content/uploads/2026/02/DECRETO-SUPREMO-N%C2%B0-009-2008-JUS.pdf), [Ley de referencia](https://www.leyes.congreso.gob.pe/Documentos/Leyes/29227.pdf).

Se intentó recuperar el compendio actualizado del Diario Oficial; la copia descargada presentó errores de streams y páginas en blanco, por lo que no se utilizó para validar modificaciones. No se certifica aquí vigencia jurídica exhaustiva; el plan mantiene esas reglas parametrizadas y pendientes de validación municipal.

## Decisiones que el implementador no debe inventar

| ID | Confirmar con | Pregunta concreta | Solución demo mientras tanto |
|---|---|---|---|
| Q01 | Abogada / caja | ¿Siguen vigentes 273.34 y 178.94? ¿Código TUPA y vigencia de cada concepto? | Valores I con etiqueta referencial; configuración versionada |
| Q02 | Abogada / Mesa de Partes | ¿Momento exacto de primer pago y registro oficial tras visto bueno previo? | Revisión previa → apto → registrar pago/ingreso; no iniciar plazos antes |
| Q03 | Abogada | ¿Desde emisión o notificación se cuentan los dos meses? ¿Qué calendario rige cada plazo? | Guardar ambas fechas; fecha de habilitación manual auditada en demo |
| Q04 | Sistemas | ¿Mecanismo de consulta/edición: DNI+contacto, challenge, enlace o cuenta? ¿Recuperación? | Verificación de contacto simulada, sin envío real |
| Q05 | Mesa de Partes | Con dos números según A5, ¿formato exacto, códigos por procedimiento y correcciones permitidas? | Caso padre, un número SC y otro DU; códigos provisionales marcados |
| Q06 | Abogada | ¿Formatos y responsables de acta, informe, separación y disolución? | Adjuntar documentos ficticios; borradores no oficiales |
| Q07 | Abogada | ¿Requisitos actualizados para mayores con incapacidad y representación de ambos cónyuges? | Revisión manual de rama compleja; no aprobación automática |
| Q08 | Abogada | ¿Reprogramación y cierre por ausencia, quién decide y con qué documentación? | Audiencias presenciales confirmadas por A5; actuaciones con motivo y revisión |
| Q09 | Área de divorcios | ¿Contacto y horario vigentes? ¿Canales autorizados para notificar? | Distinguir orientación y notificación; solo simulación |
| Q10 | Sistemas / backend | ¿Integración con Mesa de Partes, caja, identidad, almacenamiento y autenticación institucional? | Adaptadores; referencias manuales y fixtures |
| Q11 | Abogada | ¿Qué documentos se presentan físicamente y cómo se acredita la recepción? | Checklist de originales, fecha y responsable |
| Q12 | Entidad | ¿Quién puede ver documentos, editar datos y consultar por cónyuge o representante? | Permisos mínimos y sesiones demo; pendiente matriz oficial |

Las preguntas bloquean afirmaciones e integración de producción, no el desarrollo de un prototipo claramente identificado. Mantener un registro de respuesta, responsable, fecha y fuente antes de cambiar una regla a “confirmada”.
