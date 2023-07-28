let idCounter = 1;

//parses dates in format m/d/YYYY from content in array
const parseDates = (value) => {
    return value.match(/(1[0-2]|0?[1-9])\/(3[01]|[12][0-9]|0?[1-9])\/(?:[0-9]{4})/gm);
}

//Describes Note object
export default class Note {
    constructor(name, category, content, isActive = true) {
        this.id = idCounter++;
        this.createdAt = new Intl.DateTimeFormat("en-US", { day: "2-digit", month: "short", year: "numeric" }).format(new Date())
        this.setData(name, category, content);
        this.isActive = isActive;
    }

    setData(name, category, content) {
        this.name = name;
        this.category = category;
        this.content = content;
        this.dates = parseDates(content);
    }
    updateStatus() {
        this.isActive = !this.isActive;
    }

}