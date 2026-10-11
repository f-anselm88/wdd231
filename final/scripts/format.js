// Small formatting helpers shared by several modules.

const BUDGET_LABELS = ["Budget friendly", "Moderate", "Premium"];

export function budgetLabel(level) {
  return BUDGET_LABELS[level - 1] ?? "Varies";
}

export function formatDate(isoDate) {
  const date = new Date(`${isoDate}T00:00:00`);
  return Number.isNaN(date.getTime())
    ? isoDate
    : date.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}
