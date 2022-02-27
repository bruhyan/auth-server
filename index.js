import { hotp } from './hotp.js';
import { totp } from './totp.js';

// console.log('hash for auth')

// console.log(hotp('message', 'counter1', { algorithm: 'sha1', digits: 6 }));
// console.log(totp('message', { algorithm: 'sha1', digits: 6, timeStep: 30 }));

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

app.get('/', (req, res) => {
    res.send("server is live");
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})
