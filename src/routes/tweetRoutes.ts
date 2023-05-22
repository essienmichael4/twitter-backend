import { Router } from "express";

const router = Router();

// Create tweet
router.post('/', (req, res) => {
    res.status(501).json({error: "Not implemented"})
})

// Get single tweet
router.get('/:id', (req, res) => {
    const {id} = req.params;
    res.status(501).json({error: `Not implemented ${id}`})
})

// Get all Tweets
router.get('/', (req, res) => {
    res.status(501).json({error: "Not implemented"})
})

// Update tweet
router.put('/:id', (req, res) => {
    res.status(501).json({error: "Not implemented"})
})

// Delete tweet
router.delete('/user/:id', (req, res) => {
    res.status(501).json({error: "Not implemented"})
})

export default router;