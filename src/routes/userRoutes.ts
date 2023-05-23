import { Router } from "express";
import { allUsers, createUser, deleteUser, findUser, updateUser } from "../models/userModel";
import {PrismaClient} from '@prisma/client'

const router = Router();
const prisma = new PrismaClient();

// Create user
router.post('/', async (req, res) => {
    const { email, name, username } =  req.body;

    try{
        const result = await createUser(email, name, username)
        res.send(result)
    }catch(e){
        res.status(400).json({error: "Could not create user"})
    }
})

// Get single user
router.get('/:id', async (req, res) => {
    const {id} = req.params;
    const user = await findUser(id);
    res.send(user)
})

// Get all Users
router.get('/', async (req, res) => {
    const users = await allUsers();
    // const allUsers = await prisma.user.findMany();
    res.send(users)
})

// Update Users
router.put('/:id', async (req, res) => {
    const {id} = req.params;
    const {bio, username, name, image} = req.body

    try {
        const result = await updateUser(id, bio, name, username, image)
        res.send(result)
    } catch (e){
        res.status(400).json({error: "Failed to update the user"})
    }
})

// Delete Users
router.delete('/:id', async (req, res) => {
    const {id} = req.params;
    await deleteUser(id)
    res.sendStatus(200)
})

export default router;