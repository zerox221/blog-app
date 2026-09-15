const mongoose = require('mongoose');

require('dotenv').config();

const connectDb = async()=>{
    try {
        await mongoose.connect(process.env.DATABASE_URL);
        console.log("db connected");
    } catch (error) {
        console.log("error : ",error);
        process.exit(1);
    }

}
module.exports = connectDb;