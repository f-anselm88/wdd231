// Accessible details dialog built on the native <dialog> element.
// showModal() traps focus, closes on Escape and marks the rest of the page inert.

import { budgetLabel } from "./format.js";

let dialog = null;
let opener = null;

function buildDialog() {
  const element = document.createElement("dialog");
  element.className = "modal";
  element.setAttribute("aria-labelledby", "modal-title");
  element.innerHTML = `
    <div class="modal-body">
      <div id="modal-content"></div>
      <form method="dialog">
        <button class="modal-close" type="submit">Close</button>
      </form>
    </div>`;

  // A click on the backdrop targets the dialog element itself.
  element.addEventListener("click", (event) => {
    if (event.target === element) {
      element.close();
    }
  });

  // Return focus to the button that opened the dialog.
  element.addEventListener("close", () => {
    opener?.focus();
    opener = null;
  });

  document.body.append(element);
  return element;
}

export function openDetails(destination, trigger) {
  dialog ??= buildDialog();
  opener = trigger;

  dialog.querySelector("#modal-content").innerHTML = `
    <img src="images/${destination.image}" alt="${destination.imageAlt}" width="640" height="400">
    <h2 id="modal-title">${destination.name}</h2>
    <p>${destination.description}</p>
    <dl>
      <dt>Region</dt><dd>${destination.region}</dd>
      <dt>Category</dt><dd>${destination.category}</dd>
      <dt>Best time to visit</dt><dd>${destination.bestMonths}</dd>
      <dt>Budget</dt><dd>${budgetLabel(destination.costLevel)}</dd>
      <dt>Top activity</dt><dd>${destination.activity}</dd>
      <dt>Traveller tip</dt><dd>${destination.tip}</dd>
    </dl>`;

  dialog.showModal();
}
