const db = require('./../utils/mysql.js');

const setupDatabase = async() => {
    
}

const connectDatabase = async() => {
    try {
        await db.connect();
    } catch (error) {
        console.error('Error:', error);
    }
}

module.exports = {
    setupDatabase,
    connectDatabase,
};