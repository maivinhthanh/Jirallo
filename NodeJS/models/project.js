const mongoose = require('mongoose')
const Schema = mongoose.Schema

const projectSchema = new Schema({
<<<<<<< HEAD
    name: {
        type: String,
        required: true
    },
    key: {
        type: String,
    },
    description: {
        type: String,
    },
    image: {
        type: String
    },
    idmembers:[
        {
        type: Schema.Types.Mixed,
        ref: 'user',
        required: true
        }
    ],
    idepic:[
        {
        type: Schema.Types.ObjectId,
        ref: 'epic',
        required: true
        }
    ],
    idsprint:[
        {
        type: Schema.Types.ObjectId,
        ref: 'sprint',
        required: true
        }
    ],
    idissues:[
        {
        type: Schema.Types.ObjectId,
        ref: 'issues',
        required: true
        }
    ],
    hidden:{ type: Boolean, default: false },
    datecreate: { type: Date, default: Date.now },
    dateedit: { type: Date }
})
=======
  name: {
    type: String,
    required: true
  },
  key: {
    type: String,
  },
  discription: {
    type: String,
  },
  image: {
    type: String
  },
  idmembers:[
    {
      type: Schema.Types.Mixed,
      ref: 'user',
      required: true
    }
  ],
  idepic:[
    {
      type: Schema.Types.ObjectId,
      ref: 'epic',
      required: true
    }
  ],
  idsprint:[
    {
      type: Schema.Types.ObjectId,
      ref: 'sprint',
      required: true
    }
  ],
  idissues:[
    {
      type: Schema.Types.ObjectId,
      ref: 'issues',
      required: true
    }
  ],
  hidden:{ type: Boolean, default: false },
  datecreate: { type: Date, default: Date.now },
  dateedit: { type: Date }
});
>>>>>>> d95ac2b3d1bf43d3472e444bb1620996b5d1fb62

module.exports = mongoose.model('Project', projectSchema)
