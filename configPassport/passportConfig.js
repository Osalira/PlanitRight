import express from 'express';
import session from 'express-session';
import flash from 'connect-flash';
import passport from 'passport';


const configurePassport = (app, userInfo) => {
    app.use(
        session({
            secret: 'Our little secret.',
            resave: false,
            saveUninitialized: false,
        })
    );
    app.use(flash());
    app.use(passport.initialize());
    app.use(passport.session());
    //
    

    //
    passport.use(userInfo.createStrategy());

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        userInfo
            .findById(id)
            .exec()
            .then((user) => {
                done(null, user);
            })
            .catch((err) => {
                done(err, null);
            });
    });
};

export default configurePassport;
