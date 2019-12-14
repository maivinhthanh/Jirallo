const path = require('path')

const express = require('express')
const bodyParser = require('body-parser')

const authRoutes = require('./routes/auth')
const projectRoutes = require('./routes/project')
const epicRoutes = require('./routes/epic')
const sprintRoutes = require('./routes/sprint')
const issuesRoutes = require('./routes/issues')
const activitiesRoutes = require('./routes/activities')

const app = express() 

app.use(bodyParser.urlencoded({extended: true})) // x-www-form-urlencoded <form>
app.use(bodyParser.json()) // application/json

app.use('/images', express.static(path.join(__dirname, 'images')))

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader(
        'Access-Control-Allow-Methods',
        'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    )
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    return next()
})

app.use('/auth', authRoutes)
app.use('/project', projectRoutes)
app.use('/epic', epicRoutes)
app.use('/sprint', sprintRoutes)
app.use('/issues', issuesRoutes)
app.use('/activities', activitiesRoutes)

app.use((err, req, res, next) => {
    res.status(500).json({
        message: 'Error',
    });
    return next(err); 
})

module.exports = app
