const app = require('./app.js')
const db = require('./database')

const PORT = process.env.PORT || 8080

db.connect()
    .then(() => {
        app.listen(PORT, () => {
        console.log('Listening on port: ' + PORT)
        })
})