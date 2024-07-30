const mongoose = require('mongoose')
function Connection() {
    const mongoURI = "mongodb+srv://touhidul5700:rsMGZBLzWJZBSDr1@cluster0.c48j5ub.mongodb.net/"
    mongoose.connect(mongoURI)
    .then(() => console.log("connected"))
    .catch(err => console.log(err))
}

module.exports = Connection