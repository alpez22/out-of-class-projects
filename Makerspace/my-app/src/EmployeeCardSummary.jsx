import React from "react";

const EmployeeCardSummary = ({id, img, name, title}) => {

    const employeeObjStyle = {
        border: "1px solid",
        borderRadius: "10px",
        padding: "10px",
        margin: "10px",
        width: "350px"
    };

    const employeeImgStyle = { 
        width: "100%", 
        height: "350px" 
    };

    const nameStyle = {
        border: "1px solid",
        borderRadius: "10px",
        marginTop: "10px",
        textAlign: "center",
    };

    return (<div key={id} style={employeeObjStyle}> 

        <h2 style={nameStyle}>{name}</h2>
            <div>
                <img 
                    src={`${img}`} 
                    alt={`A picture of ${name}`} 
                    style={employeeImgStyle} /> 
                <p>{name}</p>
                <p>{title}</p>
            </div>
        </div>)
}

export default EmployeeCardSummary;