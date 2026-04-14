# DIY App — Entornos

## App (Expo)

| Entorno | APP_VARIANT | Bundle ID | API URL |
|---|---|---|---|
| Development | development | com.diyapp.dev | http://localhost:3001 |
| Preview/Beta | preview | com.diyapp.preview | https://diy-backend-staging.up.railway.app |
| Production | production | com.diyapp.production | https://diy-backend.up.railway.app |

### Builds
```bash
# Development (simulador)
eas build --profile development --platform ios

# Beta (dispositivo real, distribución interna)
eas build --profile preview --platform ios
eas build --profile preview --platform android

# Production
eas build --profile production --platform ios
eas build --profile production --platform android
```

## Backend

| Variable | Dev | Staging | Production |
|---|---|---|---|
| PORT | 3001 | 3001 | 3001 |
| OPENAI_API_KEY | sk-dev-... | sk-staging-... | sk-prod-... |
| NODE_ENV | development | staging | production |

### Deploy
```bash
# Local
cd backend && yarn dev

# Railway (staging)
railway up --service diy-backend-staging

# Railway (production)
railway up --service diy-backend
```
