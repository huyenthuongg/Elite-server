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
// review
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
//show bestseller & You may also like
app.get("/product/bestseller", cors(), async (req, res) => {
  const result = await productCollection
    .find({ note: "BestSellers" })
    .toArray();
  res.send(result);
});
//collection 6 items fabric
fabricCollection = database.collection("Fabric");
app.get("/fabric", async (req, res) => {
  await fabricCollection
    .find()     
    .toArray()
    .then((result) => {
      res.send(result);
    });
});

//show detail each fabric
app.get("/product/fabric/satin", cors(), async (req, res) => {
  const result = await productCollection.find({ FabricID: "1" }).toArray();
  res.send(result);
});
app.get("/product/fabric/chiffon", cors(), async (req, res) => {
  const result = await productCollection.find({ FabricID: "2" }).toArray();
  res.send(result);
});
app.get("/product/fabric/velvet", cors(), async (req, res) => {
  const result = await productCollection.find({ FabricID: "3" }).toArray();
  res.send(result);
});
app.get("/product/fabric/tulle", cors(), async (req, res) => {
  const result = await productCollection.find({ FabricID: "4" }).toArray();
  res.send(result);
});
app.get("/product/fabric/sequin", cors(), async (req, res) => {
  const result = await productCollection.find({ FabricID: "5" }).toArray();
  res.send(result);
});
app.get("/product/fabric/crepe", cors(), async (req, res) => {
  const result = await productCollection.find({ FabricID: "6" }).toArray();
  res.send(result);
});

collection 9 items color
colorCollection = database.collection("Color");
app.get("/color", async (req, res) => {
  await colorCollection
    .find()
    .toArray()
    .then((result) => {
      res.send(result);
    });
});
//show detail each color
app.get("/product/color/blue", cors(), async (req, res) => {
  const result = await productCollection
    .find({ "Color.Name": "Blue" })
    .toArray();
  res.send(result);
});
app.get("/product/color/burgundie", cors(), async (req, res) => {
  const result = await productCollection
    .find({ "Color.Name": "Burgundie" })
    .toArray();
  res.send(result);
});
app.get("/product/color/green", cors(), async (req, res) => {
  const result = await productCollection
    .find({ "Color.Name": "Green" })
    .toArray();
  res.send(result);
});
app.get("/product/color/neutral", cors(), async (req, res) => {
  const result = await productCollection
    .find({ "Color.Name": "Neutral" })
    .toArray();
  res.send(result);
});
app.get("/product/color/orange", cors(), async (req, res) => {
  const result = await productCollection
    .find({ "Color.Name": "Orange" })
    .toArray();
  res.send(result);
});
app.get("/product/color/pink", cors(), async (req, res) => {
  const result = await productCollection
    .find({ "Color.Name": "Pink" })
    .toArray();
  res.send(result);
});
app.get("/product/color/purple", cors(), async (req, res) => {
  const result = await productCollection
    .find({ "Color.Name": "Purple" })
    .toArray();
  res.send(result);
});
app.get("/product/color/white", cors(), async (req, res) => {
  const result = await productCollection
    .find({ "Color.Name": "White" })
    .toArray();
  res.send(result);
});
app.get("/product/color/champagne", cors(), async (req, res) => {
  const result = await productCollection
    .find({ "Color.Name": "Champagne" })
    .toArray();
  res.send(result);
});

//viết api gọi review  
app.get("/review/:id", cors(), async (req, res) => {
  var o_id = new ObjectId(req.params["id"]);
  const result = await reviewCollection.find({ _id: o_id }).toArray();
  res.send(result[0]);
});
// viết api tạo review
app.post("/review", cors(), async (req, res) => {
  await reviewCollection.insertOne(req.body);
  res.send(req.body); 
});
//QUESTION
//collection question
questionCollection = database.collection("Question");
app.get("/question", async (req, res) => {
  await questionCollection
    .find({})
    .toArray()
    .then((result) => {
      res.send(result);
    });
});
//viết api gọi question
app.get("/question/:id", cors(), async (req, res) => {
  var o_id = new ObjectId(req.params["id"]);
  const result = await questionCollection.find({ _id: o_id }).toArray();
  res.send(result[0]);
});
//api tạo question
app.post("/question", cors(), async (req, res) => {
  await questionCollection.insertOne(req.body);
  res.send(req.body);
});
//ANSWER
//collection answer
answerCollection = database.collection("Answer");
app.get("/answer", async (req, res) => {
  await answerCollection
    .find({})
    .toArray()
    .then((result) => {
      res.send(result);
    });
});
//viết api gọi answer
app.get("/answer/:id", cors(), async (req, res) => {
  var o_id = new ObjectId(req.params["id"]);
  const result = await answerCollection.find({ _id: o_id }).toArray();
  res.send(result[0]);
});

