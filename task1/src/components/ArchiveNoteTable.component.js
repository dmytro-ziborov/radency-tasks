import { NoteActionComponent } from "./NoteAction.component.js";
import { NoteTableComponent } from "./NoteTable.component.js";

//creates and returns table with archived notes
export const ArchiveNoteTableComponent = {
    create: (notes, noteService, renderService) => NoteTableComponent.create(notes, NoteActionComponent.createArchive, noteService, renderService)
}