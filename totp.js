import { hotp } from "./hotp.js";

/**
 * @param {Buffer | String} key 
 * @param {Object} [options]
 * @param {Number} [options.algorithm='sha1']
 * @param {Number} [options.digits=6]
 * @param {Number} [options.time=(Date.now() / 1000)]
 * @param {Number} [options.timeStep=30]
 * @param {Number} [options.t0=0]
 * @returns {String}
 * 
 * totp builds on top of hotp but with a time-based counter.
 * As the server and client both have access to time, no need to keep track of counter.
 * Using Unix timestamp, which is independent of time zones.
 * However, since Unix time is defined in seconds and we don't want our counter to change
 * every second, we extend the time interval to 30s (Google Authenticator)
 */
export const totp = (key, options) => {
    const time = options && options.time ?
        options.time : Date.now() / 1000; //current unix timestamp in seconds

    const timeStep = options && options.timeStep ?
        options.timeStep : 30;

    const t0 = options && options.t0 ?
        options.t0 : 0;

    const digits = options && options.digits ?
        options.digits : 6;

    const algorithm = options && options.algorithm ?
        options.algorithm : 'sha1';

    const timeCounter = getTimeCounter(time, t0, timeStep);

    console.log('timeC ', timeCounter)

    return hotp(key, timeCounter, { algorithm, digits });
}

const getTimeCounter = (time, t0, timeStep) => {
    return Math.floor((time - t0) / timeStep)
}