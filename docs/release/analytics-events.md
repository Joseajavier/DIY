# DIY App — Analytics Events

| Event | Cuándo | Props |
|---|---|---|
| `app_opened` | Al abrir la app | — |
| `mode_selected` | Al elegir DIY o PRO | `mode` |
| `diy_request_started` | Al pulsar "Generar proyecto" | `useAI` |
| `diy_request_succeeded` | Generación exitosa | `source` (ai/local) |
| `diy_request_failed` | Error en generación | `error` |
| `pro_request_started` | Al pulsar "Optimizar cortes" | `useAI`, `piecesCount` |
| `pro_request_succeeded` | Optimización exitosa | `source`, `boards` |
| `pro_request_failed` | Error en optimización | `error` |
| `project_saved` | Proyecto guardado en SQLite | `mode` |
| `project_reopened` | Proyecto abierto desde historial | `mode` |
| `project_deleted` | Proyecto eliminado | — |
| `project_duplicated` | Proyecto duplicado | — |
| `project_shared` | Proyecto compartido | — |
| `fallback_used` | Se usó lógica local por fallo de IA | `mode` |
| `feedback_sent` | Feedback enviado | `type` |
| `language_changed` | Idioma cambiado | `language` |
| `settings_opened` | Settings abierto | — |
