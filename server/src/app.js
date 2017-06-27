import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import routes from './routes';
import config from './config';

import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../../webpack.config.dev';

let app = express();

let compiler = webpack(webpackConfig);

app.use(webpackDevMiddleware(compiler, {
    hot: true,
    publicPath: webpackConfig.output.publicPath,
    noInfo: true
}));
app.use(webpackHotMiddleware(compiler));

app.use(bodyParser.json({}));
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', routes);

app.use((err, req, res, next) => {
    res.status(500).json({
        message: 'Server Error'
    });
});

app.get('/*', (req, res) => res.sendFile(path.join(__dirname, '../index.html')));

let port = config.get('app:port');

app.listen(port, () => console.log(`Running at localhost:${port}`));
