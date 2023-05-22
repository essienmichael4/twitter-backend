import express from 'express'

const app = express();

app.use(express.json())

app.get('/', (req, res) => {
    res.send("Hello world, My first server ever  with node is ready, Updated")
})

// Create user
app.post('/user', (req, res) => {
    res.status(501).json({error: "Not implemented"})
})

// Get single user
app.get('/user/:id', (req, res) => {
    const {id} = req.params;
    res.status(501).json({error: `Not implemented`})
})

// Get all Users
app.get('/user', (req, res) => {
    res.status(501).json({error: "Not implemented"})
})

// Update Users
app.put('/user/:id', (req, res) => {
    res.status(501).json({error: "Not implemented"})
})

// Delete Users
app.delete('/user/:id', (req, res) => {
    res.status(501).json({error: "Not implemented"})
})

app.listen(3000, ()=>{
    console.log("Server running on Port 3000");
    
})