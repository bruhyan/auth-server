import Sequelize from 'sequelize';
import OTPModel from './models/otp.js';

// Sequelize connection
const sequelize = new Sequelize(process.env['DB_NAME'], process.env['DB_USER'], process.env['DB_PASSWORD'], {
    host: process.env['DB_HOST'],
    dialect: 'postgres',
    protocol: 'postgres',
    port: process.env['DB_PORT'],
    dialectOptions: {
        "ssl": {
            "require": true,
            "rejectUnauthorized": false
        }
    },
    define: {
        timestamps: false
    },

    pool: {
        max: 20,
        min: 0,
        idel: 5000
    },
    logging: false
});

const OTP = OTPModel(sequelize, Sequelize);

sequelize.sync().then(() => {
    console.log('DB and tables have been created');
});

export default OTP;