const mongoose = require("mongoose");
const pick = require("lodash/pick");
const User = require("../mongodb/users");
const usersApi = require("./users");
const jwt = require("jwt-simple");
const config = require("../server/config");
const passport = require('koa-passport');

const tokenForUser = (user) => {
    const timestamp = new Date().getTime();
    return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
};

module.exports.signup = async (ctx) => {
    const userToCreate = ctx.request.body;
    if (!userToCreate || !userToCreate.email || !userToCreate.password) {
        ctx.throw(422, "Not enough fields");
        return;
    }
    const foundUser = await User.findOne({ email: userToCreate.email });
    if (foundUser) {
        ctx.throw(422, "Duplicate user");
    } else {
        const createdUser = await User.create(userToCreate);
        const payload = {
            id: createdUser._id,
            firstName: createdUser.firstName
        };
        ctx.body = { token: jwt.encode(payload, config.secret) };
    }
};

module.exports.signin = async function(ctx, next) {
    await passport.authenticate('local', { session: false })(ctx, next);

    if (ctx.state.user) {
        const payload = {
            id: ctx.state.user._id,
            firstName: ctx.state.user.firstName
        };

        const token = jwt.encode(payload, config.secret);

        ctx.body = {token};
    } else {
        ctx.status = 400;
        ctx.body = {error: "Invalid credentials"};
    }
};


module.exports.logout = async (ctx) => {
    console.log(ctx);
};
