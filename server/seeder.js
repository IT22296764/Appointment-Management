const mongoose = require('mongoose')
const dotenv = require('dotenv');
const connectDb = require('./config/config.js'); // corrected path
const patientModel = require('./models/patientModel.js');
const patientModel = require('./utils/patientdata.js');
const manger = require('./models/appManagerModel.js')
require('colors');
//config
dotenv.config();
connectDb();

//function seeder
const importData = async () => { 
    try {
        await patientModel.deleteMany();
        await patientModel.insertMany(patient);
        console.log("All Items Added".bgGreen); 
        process.exit();

    } catch (error) {
        console.log(`${error}`.bgRed.inverse);
        process.exit(1);
    }
};

const  addData = async () => {
    try{
        await mangerModel.deleteMany();
        await patientModel.insertMany(patient);
        console.log("ALL Items Added".bgRed);
        process.exit() 
        
    }catch(error){
        console.log(`${error}`.bgGreen.inverse);
        process.exit(1)
    
    }
}
 
importData(); 
addData();