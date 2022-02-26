import { createHmac } from 'crypto';
import { hotp } from './hotp.js';

console.log('hash for auth')
const message = 'helloworld1';
const secret = 'secret'; //find a good way to generate this secret key
const encryptionMethod = 'sha256';
const base = 'base64';

console.log(hotp('message', 'counter1', { algorithm: 'sha1', digits: 6 }))