//INFORMATION - CUSTOMER
customerCollection = database.collection("Customer");
app.get("/customer", async (req, res) => {
  await customerCollection
    .find({})
    .toArray()
    .then((result) => {
      res.send(result);
    });
});
app.get("/customers", cors(), async (req, res) => {
  const result = await customerCollection.find({}).toArray();
  res.send(result)
})

// get customer by id
app.get("/customers/:id", cors(), async (req, res) => {
  var o_id = new ObjectId(req.params['id']);
  const result = await customerCollection.find({ _id: o_id }).toArray();
  res.send(result[0])
})

// post customer
app.post("/customers", cors(), async (req, res) => {
  // put json Customer into database
  await customerCollection.insertOne(req.body)
  // send message to client (send all database to client)
  res.send(req.body)
})

// // put customer => đang có vấn đề put
// app.put("/customers", cors(), async (req, res) => {
//   //update json Customer into database
//   await customerCollection.updateOne(
//       { _id: new ObjectId(req.body._id) },//condition for update
//       {
//           $set: { //Field for updating
//               FirtsName: req.body.FirtsName,
//               LastName: req.body.LastName,
//               Email: req.body.Email,
//               PhoneNumber: req.body.PhoneNumber,
//               Address:req.body.Address,
//           }
//       })
//   //send Fahsion after updating
//   var o_id = new ObjectId(req.body._id);
//   const result = await customerCollection.find({ _id: o_id }).toArray();
//   res.send(result[0])
// })

// delete customer
app.delete("/customers/:id", cors(), async (req, res) => {
  //find detail Customer with id
  var o_id = new ObjectId(req.params["id"]);
  const result = await customerCollection.find({ _id: o_id }).toArray();
  //update json Customer into database
  await customerCollection.deleteOne(
      { _id: o_id }
  )
  //send Fahsion after remove
  res.send(result[0])
})
//INFORMATION - ORDER
orderCollection = database.collection("Order");
app.get("/order", async (req, res) => {
  await orderCollection
    .find({})
    .toArray()
    .then((result) => {
      res.send(result);
    });
});
app.get("/orders", cors(), async (req, res) => {
  const result = await orderCollection.find({}).toArray();
  res.send(result)
})

// get order by id
app.get("/orders/:id", cors(), async (req, res) => {
  var o_id = new ObjectId(req.params['id']);
  const result = await orderCollection.find({ _id: o_id }).toArray();
  res.send(result[0])
})

// post order
app.post("/orders", cors(), async (req, res) => {
  // put json Order into database
  await orderCollection.insertOne(req.body)
  // send message to client (send all database to client)
  res.send(req.body)
})

// // put customer => đang có vấn đề put
// app.put("/orders", cors(), async (req, res) => {
//   //update json Customer into database
//   await orderCollection.updateOne(
//       { _id: new ObjectId(req.body._id) },//condition for update
//       {
//           $set: { //Field for updating
//               FirtsName: req.body.FirtsName,
//               LastName: req.body.LastName,
//               Email: req.body.Email,
//               PhoneNumber: req.body.PhoneNumber,
//               Address:req.body.Address,
//           }
//       })
//   //send Fahsion after updating
//   var o_id = new ObjectId(req.body._id);
//   const result = await orderCollection.find({ _id: o_id }).toArray();
//   res.send(result[0])
// })

// delete order
app.delete("/orders/:id", cors(), async (req, res) => {
  //find detail Order with id
  var o_id = new ObjectId(req.params["id"]);
  const result = await orderCollection.find({ _id: o_id }).toArray();
  //update json Order into database
  await orderCollection.deleteOne(
      { _id: o_id }
  )
  //send Order after remove
  res.send(result[0])
})
