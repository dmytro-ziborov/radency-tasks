import { ActiveNoteTableComponent } from "../components/ActiveNoteTable.component.js";
import { NoteFormComponent } from "../components/NoteForm.component.js";
import { StatisticsTableComponent } from "../components/StatisticsTable.component.js";
import NoteService from "./NoteService.js";

const statisticsContainer = "statistics-container"
const statisticsData = "category-stats-table"
const notesContainer = "active-notes-container"
const notesData = "notes-table"

//load tables on page
const loadTables = () => {
    const activeNotes = NoteService.getActiveNotes();
    ActiveNoteTableComponent.create(activeNotes, NoteService, RenderService);
    StatisticsTableComponent.create(NoteService, RenderService);
}

//redraws table on page
const updateTables = () => {
    removeTable(notesContainer, notesData)
    removeTable(statisticsContainer, statisticsData)
    loadTables();
}

//removes table from page if it exists
const removeTable = (containerName, dataContainer) => {
    let node = document.querySelector(`#${containerName} > #${dataContainer}`);
    if (node) node.parentNode.removeChild(node);
}
//initiates 
const init = () => {
    updateTables();
    NoteFormComponent.create(NoteService, RenderService)
}

//describes service to control data on the page
export const RenderService = {
    init, updateTables
}