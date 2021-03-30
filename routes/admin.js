const express = require('express');
const router = express.Router();
const Article = require('../models/Article');
// const multer = require('multer');
// const bcrypt = require('bcrypt');
const imageMimeTypes = ['image/jpeg','image/png','images/gif'];
const axios = require('axios');
const { ensureAuthenticated } = require('../config/auth');
// const storage = multer.diskStorage({
//     destination:function(req,file,cb){
//         cb(null,'./public/uploads1')
//     },
//     filename: function(req,file,cb){
//         cb(null, new Date().toISOString() + file.originalname)
//     }
// })

// const upload = multer({dest: './public/uploads1'});
// const upload = multer({storage:storage})

router.get('/',ensureAuthenticated,async (req,res)=>{
    res.render('admin')
})

function saveImg(article,imgEncoded){
    if (imgEncoded==null){
        return ''
    }
    const img = JSON.parse(imgEncoded);
    if(img!=null && imageMimeTypes.includes(img.type)){
        article.img=new Buffer.from(img.data,'base64');
        article.imgType=img.type;
    }
}



// register user

// router.post('/register',async (req,res,next)=>{
//     const user = new User({
//         username:req.body.username,
//         password:bcrypt.hashSync(req.body.password,10)
//     })

//     try{
//         const savedUser = await user.save();
//         res.json(savedUser);
//     }catch(err){
//         next(err);
//         console.log(err);
//         res.status(400).send('problem with loggging /featured')
//     }
    
// })


Object.filter = (obj, predicate) => 
    Object.keys(obj)
          .filter( key => predicate(obj[key]) )
          .reduce( (res, key) => (res[key] = obj[key], res), {}
     );


//submit post
// router.post('/submit',ensureAuthenticated,upload.single('sth'),async (req,res,next)=>{
//     let unfilteredFilePath = req.file.path.replace('public/','');
//     const article = new Article({
//         title:req.body.title,
//         author:req.body.author,
//         tags:req.body.tags,
//         category:req.body.category,
//         description:req.body.description,
//         content:{
//             par1:req.body.par1,
//             par2:req.body.par2,
//             par3:req.body.par3,
//             par4:req.body.par4,
//             par5:req.body.par5,
//             par6:req.body.par6,
//             par7:req.body.par7,
//             par8:req.body.par8,
//             par9:req.body.par9,
//             par10:req.body.par10,
//             par11:req.body.par11,
//             par12:req.body.par12,
//             par13:req.body.par13,
//             par14:req.body.par14,
//             par15:req.body.par15
//         },
//         file:unfilteredFilePath,
//         mainSection:req.body.mainSelection
//     })
//     let contentObject = article.content;
//     let filteredObject = Object.filter(contentObject,cont=>cont!=="");

//     const filteredArticle = new Article({
//         title:req.body.title,
//         author:req.body.author,
//         tags:req.body.tags,
//         category:req.body.category,
//         description:req.body.description,
//         content:filteredObject,
//         file:unfilteredFilePath,
//         mainSection:req.body.mainSelection
//     })
//     try{    
//         const savedArticle = await filteredArticle.save();
//         res.redirect('/admin/dashboard'); // change to savedArticle
//         // res.redirect('/admin/dashboard');
//         }catch(err){
//         res.status(400).send('problem with loggging ')
//         next(err);
//         console.log(err);
//     }
// })
router.post('/submit',async (req,res,next)=>{
    let article = new Article({
        title:req.body.title,
        author:req.body.author,
        tags:req.body.tags,
        category:req.body.category,
        description:req.body.description,
        content:{
            par1:req.body.par1,
            par2:req.body.par2,
            par3:req.body.par3,
            par4:req.body.par4,
            par5:req.body.par5,
            par6:req.body.par6,
            par7:req.body.par7,
            par8:req.body.par8,
            par9:req.body.par9,
            par10:req.body.par10,
            par11:req.body.par11,
            par12:req.body.par12,
            par13:req.body.par13,
            par14:req.body.par14,
            par15:req.body.par15
        },
        mainSection:req.body.mainSelection,
        // articleImgPath:`data:${req.body.imgType};charset=utf-8;base64,${req.body.img.toString('base64')}`
    })
    saveImg(article,req.body.img);
    let contentObject = article.content;
    let filteredObject = Object.filter(contentObject,cont=>cont!=="");

    const filteredArticle = new Article({
        title:req.body.title,
        author:req.body.author,
        tags:req.body.tags,
        category:req.body.category,
        description:req.body.description,
        content:filteredObject,
        mainSection:req.body.mainSelection,
        // articleImgPath:`data:${req.body.imgType};charset=utf-8;base64,${req.body.img.toString('base64')}`
    })
    saveImg(filteredArticle,req.body.img);

    try{    
        const savedArticle = await filteredArticle.save();
        res.redirect('/admin/dashboard'); // change to savedArticle
        // res.json(savedArticle);
        }catch(err){
        res.status(400).send('problem with loggging ')
        next(err);
        console.log(err);
    }
})







