const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const bodyParser = require('body-parser');
const bodyParserErrorHandler = require('./middleware/bodyParserErrorHandler');
const errorHandler = require('./middleware/errorHandler');
const mongoConnect = require('./config/mongo');
const routes = require('./routes');
const cors = require('cors');

mongoConnect();

const app = express();
app.use(cors());

app.use(bodyParser.json({limit: "10kb"}));
app.use(bodyParserErrorHandler);
app.use(routes);
app.use(errorHandler);

const serverPort = process.env.NODE_PORT;
app.listen(serverPort, () => console.log('Server is running on port ' + serverPort));