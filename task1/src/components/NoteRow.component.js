const rowTemplateName = "note-row-template";

//sets note-data to row cells
const setData = (row, note) => {
    row.querySelector("tr").id = `note-${note.id}`;
    row.querySelector("#symbol > i").className += ` bi bi-${note.category.symbol}`;
    row.querySelector("#name").textContent = note.name;
    row.querySelector("#created").textContent = note.createdAt;
    row.querySelector("#category").textContent = note.category.name;
    row.querySelector("#content").textContent = note.content;
    row.querySelector("#dates").textContent = note.dates;
}
//sets actions
const setActions = (row, note, actions, noteService, renderService) => {
    row.querySelector("#actions > #note-actions").appendChild(actions(note, noteService, renderService))
}

//row with Note data
export const NoteRowComponent = {
    //Creates and fill row 
    create: (note, actions, noteService, renderService) => {
        const rowTemplate = document.querySelector(`#${rowTemplateName}`);
        const row = rowTemplate.content.cloneNode(true);
        setData(row, note)
        setActions(row, note, actions, noteService, renderService);
        return row
    }
}