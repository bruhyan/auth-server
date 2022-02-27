import crypto from 'crypto';

const digits = '01234567890';
const lowerCaseAlphabets = 'abcdefghijklmnopqrstuvwxyz';
const upperCaseAlphabets = lowerCaseAlphabets.toUpperCase();
const specialChars = '#!$@';

export const generate = (length, options) => {
    length = length || 6;
    const generatorOptions = options || generateOptions();

    const allowedChars = ((generatorOptions.hasDigits || '') && digits) +
        ((generatorOptions.hasLowerCaseAlphabets || '') && lowerCaseAlphabets) +
        ((generatorOptions.hasUpperCaseAlphabets || '') && upperCaseAlphabets) +
        ((generatorOptions.hasSpecialChars || '') && specialChars);

    let value = '';

    while (value.length < length) {
        const charIndex = i
        value += allowedChars[charIndex];
    }

    return value;
}

const generateOptions = () => {
    return {
        hasDigits: true,
        hasLowerCaseAlphabets: false,
        hasUpperCaseAlphabets: false,
        hasSpecialChars: false
    }
}