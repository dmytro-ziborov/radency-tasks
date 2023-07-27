import NoteService from "../services/NoteService.js";

const activeActionTemplateName = "note-active-actions";
const copyTemplate = (templateName) => {
    const template = document.querySelector(`#${templateName}`)
    return template.content.cloneNode(true);
}
export const NoteAction = {
    createActive: (note, noteService, renderService) => {
        const actions = copyTemplate(activeActionTemplateName);
        actions.querySelector("#edit");
        // actions.querySelector("#edit").setAttribute("action", "edit")
        actions.querySelector("#edit").id = note.id;
        actions.querySelector("#archive").addEventListener("click", () => { noteService.changeNoteStatus(note.id); renderService.updateTables() })
        actions.querySelector("#delete").addEventListener("click", () => { noteService.deleteNoteById(note.id); renderService.updateTables() })
        return actions
    }
}