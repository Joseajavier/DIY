import { env, validateEnv } from './utils/env';
import app from './app';

validateEnv();

app.listen(env.PORT, () => {
  console.log(`DIY Backend running on http://localhost:${env.PORT}`);
  console.log(`Health: http://localhost:${env.PORT}/health`);
});
