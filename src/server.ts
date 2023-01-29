import express from 'express';
import http from 'http';
import mongoose, { startSession } from 'mongoose';
import { config } from './config/config';
import Logging from './library/Logging';

const router = express();

// connect to mongo
mongoose
    .connect(config.mongo.url, { retryWrites: true, w: 'majority' })
    .then(() => {
        Logging.info('Connected to mongo atlas.');
        StartServer();
    })
    .catch((err) => {
        Logging.error('Unable to connect: ');
        Logging.error(err);
    });

//only start the server if Mongo connects

const StartServer = () => {
    router.use((req, resp, next) => {
        //log request
        Logging.info(`Incomming -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

        resp.on('finish', () => {
            Logging.info(`Outcomming -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}] - Status: [${resp.status}]`);
        });

        next();
    });
    router.use(express.urlencoded({ extended: true }));
    router.use(express.json());

    //API rules
    router.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

        if (req.method == 'OPTIONS') {
            res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
            return res.status(200).json({});
        }

        next();
    });
    //Routes

    //healthcheck
    router.get('/ping', (req, res, next) => res.status(200).json({ message: 'pong' }));

    //error handler
    router.use((req, res, next) => {
        const err = new Error('not found');
        Logging.error(err);
        return res.status(404);
    });

    http.createServer(router).listen(config.server.port, () => Logging.info(`Server is running on port ${config.server.port}`));
};
