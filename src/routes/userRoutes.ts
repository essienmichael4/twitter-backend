import { Router } from "express";

const router = Router();

// Create user
router.post('/', (req, res) => {
    res.status(501).json({error: "Not implemented"})
})

// Get single user
router.get('/:id', (req, res) => {
    const {id} = req.params;
    res.status(501).json({error: `Not implemented ${id}`})
})

// Get all Users
router.get('/', (req, res) => {
    res.status(501).json({error: "Not implemented"})
})

// Update Users
router.put('/:id', (req, res) => {
    res.status(501).json({error: "Not implemented"})
})

// Delete Users
router.delete('/user/:id', (req, res) => {
    res.status(501).json({error: "Not implemented"})
})

export default router;