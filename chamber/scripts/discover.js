import { places } from "../data/discover.mjs";

// ---------- Mobile navigation toggle ----------
const navToggle = document.querySelector(".nav-toggle");
const primaryNav = document.querySelector(".primary-nav");

navToggle.addEventListener("click", () => {
  const isOpen = primaryNav.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", isOpen);
});


// ---------- Footer: copyright year + last modified ----------
document.querySelector("#year").textContent = new Date().getFullYear();
document.querySelector("#lastModified").textContent = document.lastModified;


// ---------- Discover cards ----------
const grid = document.querySelector("#discoverGrid");

function buildCard(place) {
  const card = document.createElement("article");
  card.className = "discover-card";
  card.style.gridArea = `c${place.id}`;

  const title = document.createElement("h2");
  title.textContent = place.name;

  const figure = document.createElement("figure");
  const img = document.createElement("img");
  img.src = place.image;
  img.alt = place.alt;
  img.width = 300;
  img.height = 200;
  img.loading = "lazy";
  figure.append(img);

  const address = document.createElement("address");
  address.textContent = place.address;

  const description = document.createElement("p");
  description.textContent = place.description;

  const button = document.createElement("button");
  button.type = "button";
  button.textContent = "Learn more";
  button.setAttribute("aria-label", `Learn more about ${place.name}`);

  card.append(title, figure, address, description, button);
  return card;
}

grid.append(...places.map(buildCard));


// ---------- Visit message (localStorage) ----------
const MS_PER_DAY = 1000 * 60 * 60 * 24;
const STORAGE_KEY = "discover-last-visit";
const messageBox = document.querySelector("#visitMessage");

function getVisitMessage(lastVisit, now) {
  if (!lastVisit) {
    return "Welcome! Let us know if you have any questions.";
  }

  const elapsed = now - lastVisit;

  if (elapsed < MS_PER_DAY) {
    return "Back so soon! Awesome!";
  }

  const days = Math.floor(elapsed / MS_PER_DAY);
  return `You last visited ${days} ${days === 1 ? "day" : "days"} ago.`;
}

function showVisitMessage() {
  const now = Date.now();
  let lastVisit = null;

  try {
    const stored = Number(localStorage.getItem(STORAGE_KEY));
    lastVisit = Number.isFinite(stored) && stored > 0 ? stored : null;
    localStorage.setItem(STORAGE_KEY, String(now));
  } catch {
    // Storage blocked (private mode, policy): show the first-visit message.
  }

  const text = document.createElement("p");
  text.textContent = getVisitMessage(lastVisit, now);

  const close = document.createElement("button");
  close.type = "button";
  close.className = "visit-close";
  close.textContent = "\u00D7";
  close.setAttribute("aria-label", "Close visit message");
  close.addEventListener("click", () => {
    messageBox.hidden = true;
  });

  messageBox.append(text, close);
  messageBox.hidden = false;
}

showVisitMessage();