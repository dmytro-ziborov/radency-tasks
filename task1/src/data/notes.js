import Note from "../models/Note.js";
import categories from "./categories.js";

//notes data
const notes = [
    new Note("Shopping List", categories[0], "Tomatoes, water, bread", false),
    new Note("Outer life", categories[1], "Should we look for life beyond Earth?"),
    new Note("Make pull request", categories[0], "make pull request 6/28/2023 or 7/7/2023"),
    new Note("Wake up", categories[2], "tomorrow (7/29/2023) at 6 am or later"),
    new Note("", categories[0], ""),
    new Note("Previous note is empty", categories[1], "yep, it's possible. I have many empty real notes :D"),
    new Note("it's hidden idea", categories[2], "hidden idea - already idea", false),
]

export default notes;