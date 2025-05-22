import mongoose from "mongoose";


const UserSchema  = mongoose.Schema({
    username : {
        type: String,
        required: [true, 'Username is required.'],
        trim: true,
        // unique: true,
        // maxLength: [8, 'Please enter valid employee code. Please check.']
    },
    emailId:{
        type: String,
        required: [true, 'EmailId is required.'],
        trim: true,
    },
    password: {
        type: String,
        // minLength: [8, 'Password is too short.'],
        required: [true, 'Password is must.'],
        trim: true,
    }, 
   
},
{
    timestamps: true,
})
// create model 
const UserModel = mongoose.model('user', UserSchema);

// export section 
    export default UserModel