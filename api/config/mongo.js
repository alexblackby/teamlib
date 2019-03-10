var mongoose = require('mongoose');

const connect = () => {
    mongoose.connect('mongodb://mongo/'+process.env.MONGO_DB, {useNewUrlParser: true, useCreateIndex: true});

    mongoose.connection.on("connected", () => console.log("MongoDB: connected to the database"));

    mongoose.connection.on("error", (error) => {
        console.error("MongoDB connection error: "+error);
        process.exit();
    });

    mongoose.connection.on('disconnected', function () {
        console.log('MongoDB connection was lost.');
        process.exit();
    });

    process.on('SIGINT', function() {
        mongoose.connection.close(function () {
            console.log('MongoDB connection disconnected.');
            process.exit(0);
        });
    });
};

module.exports = connect;