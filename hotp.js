/**
 * Reference to HMAC-Based One-Time Password (HOTP)
 * https://www.freecodecamp.org/news/how-time-based-one-time-passwords-work-and-why-you-should-use-them-in-your-app-fdd2b9ed43c3/
 * https://github.com/jhermsmeier/node-hotp/blob/master/lib/hotp.js
 */

import { createHmac } from "crypto";

/**
 * 
 * @param {Buffer | String} key 
 * @param {Buffer | String | Number} counter 
 * @param {Object} [options]
 * @param {String}  [options.algorithm='sha1']
 * @param {Number} [options.digits=6]
 * @returns {String} token
 */

export const hotp = (key, counter, options) => {
    const algorithm = options && options.algorithm || 'sha1';
    const numDigits = options && options.digits || 6;

    const hmacHash = createHmac(algorithm, key).update(counter).digest();

    const truncatedHmac = truncate(hmacHash, numDigits);
    return zeropad(truncatedHmac, numDigits);
}

const getCounter = (value) => {

}

// Specified by RFC
const truncate = (hmac, digits) => {
    let offset = hmac[hmac.length - 1] & 0x0F;
    const value = (hmac[offset + 0] & 0x7F) << 24 |
        (hmac[offset + 1] & 0xFF) << 16 |
        (hmac[offset + 2] & 0xFF) << 8 |
        (hmac[offset + 3] & 0xFF);

    return value % (10 ** digits)
}

const zeropad = (value, digits = 16) => {
    const fill = '0'.repeat(digits);
    return (fill + value).slice(-digits);
}
