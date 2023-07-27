import { NoteAction } from "./NoteAction.component.js";
import { NoteTableComponent } from "./NoteTable.component.js";

const parentContainer = "active-notes-container";

//table with Active notes
export const ActiveNoteTable = {
    create: (notes, noteService, renderService) => {
        const container = document.querySelector(`#${parentContainer}`);
        const table = NoteTableComponent.create(notes, NoteAction.createActive, noteService, renderService);
        container.appendChild(table)
    }
}