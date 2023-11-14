import { getBoards, template } from "./modal.js";
// Declarations
const boardsArr = await getBoards();
const boardCount = document.getElementById("count");
const container = document.querySelector(".container");
const themeSwitch = document.getElementById("themeSwitch");
const hideSidebarBtn = document.querySelector(".toggle-hide");
const viewSidebarBtn = document.querySelector(".btn-toggle-view");
// const boardElements = Array.from(document.getElementsByClassName("list__item"));

// <!--- Toggle Sidebar View: Hide --->
hideSidebarBtn.addEventListener("click", (event) => {
  event.preventDefault();
  container.classList.toggle("active");
});

// <!--- Toggle Sidebar View: Show --->
viewSidebarBtn.addEventListener("click", (event) => {
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

//  <!--- Creating & Returning List Of Available Boards ( Sidebar) --->
const getArrayOfBoards = async () => {
  await getBoards().then((boardsArray) => {
    boardsArray.forEach((board) => {
      let link = document.createElement("a");
      let paragraph = document.createElement("p");
      let listItem = document.createElement("li");
      let list = document.getElementsByClassName("list");
      let createBoard = document.getElementById("board-create");
      let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      let path = document.createElementNS("http://www.w3.org/2000/svg", "path");

      link.className = "list-link";
      paragraph.className = "list__paragraph";
      listItem.className = "list__item";

      svg.appendChild(path);
      svg.classList.add("icon-board");
      svg.setAttribute("width", "16");
      svg.setAttribute("height", "16");
      path.setAttribute(
        "d",
        "M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z"
      );

      link.href = "#";
      link.textContent = `${board.name}`;
      paragraph.appendChild(link);
      listItem.appendChild(svg);
      listItem.appendChild(paragraph);
      list[0].insertBefore(listItem, createBoard);
    });
  });
  // Setting Board Count And Rendering Current Board
  boardCount.textContent = boardsArr.length;
  document.getElementsByClassName("header__heading")[0].textContent =
    localStorage.getItem("boardName") ||
    localStorage.setItem("boardName", "No Available Boards");
};

// <!--- Getting The Active Board  --->
const getActiveBoard = async (
  currentView = localStorage.getItem("boardName")
) => {
  await getBoards();
  // defining current board elements
  let boardsView = Array.from(document.getElementsByClassName("list__item"));
  boardsView.forEach((boardElement) => {
    if (boardElement.innerText === currentView) {
      boardElement.classList.toggle("list__item--active");
    }
  });
  template(currentView); // template('Platform Launch');
  console.log(boardsView);
};

// <!--- Updating The Active Board  --->
const updateActiveBoard = function () {
  let list = document.getElementsByClassName("boards-list")[0];
  let boardsView = Array.from(document.getElementsByClassName("list__item"));

  list.replaceChildren();

  // <!--- remove the active class from other boards and add it to target element that was clicked --->
  boardsView.forEach((board) => board.classList.remove("list__item--active"));
  this.classList.toggle("list__item--active");

  // <!--- set clicked board to localStorage & set heading to clicked boards name --->
  localStorage.setItem("boardName", `${this.textContent}`);
  document.getElementsByClassName("header__heading")[0].textContent =
    localStorage.getItem("boardName");

  template(localStorage.getItem("boardName"));
};

// <!--- EVENTS --->

// <!--- Board Click Event --->
const boardEventListener = async function () {
  await getBoards(); // waiting for the boards to be fetched first (from data.json)
  let boardsView = Array.from(document.getElementsByClassName("list__item"));
  boardsView.forEach((board) => {
    board.addEventListener("click", updateActiveBoard);
  });
};
getArrayOfBoards();
getActiveBoard();
boardEventListener();
