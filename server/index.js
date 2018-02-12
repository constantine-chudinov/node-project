const Koa = require("koa");
// const config = require("config");
const path = require("path");
const fs = require("fs");
const mount = require("koa-mount");
const mongoose = require("mongoose");
const router = require("./router");
const handlers = fs.readdirSync(path.join(__dirname, "handlers")).sort();
const app = new Koa();
handlers.forEach(handler => require(`./handlers/${handler}`).init(app));
mongoose.Promise = Promise;
mongoose.set("debug", true);
mongoose.connect("mongodb://localhost/test", {
    poolSize: 3,
    keepAlive: 1
});

app.use(mount("/v1", router.middleware()));
if (!module.parent) app.listen(3000);
