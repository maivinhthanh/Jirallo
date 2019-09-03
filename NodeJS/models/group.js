const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const groupSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  manager:{
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  members:[
    {
      type: Schema.Types.ObjectId,
      ref: 'user'
    }
  ],
  hidden:{ type: Boolean, default: false },
  datecreate: { type: Date, default: Date.now },
  dateedit: { type: Date }
});

module.exports = mongoose.model('Group', groupSchema);