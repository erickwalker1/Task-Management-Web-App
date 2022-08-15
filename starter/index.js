const container = document.querySelector(".container");
const hideSidebarBtn = document.querySelector(".toggle-hide");
const checkbox = document.querySelector("input[name=theme]");

hideSidebarBtn.addEventListener("click", (event) => {
  event.preventDefault();
  container.classList.contains("container")
    ? container.classList.replace("container", "container-hide-sidebar")
    : container.classList.replace("container-hide-sidebar", "container");
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

const transition = () => {
  document.documentElement.classList.add("transition");
  window.setTimeout(() => {
    document.documentElement.classList.remove("transition");
  }, 1000);
};
