import "./nav.js";
import { fetchDestinations } from "./data.js";
import { getFavorites } from "./storage.js";

const destinationSelect = document.querySelector("#destination");
const startInput = document.querySelector("#start");
const savedList = document.querySelector("#saved-list");
const savedMessage = document.querySelector("#saved-message");
const status = document.querySelector("#plan-status");

function todayAsInputValue() {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${now.getFullYear()}-${month}-${day}`;
}

function showSaved(destinations) {
  const favorites = getFavorites();
  const saved = destinations.filter((item) => favorites.includes(item.id));

  savedList.innerHTML = saved.map((item) => `<li>${item.name} (${item.region})</li>`).join("");
  savedMessage.hidden = saved.length > 0;
}

async function init() {
  startInput.min = todayAsInputValue();

  const destinations = await fetchDestinations();

  if (destinations.length === 0) {
    status.textContent = "Sorry, the destination list could not be loaded. Please refresh the page to plan a trip.";
    status.classList.add("status-error");
    return;
  }

  const options = [...destinations]
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((item) => `<option value="${item.id}">${item.name}</option>`);
  destinationSelect.insertAdjacentHTML("beforeend", options.join(""));

  // Allow links such as plan.html?destination=etosha to preselect a destination.
  const requested = new URLSearchParams(window.location.search).get("destination");
  if (requested && destinations.some((item) => item.id === requested)) {
    destinationSelect.value = requested;
  }

  showSaved(destinations);
}

init();
