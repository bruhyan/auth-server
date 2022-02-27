import { Router } from 'express';
import nodemailer from 'nodemailer';
import { v4 as uuidv4 } from 'uuid';

import { totp } from '../totp.js';
// import { encode } from '../middlewares/crypt';
import { OTP } from '../sequelize.js';


const AddMinutesToDate = (date, minutes) => {
    return new Date(date.getTime() + minutes * 60000);
}

const router = Router();

router.post('/email/otp', async (req, res, next) => {
    try {
        const { email, type } = req.body;
        let emailSubject, emailMessage, response;

        if (!email) {
            response = { "Status": "Failure", "Details": "Email not provided" };
            return res.status(400), send(response);
        }

        if (!type) {
            response = { "Status": "Failure", "Details": "Type not provided" };
            return res.status(400), send(response);
        }

        const otp = totp(uuidv4(), { algorithm: 'sha1', digits: 6, timeStep: 30 });
        const now = new Date();
        const expirationTime = AddMinutesToDate(now, 10);

        // Create OTP in DB
        const otpInstance = await OTP.create({
            otp: otp,
            expiration_time: expirationTime
        })

    } catch (e) {

    }
})

module.exports = router;