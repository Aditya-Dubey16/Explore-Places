var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var likeSchema = new Schema({
    user: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
    , places: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Place'
      }
    ]
}
, {
    timestamps : true
}
);

var Likes = mongoose.model('Like', likeSchema);

module.exports = Likes;
