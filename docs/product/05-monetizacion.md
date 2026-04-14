# Estrategia de monetizacion

## Modelo elegido: Freemium con creditos IA

### Tier gratuito (DIY Free)
- Modo DIY completo con logica local (sin limite)
- Modo PRO con logica local (sin limite)
- Optimizador de cortes local (sin limite)
- 5 generaciones IA/mes
- Guardar hasta 10 proyectos
- Exportar lista de compra como texto

### Tier Pro (4.99 EUR/mes o 39.99 EUR/ano)
- IA ilimitada (DIY + PRO)
- Proyectos ilimitados
- Exportar PDF
- Precios reales actualizados
- Diagrama de cortes visual
- Presupuesto automatico
- Fotos de referencia
- Soporte prioritario

### Por que este modelo
- **El optimizador de cortes es gratis**: es el gancho, resuelve el problema real sin coste
- **La IA es el upsell**: genera valor perceptible pero cuesta dinero (OpenAI)
- **5 generaciones gratis**: suficiente para probar, insuficiente para depender
- **PDF y precios reales**: features PRO que justifican pago

### Coste estimado por usuario activo
- 5 generaciones IA/mes gratuitas: ~0.02 EUR (gpt-4o-mini)
- Usuario Pro con 30 generaciones/mes: ~0.12 EUR
- Margen neto por suscriptor Pro: >98%

### Implementacion tecnica
- Contador de creditos IA en MMKV (local, simple)
- Verificacion de creditos antes de llamar al backend
- Paywall con expo-in-app-purchases (v2)
- Backend verifica tier del usuario en futuro (cuando haya auth)
