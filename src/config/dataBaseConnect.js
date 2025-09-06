const mongoose = require('mongoose');


const connectDb=async()=>{
    try{
        await mongoose.connect('mongodb+srv://viswaicloud:53FeEG5DoaqPyRiY@vishwacreates.0flcevx.mongodb.net/devSearch');
        console.log("Database connected successfully");

    }catch(err){
        console.error("Database connection failed", err);
    }
}

module.exports = connectDb;