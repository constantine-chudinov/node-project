const mongoose = require("mongoose");
const pick = require("lodash/pick");
const User = require("../mongodb/users");
const usersApi = require("./users");
const jwt = require("jwt-simple");
const config = require("../config");

module.exports.signup = async (ctx) => {
    const user = await User.create(ctx.request.body);
    console.log("----------", ctx.login);
    // ctx.flash('error', 'message');
    // ctx.redirect('/registration');
    await ctx.login(user);
    ctx.redirect("/");
};

module.exports.login = async (ctx) => {
    console.log(ctx);
    return Promise.resolve("foo");
};

module.exports.logout = async (ctx) => {
    console.log(ctx);
};
