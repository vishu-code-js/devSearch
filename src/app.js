const express= require('express');

const app=express();

app.get('/',(req,res)=>{
    res.send('Hello Vishwassundar')
})

app.use('/test',(req,res)=>{
    res.send('This is your first route exercise')
})


app.listen(3000,(req,res)=>{
    console.log('App is listening to port 3000')
})