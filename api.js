const express = require('express');
const morgan = require("morgan");
const { createProxyMiddleware } = require('http-proxy-middleware');

// Create Express Server
const app = express();

// Configuration
const PORT = 3000;
const HOST = "192.168.1.120";
const API_SERVICE_URL = "https://supply.logistica.staging.totvs.app";

// Logging
app.use(morgan('dev'));

// Descomente as linhas abaixo caso queira retornar respostas e status especificos
// app.get('*', (req, res, next) => {
//     res.status(503).send('This is a proxy service which proxies to Billing and Account APIs.');
// });

// app.options('*', (req, res, next) => {
//     res.status(503).send('This is a proxy service which proxies to Billing and Account APIs.');
// });

// app.post('*', (req, res, next) => {
//     res.status(503).send('This is a proxy service which proxies to Billing and Account APIs.');
// });

 // Proxy endpoints
app.use('*', createProxyMiddleware({
    target: API_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
        [`^/json_placeholder`]: '',
    },
    status: 503,
 }));

 // Start the Proxy
app.listen(PORT, HOST, () => {
    console.log(`Starting Proxy at ${HOST}:${PORT}`);
 });


// var http = require('http');

// http.createServer(onRequest).listen(3000);

// function onRequest(client_req, client_res) {
//     console.log('serve: ' + client_req.url);
//     const options = {
//       hostname: 'https://supply.logistica.staging.totvs.app',
//       port: 80,
//       path: client_req.url,
//       method: client_req.method,
//       headers: client_req.headers
//     };

//     console.log(options);
  
//     const proxy = http.request(options, function (res) {
//         console.log(res.statusCode);
//       client_res.writeHead(res.statusCode, res.headers)
//       res.pipe(client_res, {
//         end: true
//       });
//     });
  
//     client_req.pipe(proxy, {
//       end: true
//     });
// }
