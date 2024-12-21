const RSVP = require("./rsvp");
const fs = require("fs");

class EventManager {
  constructor() {
    this.events = {};
    this.attendeeFile = "./attendees.json";
    this.loadAttendees();
  }

  // Create a new event
  createEvent(eventName, eventDate) {
    if (!this.events[eventName]) {
      this.events[eventName] = {
        date: eventDate,
        attendees: []
      };
    }
  }

  // List all events
  listEvents() {
    return Object.keys(this.events).map(event => ({
      eventName: event,
      date: this.events[event].date
    }));
  }

  // RSVP to an event
  rsvpToEvent(eventName, name, email) {
    if (!this.events[eventName]) return false;

    const rsvp = new RSVP(eventName, name, email);
    if (rsvp.register()) {
      this.events[eventName].attendees.push(rsvp);
      this.saveAttendeeData();
      return true;
    }
    return false;
  }

  // Save attendee data to the file
  saveAttendeeData() {
    const attendees = [];
    for (let eventName in this.events) {
      this.events[eventName].attendees.forEach(attendee => {
        attendees.push({
          name: attendee.name,
          email: attendee.email,
          event: eventName
        });
      });
    }

    fs.writeFileSync(this.attendeeFile, JSON.stringify(attendees, null, 2));
  }

  // Load attendee data from the file
  loadAttendees() {
    if (fs.existsSync(this.attendeeFile)) {
      const data = fs.readFileSync(this.attendeeFile);
      const attendees = JSON.parse(data);
      attendees.forEach(attendee => {
        if (!this.events[attendee.event]) {
          this.events[attendee.event] = { attendees: [] };
        }
        this.events[attendee.event].attendees.push(new RSVP(attendee.event, attendee.name, attendee.email));
      });
    }
  }

  // View attendees for a specific event
  viewAttendees(eventName) {
    if (this.events[eventName]) {
      return this.events[eventName].attendees.map(attendee => ({
        name: attendee.name,
        email: attendee.email
      }));
    }
    return [];
  }
}

module.exports = EventManager;
