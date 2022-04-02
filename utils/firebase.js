const { config } = require('../config/config');
const { initializeApp } = require('firebase/app');
const { getStorage } = require('firebase/storage');

const firebaseApp = initializeApp(config.firebase);
const storage = getStorage(firebaseApp);

module.exports = { storage };