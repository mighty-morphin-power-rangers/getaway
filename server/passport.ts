// const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const passport = require('passport');
// import { PrismaClient } from '@prisma/client';
// export const prisma = new PrismaClient()
// require('dotenv').config();
// //const config = require('./config');

// passport.use(new GoogleStrategy({
//   clientID: process.env.GOOGLE_CLIENT_ID,
//   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//   callbackURL: '/auth/google/callback',
//   scope: ['profile', 'email']
// },
// function(accessToken:any, refreshToken:any, profile:any, cb:any) {
//  // return cb(null, profile);
//   const user = {
//     name: profile.displayName,
//     googleId: profile.id,
//     avatar: profile.photos[0].value
//   }
//   prisma.user.findFirst({ where: { googleId: profile.id } })
//  .then((existingUser:any)=>{
//   if(existingUser){
//     return cb(null, profile);
//   }
//   prisma.user.create({
//     data:{
//       name: user.name,
//       googleId: user.googleId,
//       avatar: user.avatar
//     }
//   })
//   .then((user:any)=>{
//     console.log('succesfully created user', user)
//     cb(null, profile);
//   })
//   .catch((err:any)=>{
//     console.log('could not add user to db', err)
//     cb(err, null);
//   })
//  })
//  .catch((err:any)=>{
//   console.log('could not find user', err)
//   cb(err, null);
//  })
// }
// ));

// passport.serializeUser((user:any,done:any)=>{
//   done(null,user)
// })

// passport.deserializeUser((user:any,done:any)=>{
//   // console.log(user)
//   done(null,user)
// })

const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
require('dotenv').config();
//const config = require('./config');

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/callback',
      scope: ['profile', 'email'],
    },
    function (accessToken: any, refreshToken: any, profile: any, cb: any) {
      // return cb(null, profile);
      const user = {
        name: profile.displayName,
        googleId: profile.id,
        avatar: profile.photos[0].value,
      };
      prisma.user
        .findFirst({ where: { googleId: profile.id } })
        .then((existingUser: any) => {
          if (existingUser) {
            return cb(null, profile);
          }
          prisma.user
            .create({
              data: {
                name: user.name,
                googleId: user.googleId,
                avatar: user.avatar,
              },
            })
            .then((user: any) => {
              console.log('succesfully created user', user);
              cb(null, profile);
            })
            .catch((err: any) => {
              console.log('could not add user to db', err);
              cb(err, null);
            });
        })
        .catch((err: any) => {
          console.log('could not find user', err);
          cb(err, null);
        });
    }
  )
);

passport.serializeUser((user: any, done: any) => {
  done(null, user);
});

passport.deserializeUser((user: any, done: any) => {
  done(null, user);
});

export default prisma;
