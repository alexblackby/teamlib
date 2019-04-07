require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const initMongoDb = require('./services/init/mongoDb');
const initOpenId = require('./services/init/openId');
const bodyParserErrorHandler = require('./middleware/bodyParserErrorHandler');
const errorHandler = require('./middleware/errorHandler');

Promise.all([
    initOpenId,
    initMongoDb,
]).then(() => {
    const app = express();

    app.use(cors());
    app.use(bodyParser.json({limit: "10kb"}));
    app.use(bodyParserErrorHandler);
    app.use(require('./routes'));
    app.use(errorHandler);

    const serverPort = process.env.NODE_PORT;
    app.listen(serverPort, () => console.log('Server is running on port ' + serverPort));
});
