const dotenv = require('dotenv');

dotenv.config();

const env = {
  baseUrl: process.env.BASE_URL || 'https://trade.multibank.io',
  loginPath: process.env.LOGIN_PATH || '/login?next=/',
  username: process.env.MB_USERNAME || 'candidate@example.com',
  password: process.env.MB_PASSWORD || 'ChangeMe123!',
  apiBaseUrl: process.env.API_BASE_URL || 'https://trade.multibank.io',
};

module.exports = { env };
