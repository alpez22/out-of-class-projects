import React from "react";
import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";

export default function HomePage() {

    const today = new Date();
    const [onShiftEmployees, setOnShiftEmployees] = useState([]);
    const [dailyEmployees, setDailyEmployees] = useState([]);
    
    //whatever is here should grab the res.data from the .js file
    useEffect(() => {
        fetch(``, {
            headers: {
                
            }
        })
        .then(res => res.json())
        .then(employees => {
            //whatever res.data comes out with only grab information we need

            setOnShiftEmployees(employees)
        })
    }, []);

    //the employees for the day
    useEffect(() => {
        fetch(`https://3ad6ed09054453.na.deputy.com/api/v1/supervise/roster/${today.getMonth()}/${today.getDate()}/${today.getFullYear()}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer a6e46daa14436ea90677b8f1462b24a2"
            }
        })
        .then(res => res.json())
        .then(employees => {
            setDailyEmployees(employees)
        })
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