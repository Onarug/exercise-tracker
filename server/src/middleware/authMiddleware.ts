import jwt  from "jsonwebtoken";
import { prisma } from '../utils/prisma.js'
import { Request, Response, NextFunction } from "express";

const JWT_SECRET = process.env.JWT_SECRET;
if(!JWT_SECRET){
    throw new Error("JWT_SECRET environment variable is missing");
}
 const  authMiddleware = async (req :Request, res : Response, next : NextFunction) => {
    let token;
    console.log("Authenticating");
    // Get jwt token from header
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies?.jwt) {
        token = req.cookies.jwt;
    }

    if(!token){
        return res.status(401).json({error: "Auth token not provided"});
    }
    try {

        const decoded = jwt.verify(token,JWT_SECRET);

        if(typeof decoded === 'object' && decoded != null && 'id' in decoded){
            const user = await prisma.user.findUnique({
                where: {id : decoded.id}
            });
            if(!user){
                return res.status(401).json({ 
                    error: "User not found when authenticating" 
                });
            }
            req.user = user;
            return next();
        }


        
        return res.status(401).json({
             error: "Invalid token " 
            });
    } catch (err){
        console.error(err);
        return res.status(401).json({
            error : "Error with authenticating token"
        })
    }

}



export {authMiddleware}