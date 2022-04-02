const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const config = {
    DBhost: process.env.DB_HOST,
    DBusername: process.env.DB_USER,
    DBpassword: process.env.DB_PASSWORD,
    DBdatabase: process.env.DB,
    DBport: process.env.PORT,
    JWTexpire: process.env.JWT_EXPIRES_IN,
    JWTsecret: process.env.JWT_SECRET,
    firebase: {
        apiKey: process.env.FIREBASE_API_KEY,
        authDomain: process.env.FIREBASE_AUTH_DOMAIN,
        projectId: process.env.FIREBASE_PROJECT_ID,
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.FIREBASE_MESSAGE,
        appId: process.env.FIREBASE_APP_ID,
        measurementId: process.env.FIREBASE_MEASUREMENT_ID
    }
}

module.exports = { config }