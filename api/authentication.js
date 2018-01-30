const mongoose = require("mongoose");
const pick = require("lodash/pick");
const User = require("../mongodb/users");
const usersApi = require("./users");
const jwt = require("jwt-simple");
const config = require("../config");

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
        ctx.body = { token: tokenForUser(createdUser) };
    }
};

module.exports.login = async (ctx) => {
    console.log(ctx);
    return Promise.resolve("foo");
};

module.exports.logout = async (ctx) => {
    console.log(ctx);
};
