// import {DataTypes} from 'sequelize';

// module.exports = (sequelize) => {
//     return sequelize.define('OTP', {
//         id: {
//             type: DataTypes.UUID,
//             primaryKey: true,
//             defaultValue: DataTypes.UUIDV4,
//         },
//         otp: DataTypes.STRING,
//         expiration_time: DataTypes.DATE,
//         verified: {
//             type: DataTypes.BOOLEAN,
//             defaultValue: false,
//             allowNull: true,
//         },
//         created_at: {
//             type: DataTypes.DATE,
//             allowNull: false,
//             defaultValue: sequelize.fn('now'),
//         },
//         updated_at: {
//             type: DataTypes.DATE,
//             allowNull: false,
//             defaultValue: sequelize.fn('now')
//         }
//     }, {
//             tableName: 'OTP'
//         })
//     })
// }

export default function OTP(sequelize, DataTypes) {

    return sequelize.define('OTP', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        otp: DataTypes.STRING,
        expiration_time: DataTypes.DATE,
        verified: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: true
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.fn('now')
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.fn('now')
        }
    }, {
        tableName: 'OTP'
    });

};