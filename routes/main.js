const express = require('express');
const router = express.Router();
const axios = require('axios');
const Article = require('../models/Article');
const mongoose = require('mongoose');
const nodemailer = require("nodemailer");
const sendGridTransport = require('nodemailer-sendgrid-transport');
const transporter = nodemailer.createTransport(sendGridTransport({
    auth:{
        api_key:'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'
    }
}));

mongoose.set('toJSON', { virtuals: true });

// router.get('/',async (req,res,next)=>{
//     try{
//         // res.render('main');
//         res.send('s')
//     }catch(err){
//         res.status(400).send('Failed to load /');
//         next(err);
//     }
// })

//main page

router.get('/about',async (req,res)=>{
    const articles = await axios.get('https://final-form-api.herokuapp.com/articles');
    const articlesData = articles.data;
    try{
        res.render('about',{articles:articlesData})
    }catch(err){
        res.render(err);
    }
})

router.get('/contact',async (req,res)=>{
    const articles = await axios.get('https://final-form-api.herokuapp.com/articles');
    const articlesData = articles.data;
    try{
        res.render('contact',{articles:articlesData})
    }catch(err){

    }
})

router.get('/tags',async (req,res,next)=>{
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const tag = req.query.tag;
    const articles = await axios.get(`https://final-form-api.herokuapp.com/tags/${tag}?page=${page}&limit=${limit}`);
    const articlesData = articles.data;
    const latestArticles = await axios.get('https://final-form-api.herokuapp.com/articles');
    const latestArticlesData = latestArticles.data;
    try{
        res.render('tags',{articles:articlesData.resultArticles,latestArticles:latestArticlesData,previous:articlesData.previous,next:articlesData.next,tag:tag})        
        }catch(err){
        res.status(400).send('couldnt reach tags');
        next(err)
    }
})

router.post('/contact',async (req,res)=>{
    res.redirect('/');
    return transporter.sendMail({
        to:req.body.email,
        from:'mlazaris@protonmail.com',
        subject:`mail from ${req.body.name}`,
        html:`<h1> email:${req.body.email} \n\n\n ${req.body.message}</h1>`
    })
})

router.get('/',async (req,res,next)=>{
    const articles = await axios.get(`https://final-form-api.herokuapp.com/latest?page=1&limit=4`);
    const articlesData = articles.data;
    // const articlesData = await Article.find();
    const featuredArticles = await axios.get(`https://final-form-api.herokuapp.com/featured?page=1&limit=8`);
    const featuredArticlesData = featuredArticles.data;
    try{
        res.render('main',{articles:articlesData.resultArticles,featuredArticles:featuredArticlesData.resultArticles})
    }catch(err){
        res.status(400).send('couldnt reach sth');
        next(err)
    }
})

// maybe the solution is to write a function which adds the articleImgPath inside the post submit router when 
// i make the unfilutered or w/e the fuck is the second Article instance idk ...


// router.get('/a',async(req,res)=>{
//     // const articles = await Article.find().sort({date:-1}); //works
//     // const articles = await axios.get('https://final-form-api.herokuapp.com/articles');
//     const articles = await axios.get('http://localhost:5000/articles')
//     const articlesData = articles.data;


//     try{
//         // res.json(articles);
//         res.render('a',{articles:articlesData})
//         // console.log(typeof(articles[0].articleImgPath));
        
//         // res.json(articlesData)
//         // res.render('a',{articles:articlesData})
//         // console.log(articlesData.articleImgPath)
//     }catch(err){
//         console.log(err)
//     }

// })


//featured page
router.get('/featured',async (req,res,next)=>{
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const articles = await axios.get(`https://final-form-api.herokuapp.com/featured?page=${page}&limit=${limit}`);
    const articlesData = articles.data;
    const latestArticles = await axios.get('https://final-form-api.herokuapp.com/articles');
    const latestArticlesData = latestArticles.data;
    try{
        res.render('featured',{articles:articlesData.resultArticles,latestArticles:latestArticlesData,previous:articlesData.previous,next:articlesData.next})
        
        }catch(err){
        res.status(400).send('couldnt reach sth');
        next(err)
    }
})

//latest page
router.get('/latest',async(req,res,next)=>{
    const latestArticles = await axios.get(`https://final-form-api.herokuapp.com/latest?page=${req.query.page}&limit=${req.query.limit}`);
    const featuredArticles = await axios.get('https://final-form-api.herokuapp.com/featured');
    const latestArticlesData = latestArticles.data;
    try{
        res.render('latest',{articles:latestArticlesData.resultArticles,featuredArticles:featuredArticles.data,previous:latestArticlesData.previous,next:latestArticlesData.next})
        // res.json(latestArticles);
    }catch(err){
        next(err);
        console.log(err);
        res.status(400).send('problem with loggging /latest');
    }
})

//authors 
router.get('/authors',async (req,res,next)=>{
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const author = req.query.author;
    const articles = await axios.get(`https://final-form-api.herokuapp.com/authors/${author}?page=${page}&limit=${limit}`);
    const articlesData = articles.data;
    const latestArticles = await axios.get('https://final-form-api.herokuapp.com/articles');
    const latestArticlesData = latestArticles.data;
    try{
        res.render('authors',{articles:articlesData.resultArticles,latestArticles:latestArticlesData,previous:articlesData.previous,next:articlesData.next,author:author});        
    }catch(err){
        console.log(err);
        next(err);
    }

})

router.get('/category',async (req,res,next)=>{
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const category = req.query.category;
    const articles = await axios.get(`https://final-form-api.herokuapp.com/category/${category}?page=${page}&limit=${limit}`);
    const articlesData = articles.data;
    const latestArticles = await axios.get('https://final-form-api.herokuapp.com/articles');
    const latestArticlesData = latestArticles.data;
    try{
        res.render('categories',{articles:articlesData.resultArticles,latestArticles:latestArticlesData,previous:articlesData.previous,next:articlesData.next,category:category});        
    }catch(err){
        console.log(err);
        next(err);
    }
})


// single articles
router.get('/:_id', async (req,res,next)=>{
    try{
        let singleArticle = await axios.get(`https://final-form-api.herokuapp.com/singleArticle/${req.params._id}`);
        let articles = await axios.get(`https://final-form-api.herokuapp.com/articles`);

        if(singleArticle){
            let pars = Object.values(singleArticle.data.content);
            let dateFull=singleArticle.data.date.toLocaleString('el-GR').split(',');
            let dateFullArr = dateFull[0].split('T');
            res.render('singleArticle',{singleArticle:singleArticle.data,pars:pars,latestArticles:articles.data,date:dateFullArr[0],tagArray:singleArticle.data.tags})
            // console.log(dateFull);
            // res.render('uniqueArticle2',{articles:articles,pars:pars});
            // console.log(singleArticle.date);
        }else{
            res.status(404);
            return res.send('Article Not Found')
        }
        
    }catch(err){
        next(err);
        res.status(400).send('problem with loggging /:_id')

    }
})



module.exports = router;