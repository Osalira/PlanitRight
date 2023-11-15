import mongoose, { Schema, model, Types } from 'mongoose';
import passport from 'passport';
import passportLocalMongoose from 'passport-local-mongoose';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import findOrCreate from 'mongoose-findorcreate';


const userSchema = new Schema({
    userName: String,
    passWord: String,
    googleId: String,
  });
//This plugin adds a username field, a hashed password field, and various methods 
//to the schema that are used for user authentication such as  methods to handle 
//hashing and salting of passwords.
userSchema.plugin(passportLocalMongoose);
// This adds the findOrCreate plugin to the userSchema, which provides 
//a method to find a user document, and if it doesn't exist, to create it.
// This is particularly useful for OAuth logins like Google Signin.
userSchema.plugin(findOrCreate);

const userInfo = model('userInfo', userSchema);


export default userInfo;