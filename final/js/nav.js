// Behaviour shared by every page: responsive menu and footer year.

const toggle = document.querySelector(".nav-toggle");
const menu = document.querySelector("#site-nav");

function setMenu(open) {
  menu.classList.toggle("is-open", open);
  toggle.setAttribute("aria-expanded", String(open));
  toggle.textContent = open ? "✕" : "☰";
}

if (toggle && menu) {
  toggle.addEventListener("click", () => {
    setMenu(!menu.classList.contains("is-open"));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menu.classList.contains("is-open")) {
      setMenu(false);
      toggle.focus();
    }
  });
}

const year = document.querySelector("#year");
if (year) {
  year.textContent = new Date().getFullYear();
}
