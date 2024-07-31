/* const mongoose = require('mongoose')
function Connection() {
    const mongoURI = "mongodb+srv://begger-chat:begger-chat@begger-chat.d8m70wg.mongodb.net/mymongodb?retryWrites=true&w=majority&appName=begger-chat" 


    mongoose.connect(mongoURI)
        .then(() => console.log("connected"))
        .catch(err => console.log(err))
}

module.exports = Connection */

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
