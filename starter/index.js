const container = document.querySelector(".container");
const hideSidebarBtn = document.querySelector(".toggle-hide");
const themeSwitch = document.getElementById("themeSwitch");
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
const resetTheme = function () {
  if (themeSwitch.checked) {
    transition();
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("themeSwitch", "dark"); // setting theme in local storage
  } else {
    transition();
    document.documentElement.setAttribute("data-theme", "light");
    localStorage.setItem("themeSwitch", "light"); // setting theme in local storage
  }
};

const initTheme = function () {
  const themeSelected = localStorage.getItem("themeSwitch"); // getting theme's value in local storage
  document.documentElement.setAttribute("data-theme", themeSelected);
};

if (themeSwitch) {
  initTheme();
  themeSwitch.addEventListener("change", resetTheme);
}

// <!--- Toggle Theme: Transition Effect --->
const transition = () => {
  document.documentElement.classList.add("transition");
  window.setTimeout(() => {
    document.documentElement.classList.remove("transition");
  }, 1000);
};
