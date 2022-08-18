const container = document.querySelector(".container");
const hideSidebarBtn = document.querySelector(".toggle-hide");
const checkbox = document.querySelector("input[name=theme]");
const viewBtn = document.querySelector(".btn-toggle-view");

// <!--- Toggle Sidebar View: Hide --->
hideSidebarBtn.addEventListener("click", (event) => {
  event.preventDefault();
  container.classList.toggle("active");
});

// <!--- Toggle Sidebar View: Show --->
viewBtn.addEventListener("click", (event) => {
  event.preventDefault();
  container.classList.toggle("active");
});

// <!--- Toggle Theme --->
checkbox.addEventListener("change", function () {
  if (this.checked) {
    transition();
    document.documentElement.setAttribute("data-theme", "dark");
  } else {
    transition();
    document.documentElement.setAttribute("data-theme", "light");
  }
});

// <!--- Toggle Theme: Transition Effect --->
const transition = () => {
  document.documentElement.classList.add("transition");
  window.setTimeout(() => {
    document.documentElement.classList.remove("transition");
  }, 1000);
};
