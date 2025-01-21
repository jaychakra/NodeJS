const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/bookRoutes');

const app = express();

app.use(express.json());
app.use('/books', userRoutes);

module.exports = app;