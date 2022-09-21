import { boardViews } from "./modal.js";
const boardCount = document.getElementById("count");
const container = document.querySelector(".container");
const themeSwitch = document.getElementById("themeSwitch");
const viewBtn = document.querySelector(".btn-toggle-view");
const hideSidebarBtn = document.querySelector(".toggle-hide");
const boardItems = Array.from(document.getElementsByClassName("list__item"));

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

// <!--- Initial Theme --->
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

//  <!--- Column Template --->
const template = function (board) {
  let list = document.getElementsByClassName("column-list")[0];
  board.columns.forEach((boardColumn) => {
    let boardTemplate = document.createElement("div");
    boardTemplate.style.background = "#e4ebfa";
    boardTemplate.style.height = "100%";
    boardTemplate.style.width = "100%";
    boardTemplate.textContent = boardColumn.name; // temp, will eventually be replaced
    list.append(boardTemplate);
  });
};

//  <!--- Render Template --->
const renderTemplate = function (view) {
  boardViews.boards.forEach((board) => {
    if (board.name === view) template(board);
  });
};

// <!--- Get Active Board  --->
const getActiveBoard = function (
  currentView = localStorage.getItem("boardName")
) {
  renderTemplate(currentView);
  boardItems.forEach((board) => {
    if (board.textContent === currentView) {
      board.classList.toggle("list__item--active");
    }
  });
};

// <!--- Update Active Board  --->
const updateActiveBoard = function () {
  let list = document.getElementsByClassName("column-list")[0];
  list.replaceChildren();

  // <!--- remove active class from other boards and add it to target element that was clicked --->
  boardItems.forEach((boardItem) => {
    boardItem.classList.remove("list__item--active");
  });
  this.classList.toggle("list__item--active");

  // <!--- set clicked board to localStorage & set heading to board items name --->
  localStorage.setItem("boardName", `${this.textContent}`);
  document.getElementsByClassName("header__heading")[0].textContent =
    localStorage.getItem("boardName");

  renderTemplate(localStorage.getItem("boardName"));
};

// <!--- EVENTS --->

// <!--- Webpage Load Event --->
window.onload = function () {
  getActiveBoard();
  // <!--- Setting Board View Count --->
  boardCount.textContent = boardViews.boards.length;
  document.getElementsByClassName("header__heading")[0].textContent =
    localStorage.getItem("boardName") ||
    localStorage.setItem("boardName", "No Available Boards");
};

// <!--- Board Click Event --->
const boardClickListener = function () {
  boardItems.forEach((board) => {
    board.addEventListener("click", updateActiveBoard);
  });
};

boardClickListener();
