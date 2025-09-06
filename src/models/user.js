const mongoose= require('mongoose');

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        maxlength:30,
    },
    lastname:{
        type:String,
        minlength:1,
    },
    age:{
        type:Number,
        min:18,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
    },
    password:{
        type:String,
        required:true,
    },
    gender:{
        type:String,
        lowercase:true,
        validate(value){
            if(!['male','female','other'].includes(value)){ 
                throw new Error('Gender is not valid')
            }
        }
    },
    skills:{
        type:[String]
    }
},{
    timestamps:true
});
mongoose.model('User', userSchema);

module.exports = mongoose.model('User');