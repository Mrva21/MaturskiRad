const express = require('express');
const router = express.Router();

const {MongoClient, ObjectId} = require('mongodb');

const client = new MongoClient("mongodb+srv://nemanjalazovic4_db_user:nemanja555@cluster0.dp1huck.mongodb.net/?appName=Cluster0");

let db;
client.connect().then(() => {
  db = client.db('pixeljudge');
  console.log("Uspesno smo se povezali na Mongo bazu");
});

router.get('/users', async(req, res) => {
  try {
    const rez = await db.collection('users').find().toArray();
    res.json(rez);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get('/user/:email', async(req, res) => {
  try {
    const email = req.params.email;
    const rez = await db.collection('users').findOne({
      email: email
    });
    res.json(rez);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post('/user', async(req, res) => {
  try {
    const nov = req.body;
    const rez = await db.collection('users').insertOne(nov);
    res.json({
      poruka: "Account created successfully!",
      idInserted: rez.idInserted
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

router.patch('/user/:id', async(req, res) => {
  try {
    const id = new ObjectId(req.params.id);
    const nov = req.body;
    const rez = await db.collection('users').updateOne({
      _id: id
    }, { $set: nov });
    res.send("Comment updated successfully!");
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get('/allcomments/:id', async(req, res) => {
  try {
    const id = new ObjectId(req.params.id);
    const rez = await db.collection('comments').find({
      user_id: id
    }).toArray();
    res.json(rez);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get('/comments/:id', async(req, res) => {
  try {
    const id = req.params.id;
    const rez = await db.collection('comments').find({
      game_id: id
    }).toArray();
    res.json(rez);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post('/comment', async(req, res) => {
  try {
    const nov = req.body;
    nov.user_id = new ObjectId(nov.user_id);
    const rez = await db.collection('comments').insertOne(nov);
    res.json({
      poruka: "Comment created successfully!",
      idInserted: rez.idInserted
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete('/comment/:id', async(req, res) => {
  try {
    const id = new ObjectId(req.params.id);
    const rez = await db.collection('comments').deleteOne({
      _id: id
    });
    res.json({
      poruka: "Comment created successfully!",
      idInserted: rez.idInserted
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

router.patch('/comment/:id', async(req, res) => {
  try {
    const id = new ObjectId(req.params.id);
    const nov = req.body;
    const rez = await db.collection('comments').updateOne({
      _id: id
    }, { $set: nov });
    res.send("Comment updated successfully!");
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get('/', (req, res) => {
  res.send("OBRADA");
});

module.exports = router;