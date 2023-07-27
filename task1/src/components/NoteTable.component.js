import { NoteRowComponent } from "./NoteRow.component.js";

const tableTemplateName = "note-table-template";
const tableBodyName = "notes-table-data";

//fills table with rows 
const fillTable = (table, notes) => {
    const tableBody = table.querySelector(`#${tableBodyName}`)
    notes.forEach(note => {
        const row = NoteRowComponent.create(note);
        tableBody.appendChild(row);
    })
}

//table with Notes
export const NoteTableComponent = {
    //creates table with notes
    create: (notes) => {
        const tableTemplate = document.querySelector(`#${tableTemplateName}`);
        const table = tableTemplate.content.cloneNode(true);
        fillTable(table, notes);
        return table;
    }
}