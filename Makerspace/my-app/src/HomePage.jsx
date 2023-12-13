import React from "react";
import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";

export default function HomePage() {

    var myHeaders = new Headers();
    myHeaders.append("Access-Control-Allow-Origin", "*");
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer a6e46daa14436ea90677b8f1462b24a2");
    
    var raw = JSON.stringify({
        "test": "Hello World"
    });
    
    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

    const today = new Date();
    const [onShiftEmployees, setOnShiftEmployees] = useState([]);
    const [dailyEmployees, setDailyEmployees] = useState([]);
    
    //whatever is here should grab the res.data from the .js file
    // useEffect(() => {
    //     fetch(``, requestOptions)
    //     .then(res => res.json())
    //     .then(employees => {
    //         //whatever res.data comes out with only grab information we need

    //         setOnShiftEmployees(employees)
    //     })
    // }, []);

    console.log("month " + today.getMonth());
    console.log("date " + today.getDate());
    console.log("year " + today.getFullYear());
    //the employees for the day
    useEffect(() => {
        fetch(`https://3ad6ed09054453.na.deputy.com/api/v1/supervise/roster/${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`, requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
    }, []);

    // <h1>On Shift!</h1>
    //     <Container fluid>
    //         <Row>
    //             {onShiftEmployees.map((employee) => {
    //                 <Col key={employee.id} xs={12} md={6} lg={4} xl={3}>
    //                     <EmployeeCardSummary   
    //                         id = {employee.id}
    //                         imgId = {employee.id}
    //                         name = {employee.id}
    //                         title = {employee.id}
    //                         upgrades = {employee.id}
    //                     />
    //                 </Col>
    //             })}
    //         </Row>
    //     </Container>

    return (<div>
        

        <h1>See you Soon!</h1>
        <Container fluid>
            <Row>
                {dailyEmployees.map((employee) => {
                    <Col key={employee.id} xs={12} md={6} lg={4} xl={3}>
                        <EmployeeCardSummary        
                        />
                    </Col>
                })}
            </Row>
        </Container>
        </div>
    )
}