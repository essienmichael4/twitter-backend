import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient();

export const allUsers = () => {
    return prisma.user.findMany({select: {
        id: true,
        name: true,
        username: true,
        bio: true,
        image: true
    }})
}

export const findUser = (id:string) => {
    return prisma.user.findUnique({ 
        where : { id: Number(id) }, 
        include: {
            tweets:{
                select: {
                    content: true,
                    image: true,
                    impressions: true
                }
            }
        } 
    })
}

export const createUser = (email:string, name:string, username:string) =>{
    return prisma.user.create({
        data: {
            email,
            name,
            username
        }
    })
}

export const updateUser = (id:string, bio?:string, name?:string, username?:string, image?:string) =>{
    return prisma.user.update({
        where:{ id: Number(id)},
        data: {
            bio,
            name,
            username,
            image
        }
    })
}

export const deleteUser = (id:string) => {
    return prisma.user.delete({
        where: {id : Number(id)}
    })
}