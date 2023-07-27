import { ActiveNoteTable } from "../components/ActiveNoteTable.component.js";
import { NoteForm } from "../components/NoteForm.component.js";
import NoteService from "./NoteService.js";

const loadTables = () => {
    const activeNotes = NoteService.getActiveNotes();
    ActiveNoteTable.create(activeNotes, NoteService, RenderService);
}
const updateTables = () => {
    let node = document.querySelector("#active-notes-container > #notes-table")
    node.parentNode.removeChild(node);
    // let stats = document.querySelector("#stats-container > #category-stats-table")
    // stats.parentNode.removeChild(stats);
    loadTables();
}

const init = () => {
    loadTables()
    NoteForm.create(NoteService, RenderService)
}

export const RenderService = {
    init, updateTables
}