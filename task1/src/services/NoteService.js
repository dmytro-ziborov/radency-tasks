import Category from "../models/Category.js";
import Note from "../models/Note.js";

//categories data
const categories = [
    new Category("Task", "cart-fill"),
    new Category("Random Thought", "lightbulb-fill"),
    new Category("Idea", "lightning")];

//notes data
const notes = [
    new Note("Shopping List", categories[0], "Tomatoes, water, bread", false),
    new Note("Outer life", categories[1], "Should we look for life beyond Earth?"),
    new Note("Make pull request", categories[0], "make pull request 6/28/2023 or 7/7/2023"),
    new Note("Wake up", categories[2], "tomorrow (7/29/2023) at 6 am or later"),
    new Note("Start pet project", categories[2], "do something cool or not"),
    new Note("Stand by", categories[1], "there must be something"),
    new Note("", categories[0], ""),
    new Note("Previous note is empty", categories[1], "yep, it's possible. I have many empty real notes :D"),
    new Note("it's hidden idea", categories[2], "hidden idea - already idea", false),
]
//returns all notes
const getNotes = () => notes;

//adds note
const addNote = (name, categoryId, content) => {
    try {
        const category = getCategoryById(categoryId)
        const note = new Note(name, category, content)
        notes.push(note)
    } catch (error) {
        console.error(`Unable to add note`, error)
    }
}

//returns note by id, if note not found - throws error
const getNoteById = (id) => {
    const note = notes.find(n => n.id == id)
    if (!note)
        throw new Error(`Note with ${id} no found`)
    return note;
}

//returns category by id, if category didn't exists in storage - throws Error
const getCategoryById = (id) => {
    const category = getCategories().find(element => element.id == id)
    if (!category)
        throw new Error(`Category with ${id} not found`)
    return category;
}

//edits note data
const editNote = (noteId, name, categoryID, content) => {
    const note = getNoteById(noteId);
    const category = getCategoryById(categoryID);

    note.setData(name, category, content)
}

//deletes note from storage
const deleteNoteById = (id) => {
    let index = notes.findIndex(note => note.id === id);
    if (index === -1)
        throw new Error(`Note with ${id} not found`);
    notes.splice(index, 1);
}

//changes note isActive status
const changeNoteStatus = (id) => {
    let note = getNoteById(id);
    if (!note)
        throw new Error(`Note with ${id} not found`);
    note.updateStatus();
}

//returns notes by status
const getNotesByStatus = (isActive) => getNotes().filter(note => note.isActive === isActive);

//returns active notes
const getActiveNotes = () => getNotesByStatus(true);

//returns archived notes
const getArchivedNotes = () => getNotesByStatus(false)

//returns all categories
const getCategories = () => categories;

//returns all categories statistics
const getCategoriesStatistics = () =>
    getCategories().map(category => getCategoryStatistics(category));

//return concrete category statistics
const getCategoryStatistics = (category) => {
    return {
        category: category,
        active: getActiveNotes().filter(note => note.category.id === category.id).length,
        archived: getArchivedNotes().filter(note => note.category.id === category.id).length,
        notes: getArchivedNotes().filter(note => note.category.id === category.id)
    }
}

export default {
    getNotes, getActiveNotes, getArchiveNotes: getArchivedNotes, getCategories, getCategoriesStatistics, getCategoryById, getNoteById, editNote, addNote, deleteNoteById, changeNoteStatus
}