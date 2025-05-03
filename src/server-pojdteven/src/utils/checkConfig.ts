import config from 'config';

const configKeys: string[] = [
  'jwt.secret',
  'jwt.expiresIn',
  'db.host',
  'db.port',
  'db.user',
  'db.password',
  'db.database',
  'payment.defaultAccount',
  'payment.defaultVariableSymbol',
  'email.user',
  'email.sendGrid_api_key',
  'frontendDomain',
  'backendDomain',
];

export function checkConfig() {
  for (const key of configKeys) {
    if (!config.get(key)) {
      console.error(`FATAL ERROR: config key ${key} is not set.`);
      process.exit(1);
    }
  }
}
