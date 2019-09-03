const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  discription: {
    type: String,
    required: true
  },
  idgroup:{
    type: Schema.Types.ObjectId,
    ref: 'group',
    required: true
  },
  idtask:[
    {
      type: Schema.Types.ObjectId,
      ref: 'task',
      required: true
    }
  ],
  hidden:{ type: Boolean, default: false },
  datecreate: { type: Date, default: Date.now },
  dateedit: { type: Date }
});

module.exports = mongoose.model('Project', projectSchema);
