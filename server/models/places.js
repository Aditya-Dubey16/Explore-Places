const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const placeSchema = new Schema({
  name : {
    type : String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  likeCount: {
    type: Number,
    default: 0
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
},

{
  timestamps: true
});

var Places = mongoose.model('Place', placeSchema);

module.exports = Places;
