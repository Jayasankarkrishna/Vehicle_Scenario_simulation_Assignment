const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
app.use(cors('*'));
app.use(express.json());

const DATA_FILE = 'data.json';

// Utility to read JSON file
const readData = () => {
  const rawData = fs.readFileSync(DATA_FILE);
  return JSON.parse(rawData);
};

// Utility to write JSON file
const writeData = (data) => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
};

// Load last assigned IDs from data file
const getLastIds = () => {
  const data = readData();
  const lastScenarioId = data.scenarios.length > 0 ? data.scenarios[data.scenarios.length - 1].id : 0;
  const lastVehicleId = data.vehicles.length > 0 ? data.vehicles[data.vehicles.length - 1].id : 0;
  return { lastScenarioId, lastVehicleId };
};

// GET all scenarios
app.get('/scenarios', (req, res) => {
  const data = readData();
  res.json(data.scenarios);
});

// POST a new scenario
app.post('/scenarios', (req, res) => {
  const { name, time } = req.body;
  const data = readData();
  const { lastScenarioId } = getLastIds();
  const newScenario = {
    id: lastScenarioId + 1,
    name,
    time
  };
  data.scenarios.push(newScenario);
  writeData(data);
  res.json(newScenario);
});

// PUT to edit a scenario
app.put('/scenarioEdit/:id', (req, res) => {
  const { id } = req.params;
  const { name, time } = req.body;
  const data = readData();
  const scenario = data.scenarios.find(scenario => scenario.id === parseInt(id));
  if (scenario) {
    scenario.name = name;
    scenario.time = time;
    writeData(data);
    res.json(scenario);
  } else {
    res.status(404).send('Scenario not found');
  }
});

// DELETE a scenario
app.delete('/scenarioDelete/:id', (req, res) => {
  const { id } = req.params;
  const data = readData();
  const scenarioIndex = data.scenarios.findIndex(scenario => scenario.id === parseInt(id));
  if (scenarioIndex !== -1) {
    data.scenarios.splice(scenarioIndex, 1);
    writeData(data);
    res.sendStatus(204);
  } else {
    res.status(404).send('Scenario not found');
  }
});

// GET all vehicles
app.get('/vehicles', (req, res) => {
  const data = readData();
  res.json(data.vehicles);
});

// POST a new vehicle
app.post('/vehicles', (req, res) => {
  const { name, positionX, positionY, speed, direction, scenarios_id } = req.body;
  const data = readData();
  const { lastVehicleId } = getLastIds();
  const newVehicle = {
    id: lastVehicleId + 1,
    name,
    positionX,
    positionY,
    speed,
    direction,
    scenarios_id
  };
  data.vehicles.push(newVehicle);
  writeData(data);
  res.json(newVehicle);
});

// PUT to edit a vehicle
app.put('/vehicleEdit/:id', (req, res) => {
  const { id } = req.params;
  const { name, positionX, positionY, speed, direction } = req.body;
  const data = readData();
  const vehicle = data.vehicles.find(vehicle => vehicle.id === parseInt(id));
  if (vehicle) {
    vehicle.name = name;
    vehicle.positionX = positionX;
    vehicle.positionY = positionY;
    vehicle.speed = speed;
    vehicle.direction = direction;
    writeData(data);
    res.json(vehicle);
  } else {
    res.status(404).send('Vehicle not found');
  }
});

// DELETE a vehicle
app.delete('/vehicleDelete/:id', (req, res) => {
  const { id } = req.params;
  const data = readData();
  const vehicleIndex = data.vehicles.findIndex(vehicle => vehicle.id === parseInt(id));
  if (vehicleIndex !== -1) {
    data.vehicles.splice(vehicleIndex, 1);
    writeData(data);
    res.sendStatus(204);
  } else {
    res.status(404).send('Vehicle not found');
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
