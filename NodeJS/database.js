const mongoose = require('mongoose')
require('dotenv').config()

const DB_URI = 
`mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_CLUSTER}-2fwoo.mongodb.net/${process.env.DATABASE_DATABASE}?retryWrites=true&w=majority`

function connect() {
    return new Promise((resolve, reject) => {

        if (process.env.NODE_ENV === 'test') {
        const Mockgoose = require('mockgoose').Mockgoose
        const mockgoose = new Mockgoose(mongoose)
        
        mockgoose.prepareStorage()
            .then(() => {
            mongoose.connect(DB_URI,
                { useNewUrlParser: true, useCreateIndex: true })
                .then((res, err) => {
                if (err) return reject(err)
                resolve()
                })
            })
        } else {
            mongoose.set('useFindAndModify', false);
            mongoose.connect(DB_URI,
            { useNewUrlParser: true, useCreateIndex: true })
            .then((res, err) => {
                if (err) return reject(err)
                resolve()
            })
        }
    })
}

function close() {
    return mongoose.disconnect()
}

module.exports = { connect, close }