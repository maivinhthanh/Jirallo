const Activities = require('../models/activities')

exports.getAllActivities = async (req, res, next) => {
    try{
        const perPage = 5
        const page = req.params.page
        const iduser = req.userId
        const count = await Activities.count({iduser: iduser})

        const activities = await Activities.find({iduser: iduser}).sort('datecreate')
        .skip((perPage * page) - perPage)
        .limit(perPage)
        
        res.status(200).json({  activities: activities, 
            current: !page ? '1': page, totalpages: Math.ceil(count / perPage)})
    }
    catch (error) {
        
        next(error)
    }
}