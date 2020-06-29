//general modules
import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compress from 'compression';
import cors from 'cors';
import helmet from 'helmet';

//castom modules
import config from '../config';
import template from '../templates/template.react';
import userApi from './routes/user.routes';
import postApi from './routes/post.routes';
import movieApi from './routes/movie.routes';
import musicApi from './routes/music.routes';

//server side rendering
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { ServerStyleSheets } from '@material-ui/core/styles';
import RootComponent from '../client/RootComponent';

//initialize express server
const app = express();

//parse body params and attache them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compress());

//secure apps by setting various HTTP headers
app.use(helmet());

//enable CORS - Cross Origin Resource Sharing
app.use(cors());

//serving static files
const CURRENT_WORKING_DIR = process.cwd();
app.use('/build', express.static(path.join(CURRENT_WORKING_DIR, 'build')));

//api endpoints
app.use('/', userApi);
app.use('/', postApi);
app.use('/', musicApi);
app.use('/', movieApi);

//sending template with ssr markup, css and bundeled client code at every endpoint
app.get('*', (request, response) => {
    const sheets = new ServerStyleSheets();
    const markup = ReactDOMServer.renderToString(
        sheets.collect(
            <StaticRouter location={request.url}>
                <RootComponent/>
            </StaticRouter>
        )
    )
    const css = sheets.toString();
    response.send( template(markup, css) );
});

//connect to db
mongoose.connect(config.mainMongoUri, {
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useCreateIndex: true,
    useFindAndModify: false
});
mongoose.connection.on('error', () => {
    throw new Error('Unable to connect to database !');
});
mongoose.connection.once('open', () => {
    console.log('Successfully connected to database !');
});

//initialize port for server
app.listen(config.port, () => {
    console.log(`Server is running on port ${config.port} in ${config.nodeEnv} mode...`);
});
