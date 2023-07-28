const activeActionTemplateName = "note-active-actions";
const archiveActionTemplateName = "note-archived-actions";

const copyTemplate = (templateName) => {
    const template = document.querySelector(`#${templateName}`)
    return template.content.cloneNode(true);
}
//describes NoteAction components
export const NoteActionComponent = {
    //creates components for active notes
    createActive: (note, noteService, renderService) => {
        const actions = copyTemplate(activeActionTemplateName);
        actions.querySelector("#edit");
        actions.querySelector("#edit").id = note.id;
        actions.querySelector("#archive").addEventListener("click", () => { noteService.changeNoteStatus(note.id); renderService.updateTables() })
        actions.querySelector("#delete").addEventListener("click", () => { noteService.deleteNoteById(note.id); renderService.updateTables() })
        return actions
    },
    //creates components for archived notes
    createArchive: (note, noteService, renderService) => {
        const actions = copyTemplate(archiveActionTemplateName);
        actions.querySelector("#unarchive").addEventListener("click", () => { noteService.changeNoteStatus(note.id); renderService.updateTables() })
        actions.querySelector("#delete").addEventListener("click", () => { noteService.deleteNoteById(note.id); renderService.updateTables() })
        return actions
    },
}