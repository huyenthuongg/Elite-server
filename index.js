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

