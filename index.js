import { hotp } from './hotp.js';
import { totp } from './totp.js';
import { v4 as uuidv4 } from 'uuid';
import sendOtpToEmail from './routes/sendOTP_to_email.js';

console.log(totp(uuidv4(), { algorithm: 'sha1', digits: 6, timeStep: 30 }));

import 'dotenv/config';
import express from 'express';
import path from 'path';
import helmet from 'helmet';
import logger from 'morgan'
import cors from 'cors';

const app = express();

const port = process.env.PORT || 4500;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const corsOption = {
    origin: "*",
    methods: "GET, HEAD, PUT, PATCH, POST, DELETE",
    credentials: true,
    exposeHeaders: ["x-auth-token"]
}
app.use(cors(corsOption));

app.use(logger('common'));

app.use('/api/v1/', sendOtpToEmail);

app.get('/', (req, res) => {
    res.send("server is live");
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})
