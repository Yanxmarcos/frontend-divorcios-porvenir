# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Ciudadanos que solicitan separación convencional o divorcio ulterior en El Porvenir, y personal jurídico municipal que revisa documentos, registra actuaciones y da seguimiento a cada expediente.

## Product Purpose

Permitir un pre-registro remoto claro y una gestión interna trazable. La demostración debe reproducir el recorrido completo con datos ficticios y servir como contrato funcional para el backend .NET.

## Positioning

Un solo caso enlaza la revisión previa, la subsanación ciudadana, los pagos, la audiencia presencial y dos expedientes municipales distintos: separación convencional (SC) y divorcio ulterior (DU).

## Operating Context

El ciudadano prepara documentos, imprime y firma formatos, escanea, atiende observaciones y finalmente presenta originales. La abogada trabaja desde una bandeja densa, revisa versiones, registra referencias de Mesa de Partes, pagos, audiencias y resoluciones. El flujo oficial sigue siendo presencial donde corresponde.

## Capabilities and Constraints

- React, Vite, Tailwind, React Router, React Hook Form, Zod y Lucide.
- Datos y archivos demo persistentes en IndexedDB; servicios externos y envíos están simulados.
- Tarifas, códigos TUPA, plazos jurídicos y reglas institucionales pendientes se muestran como configurables y no como hechos vigentes.
- No hay conexión real con RENIEC, caja, Mesa de Partes, WhatsApp, correo, firma digital ni registros públicos.
- Solo se usan personas y documentos ficticios.

## Brand Commitments

Municipalidad Distrital de El Porvenir, logotipo existente, rojo institucional como acento y español claro. El portal conserva su identidad ciudadana; el panel interno adopta una interfaz ERP sobria inspirada en la estructura de AdminLTE, sin incorporar Bootstrap.

## Evidence on Hand

El levantamiento completo se encuentra en `docs/levantamiento-2026-10/`: seis audios, fotografía, notas, seis formatos municipales, requisitos trazables, arquitectura y criterios de aceptación.

## Product Principles

1. Una sola fuente de verdad para ciudadano y personal interno.
2. Toda acción operativa deja estado e historial verificables.
3. Las reglas no confirmadas se declaran como supuestos demo.
4. La información privada se reduce en la consulta ciudadana.
5. El diseño favorece lectura, densidad y trabajo repetitivo.

## Accessibility & Inclusion

Navegación completa con teclado, foco visible, etiquetas y errores asociados, contraste suficiente, adaptación desde 360 px y mensajes que no dependen solo del color.
