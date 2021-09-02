var mongoose = require('mongoose')

const getData = new mongoose.Schema(
    {
       id : {type:Number,required:true},
       title: {type:String,required:true},
       price: {type:Number,required:true},
       description: {type:String,required:true},
       category: {type:String,required:true},
       image: {type:String,required:true}
        
        
    }
)



module.exports=mongoose.model("getData",getData,"store")


