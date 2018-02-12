const Router = require("koa-router");

const router = new Router({ prefix: "/users" });
const usersApi = require("./api/users");
require("./passport");
const passport = require("koa-passport");

const authenticationApi = require("./api/authentication");

router.get("/:userById", usersApi.getById);

router.get("/", async (ctx, next) => {
    await passport.authenticate('jwt', {session: false})(ctx, next);

    if (!ctx.state.user) {
        ctx.status = 400;
        ctx.body = {error: 'invalid credentials'};
        return;
    }
    console.log(ctx);
    await usersApi.get(ctx);
});
router.post("/", usersApi.post);
router.post("/signin", authenticationApi.signin);

router.patch("/:userById", usersApi.patch);
router.del("/:userById", usersApi.delete);
router.param("userById", usersApi.userById);
router.post("/logout", authenticationApi.logout);
router.post("/signup", authenticationApi.signup);

module.exports = router;
