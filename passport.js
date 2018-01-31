const passport = require("koa-passport"); //реализация passport для Koa
// const LocalStrategy = require("passport-local"); //локальная стратегия авторизации
const JwtStrategy = require("passport-jwt").Strategy; // авторизация через JWT
const ExtractJwt = require("passport-jwt").ExtractJwt; // авторизация через JWT
const LocalStrategy = require("passport-local");
const config = require("./config");
const User = require("./mongodb/users");

// Setup options for JWT Strategy
// const jwtOptions = {
//     jwtFromRequest: ExtractJwt.fromHeader("authorization"),
//     secretOrKey: config.secret
// };

// const localOptions = { usernameField: "email" };
// const localLogin = new LocalStrategy(localOptions, (email, password, done) => {
//     // console.log("Local");
//     User.findOne({ email }, (err, user) => {
//         if (err) { return done(err, false); }
//         if (!user) { return done(null, false); }
//         // console.log("Login!", user);
//         // console.log("Password!", typeof password === "string");
//         if (user.checkPassword(password)) {
//             console.log("Checked!", user);
//             return done(null, user);
//         }
//         // console.log("Nooooo!");
//         return done(null, false);
//     });
// });

// // Create JWT strategy
// const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
//     console.log("Jwt", payload);
//     User.findById(payload.sub, (err, user) => {
//         if (err) { return done(err, false); }
//         if (user) {
//             done(null, user);
//         } else {
//             done(null, false);
//         }
//     });
// });


// паспорт напрямую с базой не работает
passport.serializeUser((user, done) => {
    done(null, user.id); // uses _id as idFieldd
});

passport.deserializeUser((id, done) => {
    User.findById(id, done); // callback version checks id validity automatically
});

// Стратегия берёт поля из req.body
// Вызывает для них функцию
passport.use(new LocalStrategy({
    usernameField: "email", // "username" by default
    passwordField: "password",
    passReqToCallback: true }, // all strategies support ctx: req for more complex cases
    (req, email, password, done) => {
        User.findOne({ email }, (err, user) => {
            if (err) {
                return done(err);
            }
            if (!user || !user.checkPassword(password)) {
                // don"t say whether the user exists
                return done(null, false, { message: "Нет такого пользователя или пароль неверен." });
            }
            return done(null, user);
        });
    }
));

// Tell passport to use these strategies
passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromHeader("authorization"),
    secretOrKey: config.secret
}, (jwtPayload, done) => {
    console.log(jwtPayload);
    User.findById(jwtPayload.id, (err, user) => {
        if (err) {
            return done(err, false);
        }

        if (!user) {
            return done(null, false);
        }

        return done(null, user);
    });
}));

module.exports = passport;
