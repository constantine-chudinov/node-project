const koaPassport = require("koa-passport");
exports.init = app => app.use(koaPassport.session());
