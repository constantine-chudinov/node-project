const mongoose = require("mongoose");
const bcrypt = require("bcrypt-nodejs");
const config = require("../config");
const crypto = require("crypto");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: { type: String, unique: true, lowercase: true, required: true, trim: true },
    username: { type: String, required: true },
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    deleted: Boolean,
    passwordHash: { type: String, required: true },
    salt: { type: String, required: true }
}, { timestamps: true });

userSchema.statics.publicFields = ["username", "firstName", "lastName", "email"];

userSchema.virtual("password")
    .set(function(password) {

        if (password !== undefined) {
            if (password.length < 4) {
                this.invalidate("password", "Пароль должен быть минимум 4 символа.");
            }
        }

        this._plainPassword = password;

        if (password) {
            this.salt = crypto.randomBytes(config.crypto.hash.length).toString("base64");
            this.passwordHash = crypto.pbkdf2Sync(
                password,
                this.salt,
                config.crypto.hash.iterations,
                config.crypto.hash.length,
                "sha1"
            ).toString("base64");
        } else {
            // remove password (unable to login w/ password any more, but can use providers)
            this.salt = undefined;
            this.passwordHash = undefined;
        }
    })
    .get(function() {
        return this._plainPassword;
    });

userSchema.methods.checkPassword = function(password) {
    if (!password) return false; // empty password means no login by password
    if (!this.passwordHash) return false; // this user does not have password (the line below would hang!)

    return crypto.pbkdf2Sync(
            password,
            this.salt,
            config.crypto.hash.iterations,
            config.crypto.hash.length,
            "sha1"
        ).toString("base64") == this.passwordHash;
};

const ModelClass = mongoose.model("user", userSchema);

module.exports = ModelClass;
