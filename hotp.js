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
 * @returns {String}
 */
// Specified by RFC4226 by the Internet Engineering Task Force (IETF)
export const hotp = (key, counter, options) => {
    const algorithm = options && options.algorithm || 'sha1';
    const numDigits = options && options.digits || 6;

    const processedCounter = processCounter(counter)
    const hmacHash = createHmac(algorithm, key).update(processedCounter).digest();

    const truncatedHmac = truncate(hmacHash, numDigits);
    return zeropad(truncatedHmac, numDigits);
}

/**
 * Make sure the counter is of desired type and length
 */
const processCounter = (counter) => {
    let buffer = Buffer.alloc(8);
    if (Number.isFinite(counter) || typeof counter === 'bigint') {
        buffer.write(zeropad(counter.toString(16)), 0, "hex");
    } else if (Buffer.isBuffer(counter)) {
        counter.copy(buffer)
    } else if (typeof counter === "string") {
        buffer.write(zeropad(counter), 0, "hex");
    } else {
        throw new Error(`Unexepected counter value of type ${typeof counter}`)
    }
    return buffer
}

/**
 * Specified by RFC4226 by the Internet Engineering Task Force (IETF)
 * The purpose of dynamic offset truncation technique is to extract a 4-byte dynamic
 * binary code from a 160-bit (20-byte) HMAC-SHA-1 result.
 * More information at RFC4226
 **/
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
