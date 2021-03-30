const express = require('express');
const bcrypt= require('bcrypt');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const expressSession = require('express-session')


const User = require('../models/User');


router.get('',(req,res)=>{
    res.render('login');
})

// router.post('/submit',async (req,res)=>{
//     const user = await new User({
//         username:req.body.username,
//         password:bcrypt.hashSync(req.body.password,10)
//     })
//     user.save()
//     res.send(user);
// })

// router.post('/login',passport.authenticate('local',{failureRedirect:'/'}),(req,res)=>{
//     res.redirect('http://localhost:5000/admin');
// })

router.post('/login',(req,res,next)=>{
    passport.authenticate('local',{
        successRedirect:'/admin/dashboard',
        failureRedirect:'/'        
    })(req,res,next);
})

router.get('/logout',(req,res)=>{
    req.logout();
    res.redirect('/');
})

module.exports=router;