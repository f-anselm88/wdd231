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


// ---------- Member directory ----------
const memberList = document.querySelector("#memberList");
const memberCount = document.querySelector("#memberCount");

const gridButton = document.querySelector("#gridView");
const listButton = document.querySelector("#listView");


// Membership level labels
const tierLabels = {
  1: "Member",
  2: "Silver Member",
  3: "Gold Member"
};


// ---------- Get member data from JSON ----------
async function getMembers() {
  try {
    const response = await fetch("data/members.json");

    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`);
    }

    const members = await response.json();

    displayMembers(members);

  } catch (error) {
    memberList.innerHTML = `
      <p role="alert">
        Member data could not be loaded right now.
        Please try again later.
      </p>
    `;

    console.error("Failed to load members.json:", error);
  }
}


// ---------- Display members ----------
function displayMembers(members) {

  // Display number of businesses
  memberCount.textContent = `${members.length} businesses`;

  // Create the member cards
  memberList.innerHTML = members
    .map((member) => {

      const tierClass = `tier-${member.membership}`;

      const tierText =
        tierLabels[member.membership] ?? "Member";

      return `
        <article class="member-card">

          <div class="member-heading">
            <h3>${member.name}</h3>
            <p>${member.tagline}</p>
          </div>

          <div class="member-content">

            <img
              src="images/${member.image}"
              alt="${member.name} logo"
              width="640"
              height="400"
              loading="lazy"
            >

            <div class="member-body">

              <span class="member-tier ${tierClass}">
                ${tierText}
              </span>

              <p>
                <strong>EMAIL:</strong>
                <a href="mailto:${member.email}">
                  ${member.email}
                </a>
              </p>

              <p>
                <strong>PHONE:</strong>
                <a href="tel:${member.phone.replace(/\s+/g, "")}">
                  ${member.phone}
                </a>
              </p>

              <p>
                <strong>ADDRESS:</strong>
                ${member.address}
              </p>

              <p>
                <strong>URL:</strong>
                <a
                  href="${member.website}"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ${member.website}
                </a>
              </p>

            </div>

          </div>

        </article>
      `;
    })
    .join("");
}


// ---------- Grid view ----------
gridButton.addEventListener("click", () => {

  memberList.classList.remove("is-list");

  gridButton.setAttribute("aria-pressed", "true");

  listButton.setAttribute("aria-pressed", "false");

});


// ---------- List view ----------
listButton.addEventListener("click", () => {

  memberList.classList.add("is-list");

  listButton.setAttribute("aria-pressed", "true");

  gridButton.setAttribute("aria-pressed", "false");

});


// ---------- Load members ----------
getMembers();