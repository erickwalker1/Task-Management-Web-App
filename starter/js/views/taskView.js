const modal = document.getElementById("modal");
export class Task {
  constructor(title, description, status, subtasks) {
    this.title = title;
    this.description = description;
    this.status = status;
    this.subtasks = subtasks; // this is returning [object Object] -- not sure why
  }

  // <!--- Closes Modal --->
  generateEventListener(className) {
    document
      .querySelector(`${className}`)
      .addEventListener("click", (event) => {
        modal.close();
      });
  }

  // <!--- Renders Modal Template --->
  generateModal() {
    modal.innerHTML = `
    <section class="modal-view">
    <p class="modal-heading">
      ${this.title}
    </p> 

    <!-- Exit Out Of Current Task Modal View -->
    <span class="button modal-close"></span>
  </section>


  <p class="text modal-text">
    ${this.description}
  </p>

  <section class="subtsk-list">
    <p class="text subtsk-txt">
      <!--Subtasks((# of checkboxes ::checked ) of (total # of "subtasks" checkboxes of each task view ))-->
      Subtasks (2 of ${this.subtasks.length})
    </p>

   ${this.subtasks
     .map(
       (subtask) =>
         `
     <div class = "chkbox-container">
     <input type="checkbox" name="chckbx" class="option" value="${subtask.title}">
     <label class="label" for="chckbx">${subtask.title}</label>
     </div>
   `
     )
     .join("")}
    </section>

  <label class="task-label" for="taskStatus">Current Status</label>
  <select class="task-status" name="taskStatus" id="status">
    <option value="Todo">Todo</option>
    <option value="Doing">Doing</option>
    <option value="Done">Done</option>
  </select>

  <!-- Container holding actions to edit or delete task -->
  <div class = "task-actions">
  <div class = "actions">
  <!-- Edit button to edit task -->
  <span class="button modal-edit">Edit</span>

  <!-- Dropdown pop-up to edit or delete task -->
  <span class="button modal-delete">Delete</span>
  </div>
  </div>

  `;
    // figure out the options (Todo, Doing, Done) Implementation

    // <!--- Opening Modal On Usr Click Event | Line ?? Modal.Js --->
    modal.show();
    // <!--- Modal 'Close' Button Event | Line 16 --->
    this.generateEventListener(`.close-button`);
  }
}
// <!--- Modal Dropdown | Keep For Now --->
// initial modal dropdown | keep for now
{
  /* <div class="dropdown">
      <img class="ellipsis" src="${"../starter/assets/icon-vertical-ellipsis.svg"}" alt="Ellipsis" />
      <ul>
        <li class="dropdown__list-item">Edit Task</li>
        <li class="dropdown__list-item">Delete Task</li>
      </ul>
    </div> */
}
