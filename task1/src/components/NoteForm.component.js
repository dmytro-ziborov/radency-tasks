const formTemplateName = "note-form";
const nameInputName = "name-input";
const categoryInputName = "category-input";
const contentInputName = "content-input";

const submitButtonTemplate = "submit-btn-template";
const submitButtonName = "submit-btn";

//fill select list of categories
const fillCategories = (noteService, form) => {
  const list = form.querySelector(`#${categoryInputName}`);

  noteService.getCategories().forEach(category => {
    const element = document.createElement("option");
    element.value = category.id
    element.textContent = category.name
    list.appendChild(element)
  });
}

//sets listeners to form status
const setListeners = (form, noteService, renderService) => {
  //actions on form shows
  form.addEventListener("show.bs.modal", event => {
    createSubmitButton(form)
    const button = event.relatedTarget;
    setFormType(button, form, noteService)
  })
  //action on form hides
  form.addEventListener("hidden.bs.modal", event => {
    setInputFields(form);
    removeSubmitButton(form);
    renderService.updateTables();
  });
}

//sets form type
const setFormType = (button, form, noteService) => {
  if (button.getAttribute("action") == "edit")
    prepareEditForm(form, noteService, button.id)
  else
    prepareCreateForm(form, noteService);
}

//prepares form to create new note
const prepareCreateForm = (form, noteService) => {
  const submit = form.querySelector(`#${submitButtonName}`);
  //changes button text
  submit.textContent = "Create";
  //set on click listener function
  submit.addEventListener("click", () => { addNote(form, noteService) })
}

//prepares form to edit note
const prepareEditForm = (form, noteService, id) => {
  const note = noteService.getNoteById(id);
  setInputFields(form, note.name, note.category.id, note.content);
  //adds identifier,changes button text
  const submit = form.querySelector(`#${submitButtonName}`)
  submit.textContent = "Edit"
  submit.setAttribute("note-id", id)
  //set on click listener function
  submit.addEventListener("click", () => { editNote(form, noteService) })

}
//set note data if exists to input fields
const setInputFields = (form, name = "", categoryId = 1, content = "") => {
  form.querySelector(`#${nameInputName}`).value = name;
  form.querySelector(`#${categoryInputName}`).value = categoryId;
  form.querySelector(`#${contentInputName}`).value = content;
}

//create submit button
const createSubmitButton = (form) => {
  const submitTemplate = document.querySelector(`#${submitButtonTemplate}`);
  const button = submitTemplate.content.cloneNode(true);
  form.querySelector(".modal-footer").appendChild(button);
}

//remove submit btn
const removeSubmitButton = (form) => {
  const button = form.querySelector(`#${submitButtonName}`);
  button.parentElement.removeChild(button)
}

//creates note
const addNote = (form, noteService) => {
  noteService.addNote(...collectData(form))
}

//edits note data
const editNote = (form, noteService) => {
  const noteId = form.querySelector(`#${submitButtonName}`).getAttribute("note-id");
  noteService.editNote(noteId, ...collectData(form))
}
//collects data from form inputs
const collectData = (form) => {
  const name = form.querySelector(`#${nameInputName}`).value;
  const categoryId = form.querySelector(`#${categoryInputName}`).value;
  const content = form.querySelector(`#${contentInputName}`).value;
  return [name, categoryId, content]
}
//form creation and edit note
export const NoteFormComponent = {
  create: (noteService, renderService) => {
    const form = document.querySelector(`#${formTemplateName}`);
    fillCategories(noteService, form);
    setListeners(form, noteService, renderService)
  },
};
