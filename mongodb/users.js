const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: { type: String, unique: true, lowercase: true, required: true, trim: true },
    password: { type: String, required: true },
    username: { type: String, required: true },
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    deleted: Boolean,
    passwordHash: { type: String, required: true },
    salt: { type: String, required: true }
}, { timestamps: true });

userSchema.statics.publicFields = ["username", "firstName", "lastName", "email", "password"];

const ModelClass = mongoose.model("user", userSchema);

module.exports = ModelClass;
