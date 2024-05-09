// server.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDb = require('./config/config');

dotenv.config();
connectDb();

const app = express();

app.use(cors());
app.use(express.json());   
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api/patient", require('./routes/patientRoute'));
app.use("/api/appManager", require('./routes/appManagerRoute'));

const PORT = 3002;
 
app.listen(PORT, () => {
    console.log(`Server Running On Port ${PORT}`.bgCyan.white);
});
 