// Thin wrapper around localStorage so every page reads and writes state the same way.

const FAVORITES_KEY = "namibia-compass-favorites";
const FILTERS_KEY = "namibia-compass-filters";

const DEFAULT_FILTERS = { search: "", category: "all", sort: "name", savedOnly: false };

function read(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (error) {
    // Storage can be blocked (private mode) or hold invalid JSON.
    console.warn(`Could not read "${key}" from localStorage:`, error);
    return fallback;
  }
}

function write(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn(`Could not save "${key}" to localStorage:`, error);
  }
}

export function getFavorites() {
  const stored = read(FAVORITES_KEY, []);
  return Array.isArray(stored) ? stored : [];
}

export function toggleFavorite(id) {
  const favorites = getFavorites();
  const isSaved = favorites.includes(id);
  const updated = isSaved ? favorites.filter((item) => item !== id) : [...favorites, id];
  write(FAVORITES_KEY, updated);
  return !isSaved;
}

export function getFilters() {
  return { ...DEFAULT_FILTERS, ...read(FILTERS_KEY, {}) };
}

export function saveFilters(filters) {
  write(FILTERS_KEY, filters);
}

export function clearFilters() {
  write(FILTERS_KEY, DEFAULT_FILTERS);
  return { ...DEFAULT_FILTERS };
}
