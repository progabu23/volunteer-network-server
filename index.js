const port = 5000;
const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors')
const app = express()

app.use(cors())
app.use(bodyParser.json())

app.get('/' , (req, res) =>{
    res.send('Hello From MongoDB ITS Working')
})

const MongoClient = require('mongodb').MongoClient;
require('dotenv').config()
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.xc4gw.mongodb.net/volunteerNetwork?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    const collection = client.db("volunteerNetwork").collection("volunteerInfo");
    
    app.post('/addReg', (req, res)=>{
        const newReg = req.body;
        collection.insertOne(newReg)
        .then(result =>{
            res.send(result)
        })
        console.log(newReg);
    })
    app.get('/event', (req, res) =>{
        
        collection.find({email: req.query.email})
        .toArray((err, documents)=>{
            res.send(documents)
        })
    })
});


app.listen(process.env.PORT || port)