//middleware calls befor any action that will be happen
//here forinstance a user wants to like a post then the middleware says that he or she
//is aothorized to like it or not
//authmiddleware(next) => means yes it is authorized

import jwt from 'jsonwebtoken'

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const isCustomAuth = token.length < 500;
        let decodedData;
        if (token && isCustomAuth) {
            //now it is cumstom login
            //test is the secret key we used
            decodedData = jwt.verify(token, 'test')
            req.userId = decodedData?.id
        } else {
            //it is google oath
            decodedData = jwt.decode(token)
            //sub is googles name for specific id that differentiate every single google user
            req.userId = decodedData?.sub
        }
        next()
    } catch (error) {
        console.log(error)
    }
}

export default auth