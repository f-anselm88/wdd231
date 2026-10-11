import "./nav.js";
import { fetchDestinations } from "./data.js";
import { cardTemplate, bindCardActions } from "./render.js";
import { getFavorites } from "./storage.js";

const FEATURED_IDS = ["sossusvlei", "etosha", "twyfelfontein"];

const featuredGrid = document.querySelector("#featured-grid");
const stats = document.querySelector("#home-stats");

async function init() {
  const destinations = await fetchDestinations();

  if (destinations.length === 0) {
    stats.textContent = "Sorry, the featured destinations could not be loaded. Please refresh the page.";
    stats.classList.add("status-error");
    return;
  }

  const favorites = getFavorites();
  const featured = destinations.filter((item) => FEATURED_IDS.includes(item.id));

  featuredGrid.innerHTML = featured
    .map((item) => `<li>${cardTemplate(item, favorites.includes(item.id))}</li>`)
    .join("");

  bindCardActions(featuredGrid, destinations);

  const regionCount = new Set(destinations.map((item) => item.region)).size;
  const categoryCount = destinations.reduce((names, item) => names.add(item.category), new Set()).size;
  stats.textContent = `${destinations.length} destinations across ${regionCount} regions and ${categoryCount} categories.`;
}

init();
