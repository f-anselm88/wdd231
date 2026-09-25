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


// ---------- Read submitted form data from the query string ----------
const params = new URLSearchParams(window.location.search);

const fname = params.get("fname") ?? "";
const lname = params.get("lname") ?? "";
const email = params.get("email") ?? "";
const phone = params.get("phone") ?? "";
const orgname = params.get("orgname") ?? "";
const timestamp = params.get("timestamp") ?? "";

document.querySelector("#summaryName").textContent = `${fname} ${lname}`.trim();
document.querySelector("#summaryEmail").textContent = email;
document.querySelector("#summaryPhone").textContent = phone;
document.querySelector("#summaryOrg").textContent = orgname;
document.querySelector("#summaryTimestamp").textContent = timestamp;
