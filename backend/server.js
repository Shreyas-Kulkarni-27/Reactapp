const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Maharaj2712@",
    database: "UserDB"
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database');
});

app.post('/login', (req, res) => {
    const sql = "INSERT INTO Users (name, email, password) VALUES (?, ?, ?)";
    
    const { name, email, password } = req.body;
    db.query(sql, [name, email, password], (err, data) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).json("Error inserting data into the database");
        }
        return res.status(200).json("Data submission success");
    });
});

app.post('/notes', (req, res) => {
    const sql = "INSERT INTO Notes (message, date, day, alert) VALUES ?";
    const values = req.body.cards.map(card => [card.message, card.date, card.day, card.alert]);
    
    db.query(sql, [values], (err, data) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).json("Error inserting data into the database");
        }
        return res.status(200).json("Data submission success");
    });
});

app.get('/view', (req,res) =>{
    const sql = "SELECT * FROM Notes";
    db.query(sql,  (err,data) =>{
        if (err) {
            console.log('Error occured:', err)
            return res.status(500).json("Error occured while retreiving");
        }
        return res.status(200).json(data);
    });
});

app.listen(8080, () => {
    console.log("Listening on port 8080...");
});
