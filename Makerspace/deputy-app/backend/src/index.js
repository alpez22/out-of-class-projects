import cors from "cors";
import express from "express";
// import { json } from "body-parser";
import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.get('/webhook', (req, res) => {
  if (req.query['challenge']) {
    res.set('Content-Type', 'text/plain')
    res.send(req.query['challenge'])
  } else {
    console.log('No challenge')
    res.status(400)
    res.end()
  }
  console.log("hi")
  // res.set('Content-Type', 'text/plain')
  // res.send("hello")
})

app.post('/webhook', (req, res) => {
  console.log(req.body)
  console.log(req.headers)
  //should give the data infos
  console.log(req.data)
  console.log("working")
  res.json({"yo": "hey"})
})


const listener = app.listen(process.env.PORT, () => {
  console.log(`Your app is listening on port ${listener.address().port}`);
});

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // or "*" for a public API
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
