const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    const authHeader = req.get('Authorization')
    if (!authHeader) {
        res.status(203).json({message: 'Not authenticated'})
        return next()
    }
    const token = authHeader
    let decodedToken
    try {
        decodedToken = jwt.verify(token, 'somesupersecretsecret')
    } catch (err) {
        err.statusCode = 500
        res.status(500).json(err)
        return next()
    }
    if (!decodedToken) {
        res.status(203).json({message: 'Not authenticated'})
        return next()
    }
    req.userId = decodedToken.userId
    next()
}
