const mongoose = require('mongoose');
require('dotenv').config();

const mongo_URI = process.env.MONGO_URI;
const connectMongoDB = async () => {
    try {
        const conn = await mongoose.connect(mongo_URI);
        console.log(`Mongo connected: ${conn.connection.host}`)
    } catch (error) {
        console.error(Error);
        process.exit(1);
    }
};

module.exports = connectMongoDB;