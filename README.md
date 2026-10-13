# Frontend de separación y divorcio — El Porvenir

Demostración funcional del portal ciudadano y del panel jurídico. Trabaja con datos ficticios y sirve como referencia funcional para los futuros endpoints .NET.

## Ejecutar

```bash
npm install
npm run dev
```

Comprobaciones:

```bash
npm test
npm run lint
npm run build
```

Acceso interno: `abogada@demo.test` / `Municipal2026`.

Consulta ciudadana: `TRA-DEMO-2026-0001`, DNI `70112233`, correo `ana@example.test` y código `246810`.

## Alcance

El estado se conserva en IndexedDB, incluidos los archivos cargados. Pre-registro, consulta, bandeja, detalle, pagos, audiencias, resoluciones, dashboard y reportes leen la misma fuente.

La aplicación simula revisión y subsanación, referencias municipales separadas SC/DU, pagos por etapa, audiencia presencial, resolución de separación, habilitación ulterior, resolución final y reporte mensual CSV. No se conecta con RENIEC, caja, Mesa de Partes, WhatsApp, correo, firma digital ni registros públicos.

Las tarifas y códigos son valores demo pendientes de confirmación. El dossier completo está en [docs/levantamiento-2026-10/README.md](docs/levantamiento-2026-10/README.md).

## Estructura

- `src/domain/`: catálogos y reglas compartidas.
- `src/services/mock/`: IndexedDB y escenarios iniciales.
- `src/context/`: sesión y operaciones demo.
- `src/pages/public/`: portal, pre-registro y consulta protegida.
- `src/pages/admin/`: operaciones jurídicas.
- `public/formats/`: seis formularios municipales.
- `tests/`: pruebas de requisitos, pagos, agenda y privacidad.

El historial del repositorio conserva la autoría del equipo. Esta implementación se realizó sobre la base auditada `99469d9`.
