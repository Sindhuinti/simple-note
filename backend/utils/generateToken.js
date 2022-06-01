const jwd = require('jsonwebtoken');

const generateToken = (id) => {
    return jwd.sign({id},process.env.JWT_SECRET,{
        expiresIn:"30d",
    });
};

module.exports = generateToken;