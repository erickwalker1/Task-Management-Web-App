import { Task } from "./views/taskView.js";

// this returns array of board objects ( fetched it from the data.json file )
export const getBoards = async () => {
  let response = await fetch("./starter/js/data.json");
  let data = await response.json();
  let boards = data.boards;
  return boards;
};

export const template = (view) => {
  let boardView = document.getElementsByClassName("boards-list")[0];
  getBoards().then((boards) =>
    boards.forEach((board) => {
      if (board.name === view) {
        // for each column object (Line 7, 72, & 182 ~ "data.json" file) in the current boards' columns array, create and render
        board.columns.forEach((column) => {
          // generates a random color for our color code on page load
          let randomColor = `#${Math.floor(Math.random() * 16777215).toString(
            16
          )}`;

          // <!--- Color Status Code --->
          let colorCode = Object.assign(document.createElement("span"), {
            className: "column__color-code",
          });
          colorCode.style.backgroundColor = randomColor;

          // <!--- Column Container | Initial BG ➡️ "#e4ebfa"; ➡️➡️ IF (Column Contains An Array Of Tasks) set background = "fff"  --->
          let columnCont = Object.assign(document.createElement("ul"), {
            className: "column",
          });

          // <!--- Column Status Container --->
          let columnStatusCont = Object.assign(document.createElement("div"), {
            className: "column__status-container",
          });

          // <!--- Appending Everything To Board View --->
          columnStatusCont.append(colorCode, column.name);
          columnCont.append(columnStatusCont);
          boardView.append(columnCont);

          // <!--- CASE ~ If Column Is Empty ( Has No Task Objects ) Generate Placeholder Container --->
          if (column.tasks.length < 1) {
            let addTaskCont = Object.assign(document.createElement("div"), {
              className: "column__add-task-container",
            });
            let btnAddTask = Object.assign(document.createElement("button"), {
              className: "btn-add-task",
              innerText: `+ Add Task`,
            });

            // Event Listeners (Hover) For Generated Placeholder Containers
            addTaskCont.addEventListener("mouseover", (event) => {
              event.target.style.cursor = "pointer";
              setTimeout(() => {
                event.target.style.boxShadow =
                  "1px 1px 15px -2px rgba(0,0,0,0.11)";
                event.target.style.animation = "hovered, .5s ease-in-out";
              }, "100");
            });
            addTaskCont.addEventListener("mouseout", (event) => {
              setTimeout(() => {
                event.target.style.boxShadow = `0px 1px 11px -4px rgba(0, 0, 0, 0.11)`;
                event.target.style.animation = "1s ease-in-out";
              }, "100");
            });
            // <!--- Appending --->
            addTaskCont.append(btnAddTask);
            columnCont.append(addTaskCont);
          }
          // Testing | Logging Each Column ("Status" Containers)
          console.log(column);

          // <!--- Looping Column's Task Array Elements | Creating Task Template For Each One  --->
          column.tasks.forEach((task) => {
            let totalSubtsks = Object.assign(document.createElement("span"), {
              className: "total-subtsks",
              innerText: task.subtasks.length,
            });

            let taskDesc = Object.assign(document.createElement("p"), {
              className: "tsk-desc",
              innerText: task.title,
            });
            let taskSubtsk = Object.assign(document.createElement("p"), {
              className: "tsk-subtsks",
            });
            let checked = Object.assign(document.createElement("span"), {
              className: "chckd",
              innerText: 0, // placeholder ( once user checks the subtask off meaning he/she has completed it, update state)
            });
            let taskContainer = Object.assign(document.createElement("div"), {
              className: "task-container",
            });

            // <!--- Task Modal Blueprint --->
            const TaskModal = new Task(
              task.title,
              task.description,
              task.status,
              task.subtasks
            );

            // <!--- "Appending Task Container (and its child elements) To Current Column Status List"  --->
            taskSubtsk.append(
              checked,
              " ",
              "of",
              " ",
              totalSubtsks,
              " ",
              "subtasks"
            );
            taskContainer.append(taskDesc, taskSubtsk);
            columnCont.append(taskContainer);

            // <!--- Task Container: View Task Listener | Generates Task Modal For Every Task --->
            taskContainer.addEventListener("click", () => {
              TaskModal.renderModal();
            });

            // Testing
            console.log(task);
          });
        });
        // <!--- Placeholder "Add Column" Container   --->
        let btnAddCol = Object.assign(document.createElement("button"), {
          className: "btn-add-column",
          innerText: "+ New Column",
        });
        let addColCont = Object.assign(document.createElement("div"), {
          className: "column__container-tba",
        });

        // <!--- "Placeholder Container Hover Listener "  --->
        addColCont.addEventListener("mouseover", (event) => {
          event.target.style.cursor = "pointer";
          setTimeout(() => {
            event.target.style.boxShadow = "1px 1px 15px -2px rgba(0,0,0,0.11)";
            event.target.style.animation = "hovered, .5s ease-in-out";
          }, "100");
        });
        addColCont.addEventListener("mouseout", (event) => {
          setTimeout(() => {
            event.target.style.boxShadow = `0px 1px 11px -4px rgba(0, 0, 0, 0.11)`;
            event.target.style.animation = "1s ease-in-out";
          }, "100");
        });

        // <!--- "Append Elements (container & btn) To Current Board"  --->
        addColCont.append(btnAddCol);
        boardView.append(addColCont);
      }
    })
  );
};
