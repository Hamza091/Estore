var mongoose = require('mongoose')


const userData = new mongoose.Schema({

        userProducts:{type:Array,required:true},
        totalAmount:{type:Number,require:true},
        noOfProducts:{type:Number,require:true},
        userName:{type:String,required:true},
        userId:{type:String,required:true}


})


module.exports= mongoose.model("userData",userData,"userData")
