// passport.js
const express = require("express");
const app = express();
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const { User } = require("./db");
const { JWT_SECRET } = require("./config");

const initializePassport = () => {
    passport.use(new JwtStrategy({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: JWT_SECRET
    }, async (jwtPayload, done) => {
        try {
            // Find the user based on the JWT token
            const user = await User.findById(jwtPayload.sub);
            if (!user) {
                return done(null, false);
            }
            console.log("user acesss")
            return done(null, user);
        } catch (error) {
            return done(error, false);
        }
    }));
    
};

module.exports = initializePassport;
