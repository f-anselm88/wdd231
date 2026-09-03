/*
  NOTE: This is a placeholder array shaped like the one the assignment
  links to from Canvas ("Course List Array"). Replace the contents below
  with the exact array provided there — the `subject`, `number`, `credits`,
  and `completed` values here are illustrative, built from courses already
  finished (WDD130, CSE111, CSE210) plus the rest of the Web and Computer
  Programming certificate.
*/
const courses = [
  { subject: "WDD", number: 130, title: "Web Fundamentals", credits: 2, completed: true },
  { subject: "CSE", number: 111, title: "Programming with Functions", credits: 2, completed: true },
  { subject: "WDD", number: 131, title: "Dynamic Web Fundamentals", credits: 1, completed: false },
  { subject: "CSE", number: 210, title: "Programming with Classes", credits: 2, completed: true },
  { subject: "WDD", number: 231, title: "Web Frontend Development I", credits: 2, completed: false },
  { subject: "CSE", number: 212, title: "Programming with Data Structures", credits: 2, completed: false },
  { subject: "WDD", number: 331, title: "Web Frontend Development II", credits: 2, completed: false },
  { subject: "CSE", number: 241, title: "Database Design and Programming", credits: 2, completed: false },
];

const courseList = document.querySelector("#courseList");
const creditTotal = document.querySelector("#creditTotal");
const filterButtons = document.querySelectorAll(".filter-btn");

function renderCourses(filter) {
  const filtered = courses.filter((course) => {
    if (filter === "all") return true;
    return course.subject.toLowerCase() === filter;
  });

  courseList.innerHTML = filtered
    .map(
      (course) => `
      <div class="course-card ${course.completed ? "completed" : ""}">
        <h3>${course.subject} ${course.number}</h3>
        <p>${course.title}</p>
        <p>${course.credits} credits</p>
        <span class="badge">${course.completed ? "Completed" : "In Progress"}</span>
      </div>
    `
    )
    .join("");

  const total = filtered.reduce((sum, course) => sum + course.credits, 0);
  creditTotal.textContent = total;
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
    renderCourses(button.dataset.filter);
  });
});

renderCourses("all");
