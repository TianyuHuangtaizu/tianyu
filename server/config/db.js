const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'delta_orders',
    waitForConnections: true,
    connectionLimit: 10
});

module.exports = {
    async query(sql, params) {
        const [rows] = await pool.query(sql, params);
        return rows;
    }
};
