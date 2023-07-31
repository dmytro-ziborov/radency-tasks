import Note from "../models/Note.js";
import categories from '../data/categories.js';
import notes from '../data/notes.js'

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
    try {
        const note = getNoteById(noteId);
        const category = getCategoryById(categoryID);
        note.setData(name, category, content)
    } catch (error) {
        console.error(`Error on editing node`, error)
    }
}

//deletes note from storage
const deleteNoteById = (id) => {
    try {
        const index = findNoteIndex(id);
        notes.splice(index, 1);
    } catch (error) {
        console.error(`Error on deleting note with id ${id}`);
    }
}

const findNoteIndex = (id) => {
    let index = notes.findIndex(note => note.id === id);
    if (index === -1)
        throw new Error(`Note with ${id} not found`);
    return index;
}

//changes note isActive status
const changeNoteStatus = (id) => {
    try {
        let note = getNoteById(id);
        note.updateStatus();
    } catch (error) {
        console.log(`Error on changing note status`, error)
    }
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