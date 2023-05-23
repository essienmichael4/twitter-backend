import { Router } from "express";
import { allTweets, createTweet, deleteTweet, getTweet, updateTweet } from "../models/tweetModel";

const router = Router();

// Create tweet
router.post('/', async (req, res) => {
    const {content, image, userId} = req.body
    console.log({content, image, userId});
    
    const tweet = await createTweet(userId, content, image)

    res.send(tweet)
    // res.status(501).json({error: "Not implemented"})
})

// Get single tweet
router.get('/:id', async (req, res) => {
    const {id} = req.params;
    const tweet = await getTweet(id)

    if(!tweet){
        return res.status(404).json({error: "Tweet not found"})
    }
    res.send(tweet)
    // res.status(501).json({error: `Not implemented ${id}`})
})

// Get all Tweets
router.get('/', async (req, res) => {
    const tweets = await allTweets()

    res.send(tweets)
    // res.status(501).json({error: "Not implemented"})
})

// Update tweet
router.put('/:id', async (req, res) => {
    const {id} = req.params;
    const {content, image} = req.body

    const tweet = await updateTweet(id, content, image)
    res.send(tweet)
    // res.status(501).json({error: "Not implemented"})
})

// Delete tweet
router.delete('/:id', async (req, res) => {
    const {id} = req.params;
    await deleteTweet(id)
    res.sendStatus(200)
    // res.status(501).json({error: "Not implemented"})
})

export default router;