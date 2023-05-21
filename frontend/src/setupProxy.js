const { createProxyMiddleware } = require("http-proxy-middleware")

module.exports = function(app){
    app.use(
        "/assets",
        createProxyMiddleware({
            target: process.env.REACT_APP_ORIGIN_ASSETS || "http://localhost:4000",
            changeOrigin: true
        })
    );

    app.use(
        "/api",
        createProxyMiddleware({
            target: process.env.REACT_APP_ORIGIN_API || "http://localhost:4000",
            changeOrigin: true
        })
    );
}