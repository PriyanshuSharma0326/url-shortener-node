const mongoose = require('mongoose');

async function connectWithMongoDB(url) {
    return (
        mongoose
            .connect(url)
            .then(() => {
                console.log('Connection has been established with MongoDB');
            })
            .catch((err) => {
                console.error(err);
            })
    );
}

module.exports = {
    connectWithMongoDB
};
