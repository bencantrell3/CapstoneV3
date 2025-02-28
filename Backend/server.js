const express = require('express')
const mysql = require('mysql2')
const cors = require('cors')
const path = require('path')
require('dotenv').config();


const app = express()

app.use(express.static(path.join(__dirname, "public")))
app.use(cors())
app.use(express.json())

const port = 3000

const db = mysql.createConnection(process.env.DB_URL);

app.listen(port, ()=>{
    console.log('listening')
})

db.connect((err) => {
    if (err) {
        console.error("Database connection failed:", err);
        return;
    }
    console.log("Connected to MySQL database");
});

app.get('/test-db', (req, res) => {
    db.query('SELECT 1 + 1 AS result', (err, result) => {
        if (err) {
            return res.status(500).send("Database query failed");
        }
        res.send("Database is working: " + JSON.stringify(result));
    });
});

// Test database connection by querying a table (e.g., 'game_data')
db.query('SELECT * FROM game LIMIT 1', (err, results) => {
    if (err) {
      console.error('Error retrieving data from database:', err);
    } else {
      console.log('Test query result:', results);
    }
  });
  