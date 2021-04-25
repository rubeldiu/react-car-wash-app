const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const ObjectId = require("mongodb").ObjectId;
require("dotenv").config();
const MongoClient = require("mongodb").MongoClient;
const fileUpload = require("express-fileupload");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(fileUpload());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ulzfk.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Car Washing Apps running...");
});

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
client.connect((err) => {
  const servicesCollection = client.db("carwash").collection("services");
  const orderCollection = client.db("carwash").collection("orders");
  const feedbackCollection = client.db("carwash").collection("clientsFeedback");
  const adminCollection = client.db("carwash").collection("admins");

  console.log("Database Connected!!!");

  //========================= ADMIN Section  ============================
  app.post("/makeAdmin", (req, res) => {
    const email = req.body.email;
    adminCollection.insertOne({ email }).then((result) => {
      res.send(result.insertedCount > 0);
    });
  });

  app.post("/isAdmin", (req, res) => {
    const email = req.body.email;
    adminCollection.find({ email: email }).toArray((err, documents) => {
      res.send(documents.length > 0);
    });
  });
  
  app.get('/orders', (req, res) => {
    orderCollection.find({})
        .toArray((err, documents) => {
            res.send(documents);
        })
})

app.patch("/updateOrders/:id", (req, res) => {
  orderCollection.updateOne({ _id: ObjectId(req.params.id) },

      {
          $set: {status: req.body.status}
      })
      .then(result => {
          res.send(result.modifiedCount > 0)
      })
})


  //========================= ADD SERVICE  ============================
  app.post("/addOrder", (req, res) => {
    const newOrder = req.body;
    orderCollection.insertOne(newOrder).then((result) => {
      res.send(result.insertedCount > 0);
    });
  });

  //========================= SHOW LOGGED IN CLIENT SERVICE LIST ==============================
  app.get("/clientServices", (req, res) => {
    orderCollection
      .find({email: req.query.email })
      .toArray((err, documents) => {
        res.send(documents);
      });
  });

  //============================== ADD SERVICE (CREATE) ======================================

  app.post("/addService", (req, res) => {
    const file = req.files.file;
    const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;
    const newImg = file.data;
    const encImg = newImg.toString("base64");

    var image = {
      contentType: file.mimetype,
      size: file.size,
      img: Buffer.from(encImg, "base64"),
    };

    servicesCollection
      .insertOne({ title, description, price, image })
      .then((result) => {
        res.send(result.insertedCount > 0);
      });
  });
  //========================= READ SERVICE  ===================================
  app.get("/services", (req, res) => {
    servicesCollection.find({}).toArray((err, documents) => {
      res.send(documents);
    });
  });


    //========================= DELETE SERVICE BY ID  ===================================
    app.delete("/deleteService/:id", (req, res) => {
      console.log("id:", req.params.id)  
      servicesCollection.deleteOne({ _id: ObjectId(req.params.id) })
          .then((result) => {
              res.send(result.deletedCount > 0)
          })
  })



  //========================= READ USER SERVICE BY ID===================================
  app.get("/services/:_id", (req, res) => {
    servicesCollection
      .find({ _id: ObjectId(req.params._id) })
      .toArray((err, documents) => {
        res.send(documents[0]);
      });
  });

  //============================== ADD FEEDBACK ======================================
  app.post("/addReview", (req, res) => {
    const feedback = req.body;
    feedbackCollection.insertOne(feedback).then((result) => {
      res.send(result.insertedCount > 0);
    });
  });

  //========================= READ FEEDBACK===================================
  app.get("/reviews", (req, res) => {
    feedbackCollection.find({}).toArray((err, documents) => {
      res.send(documents);
    });
  });
});

app.listen(port, () => console.log("Listening to port 5000"));
