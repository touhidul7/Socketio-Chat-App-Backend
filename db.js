require('dotenv').config();
const mongoose = require('mongoose');

function Connection() {
    const mongoURI = process.env.MONGO_URI;

    if (!mongoURI) {
        console.error("MONGO_URI is not defined in environment variables");
        return;
    }

    mongoose.connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDB connected successfully"))
    .catch(err => console.error("MongoDB connection error:", err));
}

module.exports = Connection;
