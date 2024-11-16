import mysql from 'mysql2';

// Create a connection pool to the MySQL database
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',  // Your MySQL username (default: root)
    password: 'root',  // Your MySQL password (default is empty for MAMP Pro)
    database: 'next_chat_app',  // The name of the database you created
});

// Use a promise wrapper to handle async calls
const promisePool = pool.promise();

export default promisePool;
