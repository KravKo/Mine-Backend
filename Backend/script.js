import express from 'express';
import cors from 'cors'

const port = 3000;
const app = express();


app.use(cors());
app.use(express.json());


let gameState = {
    outcome : "win",
}

app.listen(port,()=>{
    console.log("Server started at http://localhost:"+port);
})


app.get("/api/status", (req, res)=>{
    res.json(gameState);
})

app.post("/api/status", (req, res)=>{
    res.status(200);
    return res.json({Message: 'Updated', gameState})
})

