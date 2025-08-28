const mongoose = require('mongoose')

// title , content, mood , date

const entrySchema = new mongoose.Schema({
    title : {type : String, required : true},
    content : {type: String, required : true},
    mood : {type : String, required: true, enum: ['happy', 'sad', 'neutral', 'excited', 'angry']},
    date : {type : Date, default: Date.now}, 
}, {timestamps:true} );

module.exports = mongoose.model("Entry", entrySchema);