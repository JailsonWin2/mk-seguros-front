const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://mkseguros2-1cc933cf7ab0.herokuapp.com",
      changeOrigin: true,
    })
  );
};
