import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken"
import { findTokenById } from "../models/tokenModel";
import { AuthRequest } from "../types/reqType";

const JWT_SECRET = "Client Secret"


export async function authenticateToken(req:AuthRequest, res:Response, next:NextFunction){
    const authHeader = req.headers["authorization"]
    const jwtToken  =  authHeader!.split(" ")[1]

    if(!jwtToken){
        res.sendStatus(401)
    }

    try {
        const jwtPayload = await (jwt.verify(jwtToken, JWT_SECRET) ) as {tokenId:number}     
        // console.log(jwtPayload)
        const dbToken = await findTokenById(jwtPayload.tokenId)
        console.log(dbToken);
        
        if(!dbToken?.isValid || dbToken.expiresAt < new Date()){
            res.status(401).json({error: "Api token is expired"})
        }

        req.user = dbToken?.user
    } catch (e) {
        res.sendStatus(401)
    }

    next()
}