/* eslint-disable comma-spacing */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable global-require */
import express from 'express'
import dotenv from 'dotenv'
import webpack from 'webpack'
import helmet from 'helmet'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { renderRoutes } from 'react-router-config'
import { StaticRouter } from 'react-router-dom'
import serverRoutes from '../frontend/routers/serverRoutes'
import reducer from '../frontend/reducers'
import initialState from '../frontend/initialState'
import Layout from '../frontend/components/Layout'
import getManifest from './getManifest';

dotenv.config()

const { ENV, PORT } = process.env
const app = express()

if (ENV === 'development') {
  console.log('Development config')
  const webpackConfig = require('../../webpack.config')
  const webpackDevMiddleware = require('webpack-dev-middleware')
  const webpackHotMiddleware = require('webpack-hot-middleware')
  const compiler = webpack(webpackConfig)
  const serverConfig = { port: PORT, hot: true }

  app.use(webpackDevMiddleware(compiler, serverConfig))
  app.use(webpackHotMiddleware(compiler))
} else {
  app.use((req, res, next) => {
    if (!req.hashManifest) req.hashManifest = getManifest();
    next();
  });
  app.use(express.static(`${__dirname}/public`))
  app.use(helmet())
  app.use(helmet.permittedCrossDomainPolicies())
  // app.disable("x-powered-by");
}

const setResponse = (html, preloadedState, manifest) => {
  const mainStyles = manifest ? manifest['main.css'] : 'assets/app.css';
  const mainBuild = manifest ? manifest['main.js'] : 'assets/app.js';

  return (`
  <!DOCTYPE html>
  <html>
    <head>
      <link rel="stylesheet" href="${mainStyles}" type="text/css">
      <title>Platzi Video</title>
    </head>
    <body>
      <div id="app">${html}</div>
      <script>
        window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
      </script>
      <script src="${mainBuild}" type="text/javascript"></script>
    </body>
  </html>
  `);
}

const renderApp = (req, res) => {
  const store = createStore(reducer, initialState)
  const preloadedState = store.getState()
  const html = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.url} context={{}}>
        <Layout>{renderRoutes(serverRoutes)}</Layout>
      </StaticRouter>
    </Provider>
  )
  res.removeHeader('x-powered-by')
  res.send(setResponse(html, preloadedState, req.hashManifest));
}

app.get('*', renderApp)

app.listen(PORT, (err) => {
  if (err) console.log(err)
  else console.log(`Server running on port ${PORT}`)
})