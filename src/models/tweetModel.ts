import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient();

export const allTweets = () => {
    return prisma.tweet.findMany({include: {user: true}})
}

export const createTweet = (userId: number ,content:string, image?:string) => {
    return prisma.tweet.create({
        data : { content, image, userId}
    })
}

export const getTweet = (id: string) => {
    return prisma.tweet.findUnique({where : { id : Number(id)}})
}
export const updateTweet = (id:string, content:string, image?:string) => {
    return prisma.tweet.update({
        where : {id: Number(id)},
        data: { content, image }
    })
}

export const deleteTweet = (id:string) => {
    return prisma.tweet.delete({
        where: {id: Number(id)}
    })
}