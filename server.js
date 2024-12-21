const express = require("express");
const bodyParser = require("body-parser");
const EventManager = require("./eventManager");

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

// Create EventManager instance
const manager = new EventManager();

// Routes

// Create event
app.post("/events", (req, res) => {
  const { eventName, eventDate } = req.body;
  manager.createEvent(eventName, eventDate);
  res.send(`Event '${eventName}' created successfully!`);
});

// List all events
app.get("/events", (req, res) => {
  const events = manager.listEvents();
  res.json(events);
});

// RSVP to an event
app.post("/rsvp", (req, res) => {
  const { eventName, name, email } = req.body;
  const success = manager.rsvpToEvent(eventName, name, email);
  if (success) {
    res.send(`${name} successfully registered for ${eventName}!`);
  } else {
    res.status(400).send("Invalid RSVP data.");
  }
});

// View attendees for an event
app.get("/attendees/:eventName", (req, res) => {
  const eventName = req.params.eventName;
  const attendees = manager.viewAttendees(eventName);
  res.json(attendees);
});

// Start the server
app.listen(port, () => {
  console.log(`Event Manager app listening at http://localhost:${port}`);
});
