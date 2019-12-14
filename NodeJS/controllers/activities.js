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
        
        res.status(201).json({ statusCode: 200, activities: activities, 
            current: !page ? '1': page, totalpages: Math.ceil(count / perPage)})
    }
    catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500
        }
        res.status(500).json(error)
        next(error)
    }
}