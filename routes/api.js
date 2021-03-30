const express = require('express');
const router = express.Router();
const Article = require('../models/Article');

router.get('',async(req,res,next)=>{
    
    const articles = await Article.find();
    
    try{
        res.json(articles)
    }catch(err){
        res.status(400).send('couldnt load /api');
        next(err);
    }
})

module.exports = router;