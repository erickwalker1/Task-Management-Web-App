const container = document.querySelector(".container");
const hideSidebarBtn = document.querySelector(".toggle-hide");

hideSidebarBtn.addEventListener("click", (event) => {
  event.preventDefault();
  container.classList.contains("container")
    ? container.classList.replace("container", "container-hide-sidebar")
    : container.classList.replace("container-hide-sidebar", "container");
});
