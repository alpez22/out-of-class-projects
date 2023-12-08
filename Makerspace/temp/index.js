const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");

require("dotenv").config();

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/webhook', (req, res) => {
  // if (req.query['challenge']) {
  //   res.set('Content-Type', 'text/plain')
  //   res.send(req.query['challenge'])
  // } else {
  //   console.log('No challenge')
  //   res.status(400)
  //   res.end()
  // }
  console.log("hi")
  res.set('Content-Type', 'text/plain')
  res.send("hello")
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