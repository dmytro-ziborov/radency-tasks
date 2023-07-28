import { NoteActionComponent } from "./NoteAction.component.js";
import { NoteTableComponent } from "./NoteTable.component.js";

const parentContainer = "active-notes-container";

//table with Active notes
export const ActiveNoteTableComponent = {
    create: (notes, noteService, renderService) => {
        const container = document.querySelector(`#${parentContainer}`);
        const table = NoteTableComponent.create(notes, NoteActionComponent.createActive, noteService, renderService);
        container.appendChild(table)
    }
}