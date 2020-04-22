const Project = require('../models/project')

module.exports = (req, res, next) => {
    const userId = req.userId
    const idproject = req.params.idproject
    let flag = false

    Project.findById(idproject).then(e=>{
            e.idmembers.map((item, index)=>{
                
                if(item.id.toString() === userId && item.position === "manager"){
                    flag = true
                }
            })
            if(flag){
                next()
            }
            else{
                res.status(203).json({message: 'Not authenticated'})
                return next()
            }
    })
}
