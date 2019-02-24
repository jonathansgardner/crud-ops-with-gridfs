const proxy = require("http-proxy-middleware");

module.exports = function(app) {
  app.use(proxy("/files", { target: "http://localhost:5000" }));
  app.use(proxy("files/upload", { target: "http://localhost:5000" }));
  app.use(proxy("/files/read/*", { target: "http://localhost:5000" }));
  app.use(proxy("files/update/*", {target: "http://localhost:5000"}));
  app.use(proxy("/files/delete/*", { target: "http://localhost:5000" }));
};
