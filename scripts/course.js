// Course array for the Web and Computer Programming certificate.
// "completed" reflects real progress and should be updated as courses finish.
const courses = [
  { subject: "CSE", number: 110, title: "Introduction to Programming", credits: 2, completed: true },
  { subject: "WDD", number: 130, title: "Web Fundamentals", credits: 2, completed: true },
  { subject: "CSE", number: 111, title: "Programming with Functions", credits: 2, completed: true },
  { subject: "WDD", number: 131, title: "Dynamic Web Fundamentals", credits: 2, completed: false },
  { subject: "WDD", number: 230, title: "Programming with Classes", credits: 2, completed: false },
  { subject: "CSE", number: 231, title: "Web Frontend Development I", credits: 2, completed: false },
];

const courseList = document.querySelector("#course-list");
const filterButtons = document.querySelectorAll(".filter-btn");
const creditTotal = document.querySelector("#credit-total");

function renderCourses(subject) {
  const visible =
    subject === "ALL" ? courses : courses.filter((course) => course.subject === subject);

  courseList.innerHTML = visible
    .map(
      (course) => `
      <li class="course-card ${course.completed ? "is-complete" : ""}">
        <span class="course-code">${course.subject} ${course.number}</span>
        <span class="course-title">${course.title}</span>
        <span class="course-credits">${course.credits} cr</span>
      </li>`
    )
    .join("");

  const total = visible.reduce((sum, course) => sum + course.credits, 0);
  creditTotal.textContent = total;
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((btn) => btn.setAttribute("aria-pressed", "false"));
    button.setAttribute("aria-pressed", "true");
    renderCourses(button.dataset.subject);
  });
});

renderCourses("ALL");
