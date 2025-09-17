const mongoose = require('mongoose')

// title , content, mood , date, userId

const entrySchema = new mongoose.Schema({
    title : {type : String, required : true},
    content : {type: String, required : true},
    mood : {type : String, required: true, enum: ['happy', 'sad', 'normal', 'surprised']},
    date : {type : Date, default: Date.now}, 
    userId: {
              type: mongoose.Schema.Types.ObjectId,
              ref: 'User',  // reference to User model
              required: true,
    },
}, {timestamps:true} );

module.exports = mongoose.model("Entry", entrySchema);