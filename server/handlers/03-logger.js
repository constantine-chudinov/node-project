const logger = require("koa-logger");
exports.init = async app => app.use(logger());