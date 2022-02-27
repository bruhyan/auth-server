import { hotp } from './hotp.js';
import { totp } from './totp.js';

console.log('hash for auth')

console.log(hotp('message', 'counter1', { algorithm: 'sha1', digits: 6 }));
console.log(totp('message', { algorithm: 'sha1', digits: 6, timeStep: 30 }));