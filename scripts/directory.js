const cardContainer = document.querySelector("#directory-cards");
const gridBtn = document.querySelector("#view-grid");
const listBtn = document.querySelector("#view-list");
const themeToggle = document.querySelector("#theme-toggle");
const navToggle = document.querySelector("#nav-toggle");
const navCluster = document.querySelector(".nav-cluster");

async function loadBusinesses() {
  try {
    const response = await fetch("businesses.json");
    if (!response.ok) throw new Error(`Request failed: ${response.status}`);
    const businesses = await response.json();
    renderCards(businesses);
  } catch (error) {
    cardContainer.innerHTML = `<p class="load-error">Couldn't load the directory right now. (${error.message})</p>`;
  }
}

function renderCards(businesses) {
  cardContainer.innerHTML = businesses
    .map(
      (biz) => `
      <li class="biz-card">
        <div class="biz-mark" aria-hidden="true">${biz.initials}</div>
        <div class="biz-body">
          <h3 class="biz-name">${biz.name}</h3>
          <p class="biz-tagline">${biz.tagline}</p>
          <p class="biz-category">${biz.category}</p>
          <dl class="biz-meta">
            <div><dt>Email</dt><dd><a href="mailto:${biz.email}">${biz.email}</a></dd></div>
            <div><dt>Phone</dt><dd>${biz.phone}</dd></div>
            <div><dt>Web</dt><dd><a href="${biz.url}" target="_blank" rel="noopener">${biz.url.replace("https://", "")}</a></dd></div>
          </dl>
        </div>
      </li>`
    )
    .join("");
}

function setView(view) {
  cardContainer.classList.toggle("is-list", view === "list");
  gridBtn.setAttribute("aria-pressed", String(view === "grid"));
  listBtn.setAttribute("aria-pressed", String(view === "list"));
  localStorage.setItem("directoryView", view);
}

gridBtn.addEventListener("click", () => setView("grid"));
listBtn.addEventListener("click", () => setView("list"));

function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  themeToggle.setAttribute("aria-pressed", String(theme === "dark"));
  localStorage.setItem("theme", theme);
}

themeToggle.addEventListener("click", () => {
  const current = document.documentElement.getAttribute("data-theme");
  setTheme(current === "dark" ? "light" : "dark");
});

navToggle.addEventListener("click", () => {
  const isOpen = navCluster.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

// Restore saved preferences, defaulting to grid view and light theme
setView(localStorage.getItem("directoryView") || "grid");
setTheme(localStorage.getItem("theme") || "light");

// Footer: copyright year + last modified, generated (not hardcoded)
document.querySelector("#current-year").textContent = new Date().getFullYear();
document.querySelector("#last-modified").textContent = document.lastModified;

loadBusinesses();
