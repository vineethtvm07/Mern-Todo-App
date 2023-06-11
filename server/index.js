const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const connectDb = require('./config/db');
const todoRoute = require('./routes/todo');
require('dotenv').config()


const app = express();
app.use(express.json());
app.use(cors());

connectDb();

app.use('/todos', todoRoute)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`Server started on port http://localhost:${PORT}`) );
