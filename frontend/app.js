



const createEventForm = document.getElementById("createEventForm");
const rsvpForm = document.getElementById("rsvpForm");
const loadEventsBtn = document.getElementById("loadEventsBtn");
const eventSelect = document.getElementById("eventSelect");
const eventsList = document.getElementById("eventsList");

// Event listener for creating an event
createEventForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const eventName = document.getElementById("eventName").value;
  const eventDate = document.getElementById("eventDate").value;

  fetch("http://localhost:3000/events", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ eventName, eventDate })
  })
  .then(response => response.text())
  .then(data => {
    alert(data);
    loadEvents(); // Refresh event list
  })
  .catch(error => {
    console.error("Error creating event:", error);
  });
});

// Event listener for RSVP form
rsvpForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const name = document.getElementById("rsvpName").value;
  const email = document.getElementById("rsvpEmail").value;
  const eventName = eventSelect.value;

  fetch("http://localhost:3000/rsvp", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ eventName, name, email })
  })
  .then(response => response.text())
  .then(data => {
    alert(data);
  })
  .catch(error => {
    console.error("Error RSVPing:", error);
  });
});

// Event listener to load events
loadEventsBtn.addEventListener("click", loadEvents);

// Function to load events from backend
function loadEvents() {
  fetch("http://localhost:3000/events")
    .then(response => response.json())
    .then(events => {
      eventSelect.innerHTML = "";
      eventsList.innerHTML = "";

      events.forEach(event => {
        // Populate event select dropdown
        const option = document.createElement("option");
        option.value = event.eventName;
        option.textContent = `${event.eventName} on ${event.date}`;
        eventSelect.appendChild(option);

        // Display event in list
        const listItem = document.createElement("li");
        listItem.textContent = `${event.eventName} on ${event.date}`;
        eventsList.appendChild(listItem);
      });
    })
    .catch(error => {
      console.error("Error loading events:", error);
    });
}
