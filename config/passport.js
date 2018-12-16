var passport = require('passport')
var User = require('../server/models/model_user')
var localStrategy = require('passport-local').Strategy;
passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});
passport.use('local.signin', new localStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, function (req, username, password, done) {
    req.checkBody('username', 'Invalid username').notEmpty()
    req.checkBody('password', 'Invalid password').notEmpty()
    var errors = req.validationErrors()
    if (errors) {
        var messages = []
        errors.forEach(function (err) {
            messages.push(err.msg)
        })
        return done(messages, false);
    }
    User.findOne({ 'username': username }, function (err, user) {
        if (err) {
            return done(err,null);
        }
        if (!user) {
            return done(null, false, { message: 'No user found.' })
        }
        if (!user.validPassword(password)) {
            return done(null, false, { message: 'Wrong password.' })
        }

        done(null, user);

    })

}))

// passport.use('local', new LocalStrategy((username, password, done) => {


//     User.findOne({ 'username': username }, function (err, user) {
//         if (err) {
//             return done(err, null);
//         }
//         if (!user) {
//             return done(null, false, { message: 'No user found.' })
//         }
//         if (!user.validPassword(password)) {
//             return done(null, false, { message: 'Wrong password.' })
//         }

//         done(null, user);


//     })
// }
// ));