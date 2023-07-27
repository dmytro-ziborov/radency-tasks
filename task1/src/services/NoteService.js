import Category from "../models/Category";
import Note from "../models/Note";

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
    createNote(name, categoryId, content) {
        const category = this.getCategoryById(categoryId);
        const dates = this.parseDates(content);
        return new Note(name, category, content, dates);
    }
    //returns category by id, if category didn't exists in storage - throws Error
    getCategoryById(id) {
        const category = this.#categories.find(element => element.id == id)
        if (!category)
            throw new Error(`Category with ${id} not found`)
        return category;
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
            this.createNote("Shopping List", this.getCategoryById(0), "Tomatoes, bread"),
            this.createNote("Outer life", this.getCategoryById(1), "Should we look for life beyond Earth?"),
            this.createNote("3", this.getCategoryById(0), "Tomatoes, bread"),
            this.createNote("4", this.getCategoryById(0), "Tomatoes, bread"),
            this.createNote("5", this.getCategoryById(0), "Tomatoes, bread"),
            this.createNote("6", this.getCategoryById(0), "Tomatoes, bread"),
            this.createNote("7", this.getCategoryById(0), "Tomatoes, bread"),
            this.createNote("8", this.getCategoryById(0), "Tomatoes, bread", false),
        ]
    }
}

export default new NoteService();