const mongoose = require('mongoose');


const connectDb = async () => {
    try {
        const {connection} = await mongoose.connect(process.env.MONGO_URL);
            console.warn("Database Connected" + connection.host);
    } catch (error) {
        console.warn(error);
    }
};


module.exports = connectDb;