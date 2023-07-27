let idCounter = 1;
//Describes Note objects
export default class Note {
    constructor(name, category, content, dates, isActive = true) {
        this.id = idCounter++;
        this.name = name;
        this.createdAt = new Intl.DateTimeFormat("en-US", { day: "2-digit", month: "short", year: "numeric" }).format(new Date())
        this.category = category;
        this.content = content;
        this.dates = dates
        this.isActive = isActive;
    }
}