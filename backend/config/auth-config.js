const crypto = require('crypto');

const randomBytes = crypto.randomBytes(32);
const randomHex = randomBytes.toString('hex');
const port = process.env.PORT || 3000;

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: randomHex,
  baseURL: `http://localhost:${port}`,
  clientID: 'eOJ16yKyYgnzxZCky0Tsob1f6h7OLaAl',
  issuerBaseURL: 'https://dev-byh400on787b1fda.us.auth0.com'
};

module.exports = config; 