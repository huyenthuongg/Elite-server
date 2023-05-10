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
sliderCollection = database.collection("Slider");
crewCollection = database.collection("Crew");
ourstoryCollection = database.collection("OurStory");
productCollection = database.collection("Product");

//HOMEPAGE
// Get data homepage - slider
app.get("/slider",cors(),async (req,res)=>{
    const result = await sliderCollection.find({}).toArray();
    res.send(result)
    }
    ) 
// Get data homepage - crew
app.get("/crew",cors(),async (req,res)=>{
    const result = await crewCollection.find({}).toArray();
    res.send(result)
    }
    )
// Get data homepage - ourstory
app.get("/ourstory",cors(),async (req,res)=>{
    const result = await ourstoryCollection.find({}).toArray();
    res.send(result)
    }
    ) 

//PRODUCT
//Get all Product
app.get("/product",cors(),async (req,res)=>{
  const result = await productCollection.find({}).toArray();
  res.send(result)
  }
  )
//Get data Product Detail
app.get('/product/:id', cors(), async (req, res) => {
  const id = req.params["id"];
  const result = await productCollection.find({ ProductID: id }).toArray();
  res.send(result[0]);
});
//collection review
  reviewCollection = database.collection("Review");
  app.get("/review", async (req, res) => {
    await reviewCollection
      .find({})
      .toArray()
      .then((result) => {
        res.send(result);
      });
  });
  //View product review
  app.get("/review/:id", cors(), async (req, res) => {
    var o_id = new ObjectId(req.params["id"]);
    const result = await reviewCollection.find({ _id: o_id }).toArray();
    res.send(result[0]);
  });
