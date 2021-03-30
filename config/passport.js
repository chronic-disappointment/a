const localStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const User = require('../models/User');

module.exports = function(passport){
    passport.use(new localStrategy({usernameField:'username'},(username,password,next)=>{
        User.findOne({username:username}).then(user=>{
            if(!user){
                return next(null,false,{message:'The username does not exist'});
            }
            bcrypt.compare(password,user.password,(err,isMatch)=>{
                if(err) {console.log('incorrect password' + password +'user.password'+ user.password +  "4");throw err;}
                if(isMatch){
                    return next(null,user)
                    
                }else{
                    return next(null,false,{message:'password incorrect'})
                }
            });
        })
        .catch(err=>console.log(err));
    }))
    passport.serializeUser(function(user,next){
        next(null,user.id);
    });
    
    passport.deserializeUser(function(id,next){
        User.findById(id,function(err,user){
            next(err,user);
        });
    });
}


