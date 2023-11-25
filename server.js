require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
const mongoose = require('mongoose');

const port = process.env.PORT || 3000;
const dbURI = process.env.DATABASE_URI; 

mongoose.connect(dbURI)
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

app.use(express.json());

const supplierRouter = require('./routes/suppliers');
app.use('/api/suppliers', supplierRouter);

const productRouter = require('./routes/products');
app.use('/api/products', productRouter);

app.listen(port, () => console.log('Server Started'));