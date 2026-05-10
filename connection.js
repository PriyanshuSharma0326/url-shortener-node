const mongoose = require('mongoose');

async function connectMongoDB(url) {
    mongoose
    .connect(url)
    .then(() => {
        console.log("Connection established with MongoDB.");
    })
    .catch((err) => {
        console.log(`Error establishing connection with MongoDB: ${err}`);
    });
}

module.exports = connectMongoDB;
