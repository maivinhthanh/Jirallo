const Project = require('../models/project');

module.exports = (req, res, next) => {
    const userId = req.userId
    const idproject = req.params.idproject

    Project.findById(idproject).then(e=>{
            e.idmembers.map((item, index)=>{
                console.log(item.id, userId, item.position)
                if(item.id === userId && item.position === 'Manager'){
                    next()
                }
                else{
                    const error = new Error('Not authenticated.');
                    error.statusCode = 401;
                    res.status(500).json(error)
                    throw error;
                }
            })
    })
};
