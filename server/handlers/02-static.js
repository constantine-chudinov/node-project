// Usually served by Nginx
const serve = require("koa-static");

exports.init = async app => app.use(serve("../client/build"));
