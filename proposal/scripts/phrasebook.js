// phrasebook.js — fetches phrase data and drives the interactive phrasebook page

const DATA_URL = 'data/phrases.json';
const STORAGE_KEY = 'phrasebook-last-filter';

const grid = document.querySelector('#phrase-grid');
const filterBar = document.querySelector('#filter-bar');
const countEl = document.querySelector('#phrase-count');
const modal = document.querySelector('#phrase-modal');
const modalRukwangali = document.querySelector('#modal-rukwangali');
const modalEnglish = document.querySelector('#modal-english');
const modalNote = document.querySelector('#modal-note');
const modalCategory = document.querySelector('#modal-category');
const modalCloseBtn = document.querySelector('#modal-close');

let allPhrases = [];

async function loadPhrases() {
  try {
    const response = await fetch(DATA_URL);

    if (!response.ok) {
      throw new Error(`Network response was not ok (status ${response.status})`);
    }

    const data = await response.json();
    allPhrases = data;

    buildFilterButtons(data);

    const savedFilter = localStorage.getItem(STORAGE_KEY) || 'all';
    applyFilter(savedFilter);
  } catch (error) {
    grid.innerHTML = `<p role="alert">Sorry — the phrasebook could not be loaded right now. (${error.message})</p>`;
    console.error('Failed to load phrases:', error);
  }
}

function buildFilterButtons(phrases) {
  const categories = ['all', ...new Set(phrases.map((phrase) => phrase.category))];

  filterBar.innerHTML = categories
    .map(
      (category) => `
      <button
        class="filter-btn"
        type="button"
        data-category="${category}"
        aria-pressed="${category === 'all' ? 'true' : 'false'}"
      >
        ${category === 'all' ? 'All phrases' : category.replace('-', ' ')}
      </button>`
    )
    .join('');

  filterBar.querySelectorAll('.filter-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const category = btn.dataset.category;
      applyFilter(category);
      localStorage.setItem(STORAGE_KEY, category);
    });
  });
}

function applyFilter(category) {
  const filtered =
    category === 'all'
      ? allPhrases
      : allPhrases.filter((phrase) => phrase.category === category);

  renderPhrases(filtered);
  updateFilterButtons(category);
  countEl.textContent = `Showing ${filtered.length} of ${allPhrases.length} phrases`;
}

function updateFilterButtons(activeCategory) {
  filterBar.querySelectorAll('.filter-btn').forEach((btn) => {
    btn.setAttribute('aria-pressed', String(btn.dataset.category === activeCategory));
  });
}

function renderPhrases(phrases) {
  grid.innerHTML = phrases
    .map(
      (phrase) => `
      <button class="phrase-card" type="button" data-id="${phrase.id}">
        <p class="rukwangali">${phrase.rukwangali}</p>
        <p class="english">${phrase.english}</p>
        <span class="category-tag">${phrase.category.replace('-', ' ')}</span>
      </button>`
    )
    .join('');

  grid.querySelectorAll('.phrase-card').forEach((card) => {
    card.addEventListener('click', () => openModal(Number(card.dataset.id)));
  });
}

function openModal(id) {
  const phrase = allPhrases.find((item) => item.id === id);
  if (!phrase || typeof modal.showModal !== 'function') return;

  modalRukwangali.textContent = phrase.rukwangali;
  modalEnglish.textContent = phrase.english;
  modalNote.textContent = phrase.usageNote;
  modalCategory.textContent = phrase.category.replace('-', ' ');

  modal.showModal();
}

modalCloseBtn?.addEventListener('click', () => modal.close());
modal?.addEventListener('click', (event) => {
  // close when clicking the backdrop (outside the dialog's content box)
  const rect = modal.getBoundingClientRect();
  const clickedOutside =
    event.clientX < rect.left ||
    event.clientX > rect.right ||
    event.clientY < rect.top ||
    event.clientY > rect.bottom;
  if (clickedOutside) modal.close();
});

loadPhrases();
