import jwt from 'jsonwebtoken'

//wants to like a post?
//click the like button => check login (auth middleware()) 
//if valid -> next()

//middleware is the function that gets called before the backend perform a function
const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]
        const isGoogleAuth = token.length > 500 

        let decodedData

        if(token && !isGoogleAuth){
            decodedData = jwt.verify(token, 'test')

            req.userId = decodedData?.id
        } else {
            decodedData = jwt.decode(token)
        
            req.userId = decodedData?.sub
        }

        next()
    } catch(error){
        console.log(error)
    }
} 

export default auth