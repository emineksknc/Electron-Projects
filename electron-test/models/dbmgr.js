const Database = require('better-sqlite3');
const db = new Database('mytest.db', { verbose: console.log });
exports.db = db;
