import cors from "cors";
import express from "express";
// import { json } from "body-parser";
import dotenv from 'dotenv';
import fetch from 'node-fetch'; // Ensure node-fetch is imported

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

let infoData = {};

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

app.get('/info', (req, res)=> {
    console.log('Sending stored data:', infoData);
    res.json(infoData);
})

app.post('/info', (req, res) => {
    console.log('Data received at /info:', req.body);
    infoData = req.body; //save in mem to get later
    res.json({ message: "Data stored successfully" });
});

app.post('/webhook', async (req, res) => {
    try {
        const today = new Date();
        const myHeaders = {
            "Authorization": "Bearer a6e46daa14436ea90677b8f1462b24a2",
            "Content-Type": "application/json"
        };

        const myBody = JSON.stringify({
            "search": {
                "s1": {
                    "field": "Date",
                    "data": `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`,
                    "type": "eq"
                }
            }
        });

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: myBody,
            redirect: 'follow'
        };

        const response = await fetch(`https://3ad6ed09054453.na.deputy.com/api/v1/resource/Timesheet/QUERY`, requestOptions);
        const result = await response.json();

        // Forward the result to /info
        const forwardResponse = await fetch('http://localhost:30001/info', {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(result),
            redirect: 'follow'
        });
        const forwardResult = await forwardResponse.json();

        console.log('Data forwarded to /info:', forwardResult);
        res.send(forwardResult);
    } catch (error) {
        console.error('Error:', error);
        if (!res.headersSent) {
            res.status(500).json({ error: 'Failed to process webhook' });
        }
    }
});



app.get('/test', (req, res) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer a6e46daa14436ea90677b8f1462b24a2");
    myHeaders.append("Access-Control-Allow-Origin", "*");

    var requestOptions = {
        method: 'GET', headers: myHeaders, redirect: 'follow'
    };

    const today = new Date();
    //the employees for the day
    var r;
    fetch(`https://3ad6ed09054453.na.deputy.com/api/v1/supervise/roster/${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`, requestOptions)
    .then(response => response.text())
    .then(result => {
        if (result.ok) {
           // console.log("daily employees info: " + result)
        } else {
            //console.log("something went wrong: " + result)
        }
        res.send(result)
    }).catch(error => console.log('error', error));

})

app.get('/photos', (req, res) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer a6e46daa14436ea90677b8f1462b24a2");
    myHeaders.append("Access-Control-Allow-Origin", "*");

    var requestOptions = {
        method: 'GET', headers: myHeaders, redirect: 'follow'
    };

    //photos of the employees on shift
    fetch(`https://3ad6ed09054453.na.deputy.com/api/v1/supervise/empshiftinfo/436`, requestOptions)
    .then(response => response.text())
    .then(result => {
        res.send(result)
    }).catch(error => console.log('error', error));

})


const listener = app.listen(30001, () => {
    console.log(`Your app is listening on port ${listener.address().port}`);
});

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // or "*" for a public API
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});