// import React, { useState } from "react";
// import axios from "axios";
// import { Container, Form, Card, Button, Col, Row } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";

// const AddScenario = () => {
//   const [scenario, setScenario] = useState({ id: "", name: "", time: "" });
//   const [timeError, setTimeError] = useState("");
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setScenario((prevScenario) => ({
//       ...prevScenario,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Validate and convert time to 10-second intervals
//     const timeInSeconds = parseInt(scenario.time, 10);
//     if (isNaN(timeInSeconds) || timeInSeconds <= 0) {
//       setTimeError("Scenario Time must be a positive number");
//       return;
//     } else {
//       setTimeError("");
//     }

//     const timeIn10Seconds = Math.ceil(timeInSeconds / 10) * 10;

//     const updatedScenario = {
//       ...scenario,
//       time: timeIn10Seconds,
//     };

//     axios
//       .post("http://localhost:3001/scenarios", updatedScenario)
//       .then((response) => {
//         console.log("Scenario added:", response.data);
//         setScenario({ id: "", name: "", time: "" });
//       })
//       .catch((error) => {
//         console.error("There was an error adding the scenario!", error);
//       });
//   };

//   const handleReset = () => {
//     setScenario({ id: "", name: "", time: "" });
//     setTimeError("");
//   };

//   const handleGoBack = () => {
//     navigate("/");
//   };

//   return (
//     <div>
//       <h5 style={{ color: "white", marginBottom: "1rem" }}>Scenario / add</h5>

//       <Container
//         className="mt-5"
//         style={{ backgroundColor: "#2c2f33", border: "5px solid #444" }}
//       >
//         <h2 style={{ color: "white", marginBottom: "1rem" }}>Add Scenario</h2>
//         <hr style={{ color: "white" }} />
//         <Form onSubmit={handleSubmit}>
//           <Card
//             className="p-3"
//             style={{ backgroundColor: "#2c2f33", color: "white" }}
//           >
//             <Row>
//               <Form.Group controlId="formScenarioName" as={Col}>
//                 <Form.Label>Scenario Name</Form.Label>
//                 <Form.Control
//                   type="text"
//                   name="name"
//                   value={scenario.name}
//                   onChange={handleChange}
//                   required
//                   placeholder="Enter Scenario Name"
//                   style={{ backgroundColor: "#2c2f33", color: "white" }}
//                 />
//                 {scenario.name === "" && (
//                   <Form.Text className="text-danger">
//                     Scenario name is required
//                   </Form.Text>
//                 )}
//               </Form.Group>

//               <Form.Group controlId="formScenarioTime" as={Col}>
//                 <Form.Label>Scenario Time (seconds)</Form.Label>
//                 <Form.Control
//                   type="text"
//                   name="time"
//                   value={scenario.time}
//                   onChange={handleChange}
//                   required
//                   placeholder="Enter Scenario Time"
//                   style={{ backgroundColor: "#2c2f33", color: "white" }}
//                 />
//                 {scenario.time === "" && (
//                   <Form.Text className="text-danger">
//                     Scenario Time is required
//                   </Form.Text>
//                 )}
//                 {timeError && (
//                   <Form.Text className="text-danger">{timeError}</Form.Text>
//                 )}
//               </Form.Group>
//             </Row>
//             <div className="d-flex justify-content-between mt-3">
//               <Button variant="success" type="submit">
//                 Add
//               </Button>
//               <Button variant="warning" onClick={handleReset}>
//                 Reset
//               </Button>
//               <Button variant="info" onClick={handleGoBack}>
//                 Go Back
//               </Button>
//             </div>
//           </Card>
//         </Form>
//       </Container>
//     </div>
//   );
// };

// export default AddScenario;



import React, { useState } from "react";
import axios from "axios";
import { Container, Form, Card, Button, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const AddScenario = () => {
  const [scenario, setScenario] = useState({ id: "", name: "", time: "" });
  const [timeError, setTimeError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setScenario((prevScenario) => ({
      ...prevScenario,
      [name]: value,
    }));
  };

  // const parseTime = (input) => {
  //   const regex = /^(\d+)s$/;
  //   const match = input.match(regex);
  //   if (match) {
  //     return parseInt(match[1], 10) * 10; // Multiply by 10 to get seconds
  //   }
  //   return NaN;
  // };
  const parseTime = (timeString) => {
    // Remove any non-numeric characters from the string
    const numericValue = timeString.replace(/\D/g, '');
  
    // Parse the numeric value and return it
    return parseInt(numericValue);
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();

    const timeIn10Seconds = parseTime(scenario.time);

    if (isNaN(timeIn10Seconds) || timeIn10Seconds <= 0) {
      setTimeError("Invalid time format. Please enter time in the format '10s'");
      return;
    } else {
      setTimeError("");
    }

    const updatedScenario = {
      ...scenario,
      time: `${timeIn10Seconds}s`,// Store time in the format "10s"
    };

    axios
      .post("http://localhost:3001/scenarios", updatedScenario)
      .then((response) => {
        console.log("Scenario added:", response.data);
        setScenario({ id: "", name: "", time: "" });
      })
      .catch((error) => {
        console.error("There was an error adding the scenario!", error);
      });
  };

  const handleReset = () => {
    setScenario({ id: "", name: "", time: "" });
    setTimeError("");
  };

  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <div>
      <h5 style={{ color: "white", marginBottom: "1rem" }}>Scenario / add</h5>

      <Container
        className="mt-5"
        style={{ backgroundColor: "#2c2f33", border: "5px solid #444" }}
      >
        <h2 style={{ color: "white", marginBottom: "1rem" }}>Add Scenario</h2>
        <hr style={{ color: "white" }} />
        <Form onSubmit={handleSubmit}>
          <Card
            className="p-3"
            style={{ backgroundColor: "#2c2f33", color: "white" }}
          >
            <Row>
              <Form.Group controlId="formScenarioName" as={Col}>
                <Form.Label>Scenario Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={scenario.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter Scenario Name"
                  style={{ backgroundColor: "#2c2f33", color: "white" }}
                />
                {scenario.name === "" && (
                  <Form.Text className="text-danger">
                    Scenario name is required
                  </Form.Text>
                )}
              </Form.Group>

              <Form.Group controlId="formScenarioTime" as={Col}>
                <Form.Label>Scenario Time (e.g., 10s)</Form.Label>
                <Form.Control
                  type="text"
                  name="time"
                  value={scenario.time}
                  onChange={handleChange}
                  required
                  placeholder="Enter Scenario Time"
                  style={{ backgroundColor: "#2c2f33", color: "white" }}
                />
                {scenario.time === "" && (
                  <Form.Text className="text-danger">
                    Scenario Time is required
                  </Form.Text>
                )}
                {timeError && (
                  <Form.Text className="text-danger">{timeError}</Form.Text>
                )}
              </Form.Group>
            </Row>
            <div className="d-flex justify-content-between mt-3">
              <Button variant="success" type="submit">
                Add
              </Button>
              <Button variant="warning" onClick={handleReset}>
                Reset
              </Button>
              <Button variant="info" onClick={handleGoBack}>
                Go Back
              </Button>
            </div>
          </Card>
        </Form>
      </Container>
    </div>
  );
};

export default AddScenario;
