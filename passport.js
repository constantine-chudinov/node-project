const passport = require("koa-passport"); //реализация passport для Koa
// const LocalStrategy = require("passport-local"); //локальная стратегия авторизации
const JwtStrategy = require("passport-jwt").Strategy; // авторизация через JWT
const ExtractJwt = require("passport-jwt").ExtractJwt; // авторизация через JWT
const config = require("./config");
const User = require("./mongodb/users");

// Setup options for JWT Strategy
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader("authorization"),
    secretOrKey: config.secret
};

// Create JWT strategy
const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
    User.findById(payload.sub, (err, user) => {
        if (err) { return done(err, false); }
        if (user) {
            done(null, user);
        } else {
            done(null, false);
        }
    });
});

// Tell passport to use this strategy
passport.use(jwtLogin);

passport.serializeUser((user, done) => {
    done(null, user.email);
});

passport.deserializeUser((email, done) => {
    User.findOne({ email }, done); // callback version checks id validity automatically
});

module.exports = passport;
