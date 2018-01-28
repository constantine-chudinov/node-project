const Router = require("koa-router");

const router = new Router({ prefix: "/users" });
const usersApi = require("./api/users");

router.get("/:userById", usersApi.getById);
router.get("/", usersApi.get);
router.post("/", usersApi.post);
router.patch("/:userById", usersApi.patch);
router.del("/:userById", usersApi.delete);
router.param("userById", usersApi.userById);
module.exports = router;
