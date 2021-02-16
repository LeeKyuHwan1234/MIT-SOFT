const { TooManyRequests } = require('http-errors')
const mysql = require('mysql')

const db_config = {
    host: 'localhost',
    port: '3306',
    user : 'root',
    password: '!pma20161496',
    database: 'quiz'
};

const db = mysql.createConnection(db_config);
handleDisconnect(db);
function handleDisconnect(client){
    client.on('error', function (error) {
        if(!error.fatal) return;
        if (error.code !== 'PROTOCOL_CONNECTION_LOST') throw error;
         console.error('> Re-connecting lost MySQL connection : '+error.stack);
         db = mysql.createConnection(client.config);
         handleDisconnect(db);
         db.connect();
    });
}

module.exports = db;