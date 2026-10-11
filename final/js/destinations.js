import "./nav.js";
import { fetchDestinations } from "./data.js";
import { cardTemplate, bindCardActions } from "./render.js";
import { getFavorites, getFilters, saveFilters, clearFilters } from "./storage.js";

const grid = document.querySelector("#destination-grid");
const status = document.querySelector("#results-status");
const searchInput = document.querySelector("#search");
const categorySelect = document.querySelector("#category");
const sortSelect = document.querySelector("#sort");
const savedOnlyBox = document.querySelector("#saved-only");
const resetButton = document.querySelector("#reset-filters");

const SORTERS = {
  name: (a, b) => a.name.localeCompare(b.name),
  region: (a, b) => a.region.localeCompare(b.region) || a.name.localeCompare(b.name),
  "budget-low": (a, b) => a.costLevel - b.costLevel || a.name.localeCompare(b.name),
  "budget-high": (a, b) => b.costLevel - a.costLevel || a.name.localeCompare(b.name),
};

let destinations = [];

function readControls() {
  return {
    search: searchInput.value,
    category: categorySelect.value,
    sort: sortSelect.value,
    savedOnly: savedOnlyBox.checked,
  };
}

function writeControls(filters) {
  searchInput.value = filters.search;
  categorySelect.value = filters.category;
  sortSelect.value = filters.sort;
  savedOnlyBox.checked = filters.savedOnly;
}

function filterDestinations({ search, category, sort, savedOnly }) {
  const term = search.trim().toLowerCase();
  const favorites = getFavorites();

  return destinations
    .filter((item) => category === "all" || item.category === category)
    .filter((item) => !savedOnly || favorites.includes(item.id))
    .filter((item) =>
      !term || [item.name, item.region, item.activity, item.description].join(" ").toLowerCase().includes(term)
    )
    .sort(SORTERS[sort] ?? SORTERS.name);
}

function render() {
  const filters = readControls();
  const favorites = getFavorites();
  const results = filterDestinations(filters);

  grid.innerHTML = results
    .map((item) => `<li>${cardTemplate(item, favorites.includes(item.id))}</li>`)
    .join("");

  status.textContent = results.length
    ? `Showing ${results.length} of ${destinations.length} destinations.`
    : "No destinations match your filters. Try clearing the search or the saved-only option.";
}

function fillCategories() {
  const categories = [...new Set(destinations.map((item) => item.category))].sort();
  const options = categories.map((name) => `<option value="${name}">${name}</option>`);
  categorySelect.insertAdjacentHTML("beforeend", options.join(""));
}

function handleFilterChange() {
  saveFilters(readControls());
  render();
}

async function init() {
  destinations = await fetchDestinations();

  if (destinations.length === 0) {
    status.textContent = "Sorry, the destinations could not be loaded. Please refresh the page to try again.";
    status.classList.add("status-error");
    return;
  }

  fillCategories();

  const saved = getFilters();
  writeControls(saved);
  // Fall back to the default when a stored category no longer exists.
  if (categorySelect.value !== saved.category) {
    categorySelect.value = "all";
  }

  bindCardActions(grid, destinations, (_id, isSaved) => {
    // When "saved only" is on, removing a favourite should remove its card.
    if (!isSaved && savedOnlyBox.checked) {
      render();
      status.focus();
    }
  });

  searchInput.addEventListener("input", handleFilterChange);
  categorySelect.addEventListener("change", handleFilterChange);
  sortSelect.addEventListener("change", handleFilterChange);
  savedOnlyBox.addEventListener("change", handleFilterChange);

  resetButton.addEventListener("click", () => {
    writeControls(clearFilters());
    render();
  });

  render();
}

init();
