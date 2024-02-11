import { useEffect, useState } from 'react'
import './App.css'
import { Card, Container, Row, Col, Image } from 'react-bootstrap';


function App() {

  var myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer a6e46daa14436ea90677b8f1462b24a2");
  myHeaders.append("Access-Control-Allow-Origin", "*");
  
  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  const timeStyle = {
    border: "3px solid",
    borderRadius: "10px",
    textAlign: "center",
    borderColor: "green",
    fontSize: '1rem'
  };

  const [onShiftEmployees, setOnShiftEmployees] = useState([]);
  const [dailyEmployees, setDailyEmployees] = useState([]);

  //the employees for the day
  useEffect(()=> {
    const fetchData = () => {
      fetch("http://localhost:30001/test", requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log("daily employees info: " )
        console.log(result) //everything
        console.log(result.map(r => r._DPMetaData.EmployeeInfo.DisplayName)) //name
        console.log(result.map(r => r._DPMetaData.OperationalUnitInfo.LabelWithCompany)) //position
        console.log(result.map(r => r.Employee)) //employee id
        console.log(result.map( r => r._DPMetaData.EmployeeInfo.Photo)) //photos
        console.log(result.map(r => unixTimestampToUTC(r.StartTime).toLocaleString('en-US', { timeZone: 'America/Chicago' }))) //time on shift

        const now = new Date();
          //filter by current time so only upcoming cards appear
          //sort by time so the earliest cars appear first
        const filteredAndSortedResult = result
                                          .filter(e => unixTimestampToUTC(e.StartTime) > now && e.Employee !== 436)
                                          .sort((a, b) => unixTimestampToUTC(a.StartTime) - unixTimestampToUTC(b.StartTime));

        setDailyEmployees(filteredAndSortedResult);
      })
      .catch(error => console.log('error', error));
    };
    // Fetch data initially
    fetchData();

    // Set up an interval to refresh the data
    const interval = setInterval(fetchData, 30 * 60 * 1000); // Refresh every 30 min

    // Clear the interval when the component unmounts
    return () => clearInterval(interval);
  }, [])

  //the employees on shift
  useEffect(()=> {
    const fetchData = () => {
      fetch("http://localhost:30001/info", requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log("clocked in employees info: " )
        console.log(result) //everything
        console.log(result.map(r => r.IsInProgress)) //IsInProgress

        //filter only employees that are in progress
        const filteredAndSortedResult = result
                                          .filter(e => e.IsInProgress == true && e.Employee !== 436)

        setOnShiftEmployees(filteredAndSortedResult);
      })
      .catch(error => console.log('error', error));
    };
    // Fetch data initially
    fetchData();

    // Set up an interval to refresh the data
    const interval = setInterval(fetchData, 5 * 60 * 1000); // Refresh every 5 min

    // Clear the interval when the component unmounts
    return () => clearInterval(interval);
  }, [])

  return (<Container>
    <h1>On shift!</h1>
    <Row>
      {onShiftEmployees.map(e => (
        <Col sm={12} md={6} lg={4} xl={3} key={e.Id}>
          <Card style={{ marginTop: "1rem", border: "3px solid", maxWidth: "200px", maxHeight: "300px", padding: "0.5rem" }}>
            <img 
              src={e._DPMetaData.EmployeeInfo.Photo} 
              alt={`A picture of an employee`} 
              style={{ padding: "5px", width: "60%", height: "auto", display: "block", marginLeft: "auto", marginRight: "auto" }}/> 
            <h2 style={{ fontSize: '1rem' }}>{formatDisplayName(e._DPMetaData.EmployeeInfo.DisplayName)}</h2>
            <h6 style={{ paddingBottom: "7px" }}>{e._DPMetaData.OperationalUnitInfo.LabelWithCompany}</h6>
            <div>
              <h5 style={timeStyle}>{unixTimestampToUTC(e.StartTime).toLocaleString('en-US', { timeZone: 'America/Chicago' }).split(',')[1].trim().substring(0,4) + unixTimestampToUTC(e.StartTime).toLocaleString('en-US', { timeZone: 'America/Chicago' }).split(',')[1].trim().substring(7)}</h5>
              <h5 style={{fontSize: '1rem'}}>to</h5>
              <h5 style={timeStyle}>{unixTimestampToUTC(e.EndTime).toLocaleString('en-US', { timeZone: 'America/Chicago' }).split(',')[1].trim().substring(0,4) + unixTimestampToUTC(e.EndTime).toLocaleString('en-US', { timeZone: 'America/Chicago' }).split(',')[1].trim().substring(7)}</h5>
            </div>
          </Card>
        </Col>
      ))}
    </Row>

    <h1>See you soon!</h1>
    <Row>
      {dailyEmployees.map(e => (
        <Col sm={12} md={6} lg={4} xl={3} key={e.Id}>
          <Card style={{ marginTop: "1rem", border: "3px solid", maxWidth: "200px", maxHeight: "300px", padding: "0.5rem" }}>
            <img 
              src={e._DPMetaData.EmployeeInfo.Photo} 
              alt={`A picture of an employee`} 
              style={{ padding: "5px", width: "60%", height: "auto", display: "block", marginLeft: "auto", marginRight: "auto" }}/> 
            <h2 style={{ fontSize: '1rem' }}>{formatDisplayName(e._DPMetaData.EmployeeInfo.DisplayName)}</h2>
            <h6 style={{ paddingBottom: "7px" }}>{e._DPMetaData.OperationalUnitInfo.LabelWithCompany}</h6>
            <div>
              <h5 style={timeStyle}>{unixTimestampToUTC(e.StartTime).toLocaleString('en-US', { timeZone: 'America/Chicago' }).split(',')[1].trim().substring(0,4) + unixTimestampToUTC(e.StartTime).toLocaleString('en-US', { timeZone: 'America/Chicago' }).split(',')[1].trim().substring(7)}</h5>
              <h5 style={{fontSize: '1rem'}}>to</h5>
              <h5 style={timeStyle}>{unixTimestampToUTC(e.EndTime).toLocaleString('en-US', { timeZone: 'America/Chicago' }).split(',')[1].trim().substring(0,4) + unixTimestampToUTC(e.EndTime).toLocaleString('en-US', { timeZone: 'America/Chicago' }).split(',')[1].trim().substring(7)}</h5>
            </div>
          </Card>
        </Col>
      ))}
    </Row>
</Container>);
}

export default App

function unixTimestampToUTC(unixTimestamp) {
  // Unix timestamp is in seconds, JavaScript Date object needs milliseconds
  return new Date(unixTimestamp * 1000);
}

function formatDisplayName(name) {
  return name
    .toLowerCase() // Convert the whole string to lowercase
    .split(' ') // Split the name into parts (assuming first and last names are separated by a space)
    .map((part) => part.charAt(0).toUpperCase() + part.substring(1)) // Capitalize the first letter of each part
    .join(' '); // Join the parts back together
}