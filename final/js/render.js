// Shared card template and card event handling used by the home and destinations pages.

import { budgetLabel } from "./format.js";
import { openDetails } from "./modal.js";
import { toggleFavorite } from "./storage.js";

export function cardTemplate(destination, isSaved) {
  const { id, name, region, category, bestMonths, costLevel, image, imageAlt } = destination;

  return `
    <article class="card">
      <img src="images/${image}" alt="${imageAlt}" width="640" height="400" loading="lazy">
      <div class="card-body">
        <span class="badge">${category}</span>
        <h3>${name}</h3>
        <ul class="card-meta">
          <li><strong>Region:</strong> ${region}</li>
          <li><strong>Best time:</strong> ${bestMonths}</li>
          <li><strong>Budget:</strong> ${budgetLabel(costLevel)}</li>
        </ul>
        <div class="card-actions">
          <button class="button" type="button" data-action="details" data-id="${id}">
            View details<span class="visually-hidden"> for ${name}</span>
          </button>
          <button class="fav-button" type="button" data-action="favorite" data-id="${id}"
            aria-pressed="${isSaved}" aria-label="Favourite ${name}">
            Favourite
          </button>
        </div>
      </div>
    </article>`;
}

/**
 * Uses one delegated click listener for every card button inside a container.
 * onFavoriteChange runs after a favourite is toggled so a page can refresh itself.
 */
export function bindCardActions(container, destinations, onFavoriteChange = () => {}) {
  container.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-action]");
    if (!button) {
      return;
    }

    const destination = destinations.find((item) => item.id === button.dataset.id);
    if (!destination) {
      return;
    }

    if (button.dataset.action === "details") {
      openDetails(destination, button);
    } else if (button.dataset.action === "favorite") {
      const isSaved = toggleFavorite(destination.id);
      button.setAttribute("aria-pressed", String(isSaved));
      onFavoriteChange(destination.id, isSaved);
    }
  });
}
