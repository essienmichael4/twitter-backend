import {PrismaClient} from '@prisma/client'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient();
const JWT_SECRET = "Client Secret"

export const createUserToken = (email:string, expiresAt:string, emailToken: string) =>{
    
    return prisma.token.create({
        data: { 
            emailToken, 
            expiresAt, 
            type: "EMAIL",
            user: {
                connectOrCreate: {
                    where: { email },
                    create: { email }
                }
            }
        },
    })
}

export const findEmailToken = (emailToken:string) => {
    return prisma.token.findUnique({
        where: {emailToken},
        include: { user: true }
    })
}

export const invalidateEmailToken = (id:number) => {
    return prisma.token.update({
        where: {id},
        data: {
            isValid: false
        }
    })
}

export const createJWTToken = (expiresAt:string, email:string) => {
    return prisma.token.create({
        data:{
            type: "JWT",
            expiresAt,
            user: {
                connect: {
                    email
                }
            }
        }
        
    })
}

export const findTokenById = (id:number) => {
    return prisma.token.findUnique({
        where: {id},
        include: {user: true}
    })
}

export const generateJWTToken = (tokenId:number):string => {
    const jwtPayload = {tokenId}

    return jwt.sign(jwtPayload, JWT_SECRET, {
        algorithm: "HS256",
        noTimestamp: true
    })
} 