const mongoose = require('mongoose');

// const ArticleSchema = mongoose.Schema({
//     title:{
//         type:String,
//         required:true
//     },
//     author:{
//         type:String,
//         required:true
//     },
//     tags:{
//         type:[String],
//         required:false
//     },
//     category:{
//         type:String,
//         required:true
//     },
//     description:{
//         type:String,
//         required:true
//     },
//     content:{
//         type:{
//             par1:{type:String,required:true},
//             par2:{type:String},
//             par3:{type:String},
//             par4:{type:String},
//             par5:{type:String},
//             par6:{type:String},
//             par7:{type:String},
//             par8:{type:String},
//             par9:{type:String},
//             par10:{type:String},
//             par11:{type:String},
//             par12:{type:String},
//             par13:{type:String},
//             par14:{type:String},
//             par15:{type:String}

//         }
//     },
//     date:{
//         type:Date,
//         default:Date.now
//     },
//     file:{
//         type:String,
//         required:true
//     },
//     mainSection:{
//         type:String,
//     }
// })

const opts = { toJSON: { virtuals: true } };

const ArticleSchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    tags:{
        type:[String],
        required:false
    },
    category:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    content:{
        type:{
            par1:{type:String,required:true},
            par2:{type:String},
            par3:{type:String},
            par4:{type:String},
            par5:{type:String},
            par6:{type:String},
            par7:{type:String},
            par8:{type:String},
            par9:{type:String},
            par10:{type:String},
            par11:{type:String},
            par12:{type:String},
            par13:{type:String},
            par14:{type:String},
            par15:{type:String}

        }
    },
    date:{
        type:Date,
        default:Date.now
    },
    img:{
        type:Buffer
    },
    imgType:{
        type:String
    },
    mainSection:{
        type:String,
    },
},opts)


ArticleSchema.virtual('articleImgPath').get(function(){
    if(this.img != null && this.imgType != null){
        return `data:${this.imgType};charset=utf-8;base64,${this.img.toString('base64')}`
    }
})


module.exports = mongoose.model('Articles',ArticleSchema);