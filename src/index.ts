import express from 'express'
import userRoute from './routes/userRoutes'
import tweetRoute from './routes/tweetRoutes'
import authRoute from './routes/authRoutes'
import { authenticateToken } from './middleware/authService'

const app = express();

app.use(express.json())
app.use('/api/v1/user', authenticateToken, userRoute)
app.use('/api/v1/tweet', authenticateToken, tweetRoute)
app.use('/api/v1/auth', authRoute)

app.get('/', (req, res) => {
    res.send("Hello world, My first server ever  with node is ready, Updated")
})

app.listen(3000, ()=>{
    console.log("Server running on Port 3000");
    
})