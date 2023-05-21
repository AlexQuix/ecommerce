const { createProxyMiddleware } = require("http-proxy-middleware")

module.exports = function(app){
    app.use(
        "/assets",
        createProxyMiddleware({
            target: process.env.ORIGIN_ASSETS || "http://localhost:4000",
            changeOrigin: true
        })
    );

    app.use(
        "/api",
        createProxyMiddleware({
            target: process.env.ORIGIN_API || "http://localhost:4000",
            changeOrigin: true
        })
    );
}