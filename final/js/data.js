// Loads the destination data from the local JSON file.

const DATA_URL = new URL("../data/destinations.json", import.meta.url);

/**
 * Fetches all destinations.
 * Resolves to an empty array when the request or JSON parsing fails,
 * so callers can show a friendly message instead of a broken page.
 */
export async function fetchDestinations() {
  try {
    const response = await fetch(DATA_URL);

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const destinations = await response.json();
    return destinations;
  } catch (error) {
    console.error("Could not load destinations:", error);
    return [];
  }
}
