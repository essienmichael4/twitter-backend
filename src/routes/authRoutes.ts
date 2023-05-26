import { Router } from "express";
// import { PrismaClient } from "@prisma/client";
import { createJWTToken, createUserToken, findEmailToken, generateJWTToken, invalidateEmailToken } from "../models/tokenModel";
const router = Router()
// const prisma = new PrismaClient()

const Email_Token_Expiration_Duration = 10
const JWT_Token_Expiration_Duration = 10

function generateDigitToken():string{
    return Math.floor(100000 + Math.random() * 900000).toString()
}

router.post('/login',async (req, res) => {
    const {email} = req.body

    try{
        const token = generateDigitToken()
        const expiration = new Date(new Date().getTime() + Email_Token_Expiration_Duration * 60 * 1000).toISOString()
        
        const result = await createUserToken(email, expiration, token)

        res.send(result)
    }catch(e){
        res.status(400).json({error: "Couldn't start authentication"})
    }
})

router.post('/authenticate', async (req, res) => {
    const {email, emailToken} = req.body
    const expiration = new Date(new Date().getTime() + JWT_Token_Expiration_Duration * 60 * 60 * 1000).toISOString()
    const dbEmailToken  = await findEmailToken(emailToken)

    if (!dbEmailToken || !dbEmailToken.isValid){
        res.sendStatus(401)
    }

    if (dbEmailToken!.expiresAt < new Date()){
        res.status(401).json({error: "Token has expired"})
    }

    if (email != dbEmailToken?.user?.email){
        return res.sendStatus(401)
    }

    const apiToken = await createJWTToken(expiration, email)

    const upadateEmailToken = await invalidateEmailToken(dbEmailToken!.id)

    const generateToken = generateJWTToken(apiToken.id)

    res.send({generateToken})
})

export default router;