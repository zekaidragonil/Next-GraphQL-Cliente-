
const mongoose = require('mongoose');
require('dotenv').config({path: './.env'})

const conectarDB = async () =>{
    try {
        await mongoose.connect(process.env.DB_MONGO,{
            useNewURlParser: true,
            useUnifiedTopology: true,
        });
       
        
    } catch (error) {
        console.log('hubo un error');
        console.log(error);
        process.exit(1); // detener la app
    }
 }

module.exports = conectarDB;