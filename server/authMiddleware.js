
const jwt = require('jsonwebtoken');
const User = require('./schemas/user');

const authentication = async(req, res, next) => {

    let headers = req.headers['authorization']

    if(headers) {
        const token = headers.split(' ')[1]
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if(decoded){
            // const user = decoded.user
            const persistedUser = await User.findOne({ _id: decoded._id, 'tokens.token': token})
            if(persistedUser) {
                next()
            } else {
                res.json({error: 'Invalid credentials!'})
            }
        } else {
            res.json({error: 'Unauthorized access!'})
        }
    } else {
        res.json({error: 'Unauthorized access!'})
    }
};

module.exports = authentication;     