router.get('/dashboard',ensureAuthenticated,async (req,res,next)=>{
    const articles  = await axios.get('https://final-form-api.herokuapp.com/articles');
    // console.log(articles);
    try{
        res.render('dashboard',{articles:articles.data});
        // console.log(articles)    
    }catch(err){
        console.log(`error at dashboard : ${err}`);
        next(err)
    }
})

router.get('/dashboard/:_id',ensureAuthenticated,async (req,res)=>{
    const article = await axios.get(`https://final-form-api.herokuapp.com/singleArticle/${req.params._id}`);
    try{
        console.log('reached success')
        res.render('updateRoute',{article:article.data});
    }catch(err){
        res.send(err);
        console.log('reached failure')
    }
})

// router.post('/dashboard/update/:_id',ensureAuthenticated,upload.single('sth'),async (req,res,next)=>{
//     let unfilteredFilePath = req.file.path.replace('public/','');
//     const article={
//         title:req.body.title,
//         author:req.body.author,
//         tags:req.body.tags,
//         category:req.body.category,
//         description:req.body.description,
//         content:{
//             par1:req.body.par1,
//             par2:req.body.par2,
//             par3:req.body.par3,
//             par4:req.body.par4,
//             par5:req.body.par5,
//             par6:req.body.par6,
//             par7:req.body.par7,
//             par8:req.body.par8,
//             par9:req.body.par9,
//             par10:req.body.par10,
//             par11:req.body.par11,
//             par12:req.body.par12,
//             par13:req.body.par13,
//             par14:req.body.par14,
//             par15:req.body.par15
//         },
//         file:unfilteredFilePath,
//         mainSection:req.body.mainSelection
//     }
//     let contentObject = article.content;
//     let filteredObject = Object.filter(contentObject,cont=>cont!=="");

//     const updatedfilteredArticle = new Article({
//         title:req.body.title,
//         author:req.body.author,
//         tags:req.body.tags,
//         category:req.body.category,
//         description:req.body.description,
//         content:filteredObject,
//         file:unfilteredFilePath,
//         mainSection:req.body.mainSelection
//     })

//     try{
//         let updateed = await Article.findOneAndUpdate({
//             _id:req.params._id
//         },
//         {
//             title:updatedfilteredArticle.title,
//             author:updatedfilteredArticle.author,
//             tags:updatedfilteredArticle.tags,
//             category:req.body.category,
//             description:updatedfilteredArticle.description,
//             content:updatedfilteredArticle.content,
//             file:unfilteredFilePath,
//             mainSection:updatedfilteredArticle.mainSection
//         },{useFindAndModify: false});
//         res.redirect('/admin/dashboard');
//         // res.json(updatedfilteredArticle);
//     }catch(err){
//         next(err);
//         res.status(400).send('problem with loggging /featured')
//     }
    
// })
router.post('/dashboard/update/:_id',ensureAuthenticated,async (req,res,next)=>{
    const article={
        title:req.body.title,
        author:req.body.author,
        tags:req.body.tags,
        category:req.body.category,
        description:req.body.description,
        content:{
            par1:req.body.par1,
            par2:req.body.par2,
            par3:req.body.par3,
            par4:req.body.par4,
            par5:req.body.par5,
            par6:req.body.par6,
            par7:req.body.par7,
            par8:req.body.par8,
            par9:req.body.par9,
            par10:req.body.par10,
            par11:req.body.par11,
            par12:req.body.par12,
            par13:req.body.par13,
            par14:req.body.par14,
            par15:req.body.par15
        },
        mainSection:req.body.mainSelection
    }
    saveImg(article,req.body.img)
    let contentObject = article.content;
    let filteredObject = Object.filter(contentObject,cont=>cont!=="");

    const updatedfilteredArticle = new Article({
        title:req.body.title,
        author:req.body.author,
        tags:req.body.tags,
        category:req.body.category,
        description:req.body.description,
        content:filteredObject,
        mainSection:req.body.mainSelection
    })
    saveImg(updatedfilteredArticle,req.body.img)
    try{
        let updateed = await Article.findOneAndUpdate({
            _id:req.params._id
        },
        updatedfilteredArticle
        ,{useFindAndModify: false});
        res.redirect('/admin/dashboard');
        // res.json(updatedfilteredArticle);
    }catch(err){
        next(err);
        res.status(400).send('problem with loggging /featured')
    }
    
})










router.post('/dashboard/delete/:_id',ensureAuthenticated,async (req,res,next)=>{
    try{
        const deletedPost = await Article.deleteOne({_id:req.params._id},(err)=>{
            console.log(err);
            res.redirect('/admin/dashboard');
        })
    }catch(err){
        next(err)
        console.log(err);
        res.status(400).send('problem with loggging /featured')
    }
})

function saveImg(article,imgEncoded){
    if (imgEncoded==null){
        return ''
    }
    const img = JSON.parse(imgEncoded);
    if(img!=null && imageMimeTypes.includes(img.type)){
        article.img=new Buffer.from(img.data,'base64');
        article.imgType=img.type;
    }
}


module.exports = router;