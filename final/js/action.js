import "./nav.js";
import { fetchDestinations } from "./data.js";
import { formatDate } from "./format.js";

const summary = document.querySelector("#summary");
const message = document.querySelector("#action-message");

function addRow(label, value) {
  const term = document.createElement("dt");
  const detail = document.createElement("dd");
  term.textContent = label;
  // textContent keeps anything the visitor typed as plain text.
  detail.textContent = value || "Not provided";
  summary.append(term, detail);
}

async function init() {
  const params = new URLSearchParams(window.location.search);

  if (!params.has("name")) {
    message.textContent = "No trip details were received. Please use the trip planner to send your request.";
    return;
  }

  const destinations = await fetchDestinations();
  const destination = destinations.find((item) => item.id === params.get("destination"));
  const interests = params.getAll("interests");

  message.textContent = `Thank you, ${params.get("name")}. Here are the trip details you submitted.`;

  addRow("Name", params.get("name"));
  addRow("Email", params.get("email"));
  addRow("Destination", destination ? destination.name : params.get("destination"));
  addRow("Start date", params.get("start") ? formatDate(params.get("start")) : "");
  addRow("Trip length", `${params.get("days")} days`);
  addRow("Travel style", params.get("style"));
  addRow("Interests", interests.length ? interests.join(", ") : "None selected");
  addRow("Notes", params.get("notes"));

  summary.hidden = false;
}

init();
