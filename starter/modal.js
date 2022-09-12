export const boardViews = {
  boards: [
    {
      name: "Platform Launch",
      columns: [
        {
          name: "Todo",
          tasks: [],
        },
        {
          name: "Doing",
          tasks: [],
        },
        {
          name: "Done",
          tasks: [],
        },
      ],
    },
    {
      name: "Marketing Plan",
      columns: [
        {
          name: "Todo",
          tasks: [],
        },
        {
          name: "Doing",
          tasks: [],
        },
        {
          name: "Done",
          tasks: [],
        },
      ],
    },
    {
      name: "Roadmap",
      columns: [
        {
          name: "Now",
          tasks: [],
        },
        {
          name: "Next",
          tasks: [],
        },
        {
          name: "Later",
          tasks: [],
        },
      ],
    },
  ],
};

// for each board object, we will create a custom list item (<li/>) containing icon & paragraph tag with link inside containing boards Name.
boardViews.boards.forEach((board) => {
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
