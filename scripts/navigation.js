const menuToggle = document.querySelector("#menuToggle");
const primaryNav = document.querySelector("#primaryNav");

menuToggle.addEventListener("click", () => {
  const isOpen = primaryNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", isOpen);
});

// Close the mobile menu automatically if the viewport grows past
// the breakpoint where the horizontal nav takes over.
const desktopQuery = window.matchMedia("(min-width: 640px)");
desktopQuery.addEventListener("change", (e) => {
  if (e.matches) {
    primaryNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", false);
  }
});
