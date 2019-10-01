const Project = require('../models/project')
const {ObjectId} = require('mongodb')

module.exports = (req, res, next) => {
    const userId = req.userId
    const idproject = req.params.idproject

    Project.findById(idproject).then(e=>{
            e.idmembers.map((item, index)=>{
                console.log(item.id.toString(), userId, item.position)
                console.log(item.id.toString() === userId )
                console.log(item.position === 'Manager' )
                if(item.id.toString() === userId && item.position === "Manager"){
                    console.log('ok')
                    next()
                }
                else{
                    console.log('not ok')
                    const error = new Error('Not authenticated.')
                    error.statusCode = 401
                    res.status(500).json(error)
                    throw error
                }
            })
    })
}
