
const jwt = require('jsonwebtoken');

function authentication(req, res, next) {
    let headers = req.headers['authorization']

    if(headers) {
        const token = headers.split(' ')[1]
        var decoded = jwt.verify(token, process.env.JWT_SECRET)
        const id = decoded._id
        const persistedUser = User.find(u => u.id == id)
        if(persistedUser) {
            next()
        } else {
            res.json({error: 'Unauthorized access!'})
        }
    } else {
        res.json({error: 'Unauthorized access!'})
    }
    next()
}

module.exports = authentication; 