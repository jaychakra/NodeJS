const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

// Create an in-memory SQLite database
const db = new sqlite3.Database(":memory:");

// Create sample tables and populate data
db.serialize(() => {
    // Create tables
    db.run("CREATE TABLE users (id INTEGER PRIMARY KEY, username TEXT, password TEXT)");
    db.run("CREATE TABLE books (id INTEGER PRIMARY KEY, title TEXT, author TEXT, owner_id INTEGER)");
  
    // Insert users
    db.run(`INSERT INTO users (username, password) VALUES 
      ('chetanbhagat', 'password123'), 
      ('amishtripathi', 'ramayana2023'), 
      ('arundhatiroy', 'godofsmallthings'), 
      ('ruskinbond', 'bond1234'), 
      ('rabindranathtagore', 'nobel1913')
    `);
  
    // Insert books
    db.run(`INSERT INTO books (title, author, owner_id) VALUES 
      ('Five Point Someone', 'Chetan Bhagat', 1), 
      ('The Immortals of Meluha', 'Amish Tripathi', 2), 
      ('The God of Small Things', 'Arundhati Roy', 3), 
      ('The Room on the Roof', 'Ruskin Bond', 4), 
      ('Gitanjali', 'Rabindranath Tagore', 5), 
      ('Train to Pakistan', 'Khushwant Singh', 4), 
      ('Malgudi Days', 'R. K. Narayan', 3)
    `);
  });

// Vulnerable login endpoint
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  // Vulnerable SQL query
  const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;

  db.all(query, (err, rows) => {
    if (err) {
      return res.status(500).send("Database error");
    }
    if (rows.length > 0) {
      res.send("Login successful");
    } else {
      res.status(401).send("Invalid credentials");
    }
  });
});

// Vulnerable search endpoint
app.get("/search", (req, res) => {
  const { searchTerm } = req.query;

  // Vulnerable SQL query
  const query = `SELECT * FROM books WHERE title LIKE '%${searchTerm}%'`;

  db.all(query, (err, rows) => {
    if (err) {
      return res.status(500).send("Database error");
    }
    res.json(rows);
  });
});

// Vulnerable books endpoint for exfiltration
app.get("/books", (req, res) => {
  const { filter } = req.query;

  // Vulnerable SQL query
  const query = `SELECT * FROM books WHERE id = ${filter}`;

  db.all(query, (err, rows) => {
    if (err) {
      return res.status(500).send("Database error");
    }
    res.json(rows);
  });
});

// Start the server
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});