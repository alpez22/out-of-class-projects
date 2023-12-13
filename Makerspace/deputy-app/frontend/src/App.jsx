import { useEffect, useState } from 'react'
import './App.css'
import { Button, Card, Form } from 'react-bootstrap'

function App() {

  var myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer a6e46daa14436ea90677b8f1462b24a2");
  myHeaders.append("Access-Control-Allow-Origin", "*");
  
  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  const today = new Date();
  const [onShiftEmployees, setOnShiftEmployees] = useState([]);
  const [dailyEmployees, setDailyEmployees] = useState([]);
  let temp = 0;

  //the employees for the day
  useEffect(()=> {
    fetch("https://3ad6ed09054453.na.deputy.com/api/v1/supervise/roster/2023-12-13", requestOptions)
    .then(response => response.text())
    .then(result => {
      if (result.ok) {
        console.log("daily employees info: " + result)
        load();
      } else {
        console.log("something went wrong: " + result)
      }
    })
    .catch(error => console.log('error', error));
}, [])

  return <div>
    <h1>See you soon!</h1>
    {
      dailyEmployees.map(e => <Card key={e.id} style={{marginTop: "1rem"}}>
        <h2>temp++</h2>
      </Card>
      )
    }
  </div>
}

export default App
