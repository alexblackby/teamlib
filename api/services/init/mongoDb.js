var mongoose = require('mongoose');

exports.initMongoDb = new Promise((resolve, reject) => {
    mongoose.connect('mongodb://mongo/' + process.env.MONGO_DB, {useNewUrlParser: true, useCreateIndex: true});
    mongoose.connection.on("connected", resolve);

    mongoose.connection.on("error", (error) => {
        console.error("MongoDB connection error: " + error);
        process.exit();
    });

    mongoose.connection.on('disconnected', function () {
        console.log('MongoDB connection was lost.');
        process.exit();
    });

    process.on('SIGINT', function () {
        mongoose.connection.close(function () {
            console.log('MongoDB connection disconnected.');
            process.exit(0);
        });
    });
});
