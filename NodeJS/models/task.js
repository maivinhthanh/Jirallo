const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Author = Object.freeze({
    Manager: 'manager',
    Dev: 'dev',
    Tester: 'tester',
});
const Process = Object.freeze({
    Done: 'done',
    Access: 'access',
});
const Type = Object.freeze({
    Todo: 'todo',
    Bug: 'bug',
});

const taskSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  author: {
    type: String,
    enum: Object.values(Author),
  },
  process:{
    type: String,
    enum: Object.values(Process),
  },
  type:{
    type: String,
    enum: Object.values(Type),
  },
  discript:{
    type: String,
    required: true
  },
  image:[
      {
        type: String,
        required: true
      }
  ],
  comment:[
      {
        
      }
    ],
  hidden:{ type: Boolean, default: false },
  datecreate: { type: Date, default: Date.now },
  dateedit: { type: Date }
});

Object.assign(taskSchema.statics, {
    Author,Process,Type
  });
  

module.exports = mongoose.model('Task', taskSchema);
