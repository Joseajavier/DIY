# Fase 21 — Presupuestos Pro y Facturación Legal (ES)

> Apuntada tras feedback externo (ChatGPT) sobre Verifactu e integración de
> facturación para carpinteros profesionales en España. Redefinida para
> entrar por la puerta correcta: **no meter Verifactu propio hasta tener
> volumen**; ir primero de **Presupuestos → Partner fiscal certificado**.

---

## Principio rector

> "Redefinir el módulo como **Presupuestos y control de trabajos**, no
> como facturación, hasta tener integración fiscal real."

La facturación legal en España (RD 1007/2023, Verifactu) es un marrón
regulatorio y de certificación. No vale la pena construir motor propio
sin una señal clara de mercado (~700 premiums activos) ni sin cerrar
antes partner con proveedor homologado.

---

## Roadmap en 4 fases

### Fase 21A — Presupuestos Pro (3 semanas)

**Obsesión:** Modo Pro → presupuesto automático a partir del proyecto.

- Entidades nuevas: `Client`, `Quote`, `QuoteLine`, `WorkOrder`.
- Pantallas:
  - `QuotesScreen` (listado).
  - `QuoteEditorScreen` (líneas + cliente + IVA + condiciones).
  - `QuotePreviewScreen` (PDF cliente, sin validez fiscal).
  - `ClientsScreen`.
- Generador automático desde proyecto paramétrico:
  `Quote.lines = pieces + materials + mano de obra (€/h × horas)`.
- Export PDF marcado visiblemente como **"Presupuesto — no es factura"**.
- Envío por mail/WhatsApp vía `expo-sharing`.

**KPI de salida:** ≥ 30% de proyectos Pro terminan en presupuesto enviado.

---

### Fase 21B — Control de trabajos (2 semanas)

- Estados de `WorkOrder`: borrador · enviado · aceptado · en curso · completado · cobrado.
- Hoja de partes: horas, materiales consumidos, fotos de obra.
- Cálculo margen real: presupuestado vs. consumido.
- Notificaciones de hitos (aceptado, vencimiento pago).

---

### Fase 21C — Facturación legal vía Partner (4-6 semanas)

**Partner preferente:** FacturaDirecta (OAuth2 + sandbox + posible embedding).

- Onboarding: usuario conecta su cuenta fiscal existente o crea una
  nueva dentro de la app.
- Conversión `Quote → Invoice` con un solo tap.
- La app nunca toca la AEAT directamente. Toda la parte certificada
  (hash encadenado, registros Verifactu, QR, VeriFactu-friendly)
  la hace el partner.
- Si el partner falla o el usuario no conecta cuenta → se queda en
  modo "Presupuestos", no se bloquea el resto de la app.

**Antes de escribir código:** negociar términos comerciales (revshare,
comisión por cliente referido, % de comisión sobre suscripción).

---

### Fase 21D — Motor propio (condicional, ≥12 meses)

Solo si:
- ≥ 700 usuarios premium activos en el plan facturación.
- Margen demostradamente frenado por el partner.
- Product-market fit claro en el segmento facturación.

Entonces evaluar implementar Verifactu propio (alto coste fiscal + certificación).

---

## Pricing propuesto

| Plan | Precio | Incluye |
|---|---|---|
| **Free** | 0 € | DIY + calculadoras + generador básico |
| **Pro Obras** | 6,90 €/mes | Presupuestos + clientes + control de trabajos (sin factura legal) |
| **Pro Facturación Legal** | 14,90 €/mes | Pro Obras + integración partner (facturas con validez fiscal) |

Descuento anual -20% en ambos planes Pro.

**Paywall estratégico:**
- Generador paramétrico → Free (gancho).
- Guardar proyecto → Free con límite (3 proyectos).
- Presupuesto → Pro Obras.
- Factura legal → Pro Facturación.

---

## Entidades y endpoints (borrador)

### Entidades nuevas
```ts
Client { id, name, nif, email, phone, address }
Quote {
  id, projectId, clientId, number, date, validUntil,
  lines: QuoteLine[], subtotal, tax, total, status, notes
}
QuoteLine { id, concept, quantity, unit, unitPrice, tax, total }
WorkOrder { id, quoteId, status, startDate, endDate, actualHours, actualCosts }
Invoice { id, quoteId, externalId, externalProvider, legalStatus, qrUrl, pdfUrl }
```

### Endpoints partner (FacturaDirecta — estimado)
```
POST   /oauth/token                    ← cliente obtiene token
POST   /api/v1/invoices                ← crear factura desde Quote
GET    /api/v1/invoices/:id            ← estado + QR + URL PDF
GET    /api/v1/invoices/:id/pdf        ← descargar
POST   /api/v1/clients                 ← alta cliente
```

---

## Riesgos y mitigaciones

- **Certificación Verifactu:** solo se toca si llega Fase 21D. Hasta
  entonces, toda la validez legal recae en el partner.
- **Bloqueo por dependencia de partner:** diseñar entidades `Invoice`
  con provider abstraído para poder cambiar en el futuro.
- **Adopción baja:** medir en Fase 21A KPI de envío de presupuestos
  antes de gastar en 21B/21C.

---

## Estado: 📝 APUNTADO — sin empezar

Esta fase entra en backlog. El usuario decide cuándo priorizar.
Prerrequisito suave: tener el generador paramétrico y la
optimización de cortes suficientemente pulidos para que el "presupuesto
automático desde proyecto" tenga carne.
