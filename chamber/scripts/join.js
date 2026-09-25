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


// ---------- Hidden timestamp field ----------
document.querySelector("#timestamp").value = new Date().toString();


// ---------- Membership level modals ----------
const openButtons = document.querySelectorAll("[data-modal]");

openButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const modal = document.getElementById(button.dataset.modal);

    if (!modal) return;

    // Close buttons live inside dialogs too; either can open or close.
    if (modal.open) {
      modal.close();
    } else {
      modal.showModal();
    }
  });
});

// Close a dialog when clicking on its backdrop.
document.querySelectorAll(".level-modal").forEach((dialog) => {
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) {
      dialog.close();
    }
  });
});
