const mongoose = require('mongoose');

const connectDB = async () => {
    try{
        const conn = await mongoose.connect(process.env.ATLAS_URI,{
            useNewUrlParser: true,
        });
        console.log(`MongoDB connected: ${conn.connection.host}`);

    }catch(error){
        console.log(`Error: ${error.message}`);
        process.exit();
    }
};

module.exports = connectDB;