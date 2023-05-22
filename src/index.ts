import express from 'express'
import userRoute from './routes/userRoutes'
import tweetRoute from './routes/tweetRoutes'
const app = express();

app.use(express.json())
app.use('/user', userRoute)
app.use('/tweet', tweetRoute)

app.get('/', (req, res) => {
    res.send("Hello world, My first server ever  with node is ready, Updated")
})

app.listen(3000, ()=>{
    console.log("Server running on Port 3000");
    
})