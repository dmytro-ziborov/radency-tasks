import Category from "../models/Category.js";
import Note from "../models/Note.js";

//describes service to work with notes and categories
class NoteService {
    //private fields of storages
    #categories = []
    #notes = []

    //initiates service and fill it with data
    constructor() {
        this.#categories = this.populateCategories();
        this.#notes = this.populateNotes();
    }
    //creates note-object and add it to storage
    addNote(name, categoryId, content) {
        try {
            const note = this.createNote(name, categoryId, content)
            this.#notes.push(note);
        } catch (error) {
            console.error(`Unable to add note`, error)
        }
    }
    //creates object of Note
    createNote(name, categoryId, content, isActive = true) {
        const category = this.getCategoryById(categoryId);
        const dates = this.parseDates(content);
        return new Note(name, category, content, dates, isActive);
    }
    //returns note by id, if note not found - throws error
    getNoteById(id) {
        const note = this.#notes.find(n => n.id == id)
        if (!note)
            throw new Error(`Note with ${id} no found`)
        return note;
    }
    //returns category by id, if category didn't exists in storage - throws Error
    getCategoryById(id) {
        const category = this.getCategories().find(element => element.id == id)
        if (!category)
            throw new Error(`Category with ${id} not found`)
        return category;
    }
    //edits note data
    editNote(noteId, name, categoryID, content) {
        const note = this.getNoteById(noteId);
        const category = this.getCategoryById(categoryID);
        note.name = name;
        note.category = category;
        note.content = content;
        note.dates = this.parseDates(content)
    }

    //deletes note from storage
    deleteNoteById(id) {
        let index = this.#notes.findIndex(note => note.id === id);
        if (index === -1)
            throw new Error(`Note with ${id} not found`);
        this.#notes.splice(index, 1);
    }

    //changes note isActive status
    changeNoteStatus(id) {
        let note = this.getNoteById(id);
        if (!note)
            throw new Error(`Note with ${id} not found`);
        note.isActive = !note.isActive;
    }

    //returns all notes
    getNotes() {
        return this.#notes;
    }

    //returns notes by status
    getNotesByStatus(isActive) { return this.getNotes().filter(note => note.isActive === isActive) }

    //returns active notes
    getActiveNotes() {
        return this.getNotesByStatus(true);
    }

    //returns archived notes
    getArchivedNotes() {
        return this.getNotesByStatus(false);
    }

    //returns all categories
    getCategories() {
        return this.#categories;
    }

    //returns all categories statistics
    getCategoriesStatistics() {
        return this.getCategories().map(category => this.getCategoryStatistics(category));
    }

    //return concrete category statistics
    getCategoryStatistics(category) {
        return {
            category: category,
            active: this.getActiveNotes().filter(note => note.category.id === category.id).length,
            archived: this.getArchivedNotes().filter(note => note.category.id === category.id).length,
            notes: this.getArchivedNotes().filter(note => note.category.id === category.id)
        }
    }

    //parses dates in format m/d/YYYY from content in array
    parseDates(content) {
        return content.match(/(1[0-2]|0?[1-9])\/(3[01]|[12][0-9]|0?[1-9])\/(?:[0-9]{4})/gm);
    }

    //creates default set of categories
    populateCategories() {
        return [
            new Category("Task", "cart-fill"),
            new Category("Random Thought", "lightbulb-fill"),
            new Category("Idea", "lightning")]
    }
    //creates default set of notes
    populateNotes() {
        return [
            this.createNote("Shopping List", 1, "Tomatoes, bread", false),
            this.createNote("Outer life", 2, "Should we look for life beyond Earth?"),
            this.createNote("3", 1, "I need to dantist 5/12/2023"),
            this.createNote("4", 1, "Tomatoes, bread"),
            this.createNote("5", 1, "Tomatoes, bread"),
            this.createNote("6", 1, "Tomatoes, bread"),
            this.createNote("7", 1, "Tomatoes, bread"),
            this.createNote("8", 1, "Tomatoes, bread", false),
        ]
    }
}

export default new NoteService();