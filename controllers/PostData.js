var mongoose = require('mongoose')

const postData = new mongoose.Schema(
    {
       id : {type:Number,required:false},
       title: {type:String,required:true},
       price: {type:Number,required:true},
       description: {type:String,required:true},
       category: {type:String,required:true},
       image: {type:String,required:true}
        
        
    }
)



module.exports=mongoose.model("postData",postData,"store")


