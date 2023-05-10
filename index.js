const express = require('express');
const app = express();

const port = 3000;

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



database = client.db("Elite");
UserCollection = database.collection("User");
AdminCollection = database.collection("Admin");

app.get("/users", cors(), async (req, res) => {
  const result = await UserCollection.find({}).toArray();
  res.send(result);
});
//admin
app.get("/user", cors(), async (req, res) => {
  const result = await AdminCollection.find({}).toArray();
  res.send(result);
});

app.get("/fashions/:id", cors(), async (req, res) => {
  var o_id = new ObjectId(req.params["id"]);
  const result = await fashionCollection.find({ _id: o_id }).toArray();
  res.send(result[0]);
});

app.post("/users",cors(),async(req,res)=>{   
    var crypto = require('crypto'); 
    salt = crypto.randomBytes(16).toString('hex'); 
    

    userCollection = database.collection("User");
    user=req.body
    
  
    hash = crypto.pbkdf2Sync(user.password, salt,1000, 64, `sha512`).toString(`hex`); 
    
    user.password=hash
    user.salt=salt

    await userCollection.insertOne(user)
    
    res.send(req.body)
})

app.put("/users", cors(), async (req, res) => {
  //update json Fashion into database
  await UserCollection.updateOne(
    { _id: new ObjectId(req.body._id) }, //condition for update
    {
      $set: {
        //Field for updating
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        // password: req.body.password,
        phoneNumber: req.body.phone,
        address: req.body.address,
        // avatar: req.body.avatar,
      },
    }
  );
  //send Fahsion after updating
  var o_id = new ObjectId(req.body._id);
  const result = await UserCollection.find({ _id: o_id }).toArray();
  res.send(result[0]);
});

app.post("/login",cors(),async(req,res)=>{
    email=req.body.email
    password=req.body.password

    var crypto = require('crypto'); 
    
    
    // UserCollection = database.collection("User")
    user=await UserCollection.findOne({email:email})
    if(user==null)
        res.send({"email":"not exist","password":"not exist"})
    else
    {
        hash = crypto.pbkdf2Sync(password, user.salt,1000, 64, `sha512`).toString(`hex`); 
        if(user.password==hash)
            res.send(user)
        else
        res.send({"email":email,"password":"wrong password"})
    }    
})

app.put("/fashions", cors(), async (req, res) => {
  //update json Fashion into database
  await fashionCollection.updateOne(
    { _id: new ObjectId(req.body._id) }, //condition for update
    {
      $set: {
        //Field for updating
        style: req.body.style,
        fashion_subject: req.body.fashion_subject,
        fashion_detail: req.body.fashion_detail,
        fashion_image: req.body.fashion_image,
      },
    }
  );
  //send Fahsion after updating
  var o_id = new ObjectId(req.body._id);
  const result = await fashionCollection.find({ _id: o_id }).toArray();
  res.send(result[0]);
});

app.delete("/fashions/:id", cors(), async (req, res) => {
  //find detail Fashion with id
  var o_id = new ObjectId(req.params["id"]);
  const result = await fashionCollection.find({ _id: o_id }).toArray();
  //update json Fashion into database
  await fashionCollection.deleteOne({ _id: o_id });
  //send Fahsion after remove
  res.send(result[0]);
});

// Lượng truy cập sản phẩm
 app.post("/fashions/:id/access",  (req, res) => {
  const id = parseInt(req.params.id);
  const product = products.find(p => p.id === id);
  if (fashion) {
    const access = req.body;
    fashion.views++;
    fashion.accesses.push(access);
    res.json(fashion);
  } else {
    res.status(404).send('Product not found');
  }
});

