const express = require('express');
const app = express();
const port = 3002;
const morgan=require("morgan")
app.use(morgan("combined"))
const bodyParser=require("body-parser")
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
const cors=require("cors");
app.use(cors())
app.listen(port,()=>{
console.log(`My Server listening on port ${port}`)
})
app.get("/",(req,res)=>{
res.send("This Web server is processed for MongoDB")
})
const { MongoClient, ObjectId } = require('mongodb');
client = new MongoClient("mongodb://127.0.0.1:27017");
client.connect();
database = client.db("ELITE");
homepageCollection = database.collection("Homepage");
ourstoryCollection = database.collection("OurStory");
productCollection = database.collection("Product");

/*Get data homepage*/
app.get("/homepage",cors(),async (req,res)=>{
    const result = await homepageCollection.find({}).toArray();
    res.send(result)
    }
    )
/*Get data Our Story*/
app.get("/ourstory",cors(),async (req,res)=>{
    const result = await ourstoryCollection.find({}).toArray();
    res.send(result)
    }
    )
/*Get Product color*/
app.get("/product", cors(), async (req, res) => {
    const result = await productCollection.find({"Color.Name":"Blue"}).toArray();
    res.send(result);
    });
// Truyền đối số
