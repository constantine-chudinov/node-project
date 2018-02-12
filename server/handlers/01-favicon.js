// Usually served by Nginx
const favicon = require("koa-favicon");

exports.init = async app => app.use(favicon());
