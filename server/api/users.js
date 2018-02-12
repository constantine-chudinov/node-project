const mongoose = require("mongoose");
const pick = require("lodash/pick");
const User = require("../mongodb/users");

exports.get = async (ctx) => {
    try {
        console.log("------")
        ctx.body = await User.find({});
    } catch (ex) {
        ctx.throw(500, "Internal server error");
    }
};

exports.patch = async (ctx) => {
    try {
        Object.assign(ctx.userById, pick(ctx.request.body, User.publicFields));
        await ctx.userById.save();
        ctx.body = ctx.userById.toObject();
    } catch (ex) {
        ctx.throw(409, "Dublicate");
    }
};

exports.post = async (ctx) => {
    try {
        const requestUser = ctx.request.body;
        if (!requestUser.password
            || !requestUser.username
            || !requestUser.email
            || !requestUser.firstName
            || !requestUser.lastName) {
            ctx.throw(400, "Invalid user");
        } else {
            const createdUser = await new User(pick(requestUser, User.publicFields)).save();
            ctx.body = createdUser.toObject();
        }
    } catch (ex) {
        ctx.throw(409, "Dublicate");
    }
};

exports.delete = async (ctx) => {
    await ctx.userById.remove();
    ctx.body = "ok";
};

exports.userById = async (id, ctx, next) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        ctx.throw(404);
    }
    ctx.userById = await User.findById(id);

    if (!ctx.userById) {
        ctx.throw(404);
    }

    await next();
};

exports.getById = async (ctx) => {
    ctx.body = ctx.userById.toObject();
};

