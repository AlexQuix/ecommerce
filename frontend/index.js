const { createProxyMiddleware } = require('http-proxy-middleware');
const express = require('express');
const path = require('path');
const app = express();

// Serve static files from the 'build' directory
app.use(express.static(path.join(__dirname, 'build')));

// Proxy middleware for '/assets' requests
app.use(
    "/assets",
    createProxyMiddleware({
        target: process.env.ORIGIN_ASSETS || "http://localhost:4000",
        changeOrigin: true
    })
);

// Proxy middleware for '/api' requests
app.use(
    "/api",
    createProxyMiddleware({
        target: process.env.ORIGIN_API || "http://localhost:4000",
        changeOrigin: true
    })
);

// Handle all other routes
app.get('/*', function (req, res) {
    let filePath = path.join(__dirname, 'build', 'index.html');
    res.sendFile(filePath);
});

// Start the server
app.listen(process.env.PORT || 3000, ()=>{
    console.log("Service on live");
});