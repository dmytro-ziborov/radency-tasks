import { NoteRowComponent } from "./NoteRow.component.js";

const tableTemplateName = "note-table-template";
const tableBodyName = "notes-table-data";

//fills table with rows 
const fillTable = (table, notes, actions, noteService, renderService) => {
    const tableBody = table.querySelector(`#${tableBodyName}`)
    notes.forEach(note => {
        const row = NoteRowComponent.create(note, actions, noteService, renderService);
        tableBody.appendChild(row);
    })
}

//table with Notes
export const NoteTableComponent = {
    //creates table with notes
    create: (notes, actions, noteService, renderService) => {
        const tableTemplate = document.querySelector(`#${tableTemplateName}`);
        const table = tableTemplate.content.cloneNode(true);
        fillTable(table, notes, actions, noteService, renderService);
        return table;
    }
}