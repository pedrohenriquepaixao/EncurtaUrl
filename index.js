import express from 'express';
import sqlite3 from 'sqlite3';
import pkg from 'sqlite';
const { open } = pkg;


const app = express();
app.use(express.json())

app.all("/", (req,res)=>{
    const { URL , nomeUrl } = req.body;
    // const url = req.body.URL || false;
    // const newUrl = req.body.NOME || false;

    res.send(URL || false)
})

app.listen(8081,()=>{
    console.log("Subiu o APP")
})