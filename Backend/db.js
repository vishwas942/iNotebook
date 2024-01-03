const mongoose = require('mongoose')
const mongoURI = 'mongodb://127.0.0.1:27017/iNotebook';

const ConnectTomongo = () => {
    mongoose.connect(mongoURI);
    console.log("Connected to mongo successfully");
}


module.exports = ConnectTomongo;

