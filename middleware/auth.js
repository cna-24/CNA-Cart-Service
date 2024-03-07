const jwt = require('jsonwebtoken')
require('dotenv').config() // läs in alla variabler i .env

module.exports = (req, res, next) => {
    console.log('auth middleware')

    try {
        
    //Plocka ut jwt från headern
    const token = req.headers['authorization'].split(' ')[1]

    //const token = process.env.TOKEN

    //Verifiera token och spara användarinfo
    const authUser = jwt.verify(token, process.env.JWT_SECRET)   

    //Spara användare i req
    req.authUser = authUser
    //req.userId = authUser.userId

    console.log(authUser)

    next()

} catch (error) {
        console.log("JWT error: ", error.message)
        res.status(401).send({
            message:"Authorization failed",
            error: error.message
        })
    }
}