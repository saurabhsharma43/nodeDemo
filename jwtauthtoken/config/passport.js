const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const user = require('../models/Users');
const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

const User = mongoose.model('User');

passport.use(new LocalStrategy({

    usernameField: 'user[userName]',
    passwordField: 'user[password]',

}, (userName, password, done) => {
    console.log('hi')
    User.findOne({ userName: userName })
        .then((user) => {
            if (!user || !user.validatePassword(password)) {
                return done(null, false, { errors: { 'email or password': 'is invalid' } });
            }

            return done(null, user);
        }).catch(done);
}));


const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';
passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    console.log('jwt', jwt_payload);

    User.findById({ _id: jwt_payload.id }, function(err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
}));

module.exports = passport;