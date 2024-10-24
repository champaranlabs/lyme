require('app-module-path').addPath(__dirname);

const express = require('express');

const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config({ path: `./env/.env.${process.env.NODE_ENV}` });
const { Logger } = require('core');
const config = require('config/config');

Logger.initialize({
    isEnable: config.awsCloudwatch.enableAwsLogger,
    type: 'aws',
    environment: config.env,
    clsNameSpace: config.clsNameSpace,
    configurations: {
        region: config.awsCloudwatch.region,
        accessKeyId: config.awsCloudwatch.accessKeyId,
        secretKey: config.awsCloudwatch.secretKey,
        logGroupName: config.awsCloudwatch.logGroupName,
        logStreamName: config.awsCloudwatch.logStreamName
    }
});
const cls = require('cls-hooked');



const { ApiError,ValidationError } = require('core');
const { logError, logInfo } = require('core');
const { HTTP_CONSTANT } = require('core');

const app = express();
const server = require('http').createServer(app);
const Route = require('route');
const uuid = require('uuid');

Route.setApp(app);

const allowedOrigins = config.cors.whiteListOrigins;
const allowedOriginsRegularExpression = allowedOrigins.map((origin) => new RegExp(`${origin}$`));
app.use(cors({ origin: allowedOriginsRegularExpression }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    const namespace = cls.getNamespace(config.clsNameSpace);
    const platform = req.headers['x-platform'] || 'unknown-platform';
    namespace.run(() => {
        namespace.set('traceId', uuid.v4());
        logInfo(`${req.method} ${req.originalUrl}`, { ...req.body, platform });
        next();
    });
});

require('./api-routes');

app.use((req, res, next) => {
    const err = new ApiError('Not Found', 'Resource Not Found!', HTTP_CONSTANT.NOT_FOUND);
    next(err);
});

app.use((error, request, response, next) => {
    const platform = request.headers['x-platform'] || 'unknown-platform';
    if (error.constructor === ApiError) {
        logError('Failed to execute the operation', {
            value: error.error,
            stack: error.error ? error.error.stack : [],
            platform
        });
        if (error.code) { response.status(error.code); }
        response.send({
            status: false,
            errorType: 'api',
            message: error.errorMessage
        });
    } else if (error.constructor === ValidationError) {
        logInfo('Failed to execute the operation', {
            value: error.errorMessage,
            stack: error.error ? error.error.stack : [],
            platform
        });
        if (error.code) { response.status(error.code); }
        response.send({
            status: false,
            errorType: 'validation',
            message: error.errorMessage
        });
    } else {
        response.status(501);
        logError('Failed to execute the operation', { value: error, stack: error.stack, platform });
        response.send({
            status: false,
            errorType: 'unhandled',
            message: 'Something went wrong!'
        });
    }
});

process.on('unhandledRejection', (error) => {
    console.log(error);
    logError('unhandledRejection', { error });
});

process.on('uncaughtException', (error) => {
    console.log(error);
    logError('uncaughtException', { error });
});

process.on('SIGTERM', () => {
    logInfo('SIGTERM signal received: closing HTTP server');
    server.close(() => {
        logInfo('HTTP server closed');
    });
});

server.listen(config.apiPort, () => {
    console.log(`Express server listening on Port :- ${config.apiPort}`);
});
