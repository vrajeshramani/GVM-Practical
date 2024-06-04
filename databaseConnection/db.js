const mongoose = require('mongoose')
const { MONGO_URL } = require('../config')

const databseConnection = () => {
    mongoose.connect(MONGO_URL).then(() => {
        console.log('Database connected successfully');
    }).catch((error) => {
        console.log('Database connection error', error);
    })
}
module.exports = databseConnection