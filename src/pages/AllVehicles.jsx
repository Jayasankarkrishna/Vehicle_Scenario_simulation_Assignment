import React, { useEffect, useState,useMemo } from "react";
import axios from "axios";

import DataTableWithSearchSection from "./DataTableWithSearch";
import { Card, Col, Row } from "react-bootstrap";
import { Box, Tooltip } from "@mui/material";
import { IconButton } from "@mui/material";
import ModeEditOutlineSharpIcon from "@mui/icons-material/ModeEditOutlineSharp";
import DeleteIcon from "@mui/icons-material/Delete";

const AllVehicles = () => {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/vehicles")
      .then((response) => {
        setVehicles(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the vehicles!", error);
      });
  }, []);

  // Define columns for the table
  const columns = useMemo(
    () => [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "positionX",
      header: "Position X",
    },
    {
      accessorKey: "positionY",
      header: "Position Y",
    },
    {
      accessorKey: "speed",
      header: "Speed",
    },
    {
      accessorKey: "direction",
      header: "Direction",
    },
], 
[]
);

const handleDelete = ()=>{
    
}



  // Convert API data to match the expected format for the table
  const data = vehicles.map((vehicle) => ({
    id: vehicle.id,
    name: vehicle.name,
    positionX: vehicle.positionX,
    positionY: vehicle.positionY,
    speed: vehicle.speed,
    direction: vehicle.direction,
  }));

  const renderRowActions = ({ row }) => (
    <Box sx={{ display: "flex", gap: "1rem" }}>
      <Tooltip title="Delete">
        <IconButton>
          <DeleteIcon
            className="text-danger"
            onClick={() => handleDelete(row)}
          />
        </IconButton>
      </Tooltip>
      <Tooltip title="Edit">
        <IconButton>
          <ModeEditOutlineSharpIcon onClick={row} />
        </IconButton>
      </Tooltip>
    </Box>
  );

  return (


    <Row>
      <Col sm={12}>
        <Card className="" style={{ backgroundColor: "rgb(243,248,244)" }}>
          <Card.Body>
            <DataTableWithSearchSection
              columns={columns}
              data={data}
              enableRowActions={true}
              renderRowActions={(props) => renderRowActions({ ...props })}
            />
          </Card.Body>
        </Card>
      </Col>
    </Row>

  );
};

export default AllVehicles;
