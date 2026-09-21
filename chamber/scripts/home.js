// ---------- Nav toggle ----------
const navToggle = document.getElementById("navToggle");
const primaryNav = document.getElementById("primaryNav");

navToggle.addEventListener("click", () => {
  const isOpen = primaryNav.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", isOpen);
});

// ---------- Footer dates ----------
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;

// ---------- Weather ----------
const WEATHER_API_KEY = "988fc866c465a61d027cdd495169b788";
const WEATHER_LAT = -22.5609;
const WEATHER_LON = 17.0658;

async function loadWeather() {
  const currentEl = document.getElementById("weatherCurrent");
  const forecastEl = document.getElementById("weatherForecast");

  const currentUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${WEATHER_LAT}&lon=${WEATHER_LON}&units=metric&appid=${WEATHER_API_KEY}`;
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${WEATHER_LAT}&lon=${WEATHER_LON}&units=metric&appid=${WEATHER_API_KEY}`;

  try {
    const [currentResponse, forecastResponse] = await Promise.all([
      fetch(currentUrl),
      fetch(forecastUrl)
    ]);

    if (!currentResponse.ok || !forecastResponse.ok) {
      throw new Error("Weather request failed");
    }

    const current = await currentResponse.json();
    const forecast = await forecastResponse.json();

    displayCurrentWeather(current, currentEl);
    displayForecast(forecast, forecastEl);
  } catch (error) {
    currentEl.innerHTML = "<p>Weather is unavailable right now.</p>";
    console.error(error);
  }
}

function displayCurrentWeather(data, container) {
  const temp = Math.round(data.main.temp);
  const description = data.weather[0].description;
  const icon = data.weather[0].icon;

  container.innerHTML = `
    <img
      src="https://openweathermap.org/img/wn/${icon}@2x.png"
      alt="${description}"
      width="60"
      height="60"
    >
    <div>
      <p class="weather-temp">${temp}&deg;C</p>
      <p class="weather-desc">${description}</p>
    </div>
  `;
}

function displayForecast(data, container) {
  // The 5-day/3-hour forecast returns 8 entries per day (every 3 hours).
  // Grab the entry closest to midday for each of the next 3 days.
  const middayEntries = data.list.filter(entry => entry.dt_txt.includes("12:00:00")).slice(0, 3);

  container.innerHTML = middayEntries
    .map(entry => {
      const date = new Date(entry.dt_txt);
      const label = date.toLocaleDateString("en-US", { weekday: "short" });
      const temp = Math.round(entry.main.temp);

      return `
        <li class="forecast-day">
          <span class="forecast-label">${label}</span>
          <span class="forecast-temp">${temp}&deg;C</span>
        </li>
      `;
    })
    .join("");
}

loadWeather();

// ---------- Member spotlights ----------
async function loadSpotlights() {
  const spotlightList = document.getElementById("spotlightList");

  try {
    const response = await fetch("data/members.json");
    if (!response.ok) throw new Error("Could not load members");

    const members = await response.json();

    // Gold (3) and silver (2) members only.
    const eligible = members.filter(member => member.membership === 2 || member.membership === 3);

    const chosen = shuffle(eligible).slice(0, randomBetween(2, 3));

    spotlightList.innerHTML = chosen.map(buildSpotlightCard).join("");
  } catch (error) {
    spotlightList.innerHTML = "<p>Member spotlights are unavailable right now.</p>";
    console.error(error);
  }
}

function buildSpotlightCard(member) {
  const tierNames = { 1: "Member", 2: "Silver", 3: "Gold" };
  const tierName = tierNames[member.membership];

  return `
    <div class="member-card">
      <img src="images/${member.image}" alt="${member.name} logo" loading="lazy">
      <span class="member-tier tier-${member.membership}">${tierName} member</span>
      <h3>${member.name}</h3>
      <address>${member.address}<br>${member.phone}</address>
      <div class="member-links">
        <a href="${member.website}" target="_blank" rel="noopener">Website</a>
      </div>
    </div>
  `;
}

function shuffle(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

loadSpotlights();
