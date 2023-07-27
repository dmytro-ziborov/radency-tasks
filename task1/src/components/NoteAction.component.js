const activeActionTemplateName = "note-active-actions";
const copyTemplate = (templateName) => {
    const template = document.querySelector(`#${templateName}`)
    console.log(template)
    return template.content.cloneNode(true);
}
export const NoteAction = {
    createActive: (note) => {
        const actions = copyTemplate(activeActionTemplateName);
        actions.querySelector("#edit");
        actions.querySelector("#edit").setAttribute("action", "edit")
        actions.querySelector("#edit").id = note.id;
        actions.querySelector("#archive").addEventListener("click", () => { NoteService.changeNoteStatus(note.id); Render.updateTables() })
        actions.querySelector("#delete").addEventListener("click", () => { NoteService.deleteNoteById(note.id); Render.updateTables() })
        return actions
    }
}