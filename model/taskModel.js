import mongoose from "mongoose";
const TaskSchema  = mongoose.Schema({
    title : {
        type: String,
        required: [true, 'title is required.'],
        trim: true,
        // unique: true,
        // maxLength: [8, 'Please enter valid employee code. Please check.']
    },
    description: {
        type: String,
        required: [true, 'description is must.'],
        trim: true,
    }, 
    status: {
        type: String,
        required: [true, 'status is must.'],
        trim: true,
    }, 
    userId: {
       type: mongoose.Schema.ObjectId,
        ref: 'user',
        required: [ true, 'Must have the User details.' ]
    }
},
{
    timestamps: true,
})
// create model 
const TaskModel = mongoose.model('task', TaskSchema);

// export section 
    export default TaskModel;