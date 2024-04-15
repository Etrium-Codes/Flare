const fs = require('fs');
const path = require('path');

function createLogger(namespace) {
    const debugDir = path.join(__dirname, '..', '..', 'debug');
    if (!fs.existsSync(debugDir)){
        fs.mkdirSync(debugDir, { recursive: true });
    }

    const file = path.join(debugDir, 'debug.log');

    return function(message) {
        const now = new Date();
        const time = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
        const logMessage = `[${time}] ${namespace}: ${message}\n`;

        fs.appendFile(file, logMessage, (err) => {
            if (err) {
                console.error('Error writing to log file:', err);
            }
        });

        console.log(logMessage);
    };
}

module.exports = createLogger;