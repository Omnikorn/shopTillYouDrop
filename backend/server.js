import express  from "express";
import data from './data.js'
import cors from 'cors'

const app = express()

//app.use(express.json())
//app.use(cors())

app.get('/api/products', (req,res)=>{
    res.send(data)
})


const port =  5000;
app.listen(port,()=>{
    console.log(`listening at port ${port}`)
})