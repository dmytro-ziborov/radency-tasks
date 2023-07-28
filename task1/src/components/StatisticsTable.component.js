import { CategoryStatRowComponent } from "./CategoryStatRow.component.js";

const parentContainer = "statistics-container";
const tableTemplateName = "category-stats-table-template";
const tableBodyName = "stats-data";

//creates table and fill it with data
const createTable = (stats, noteService, renderService) => {
    const tableTemplate = document.querySelector(`#${tableTemplateName}`)
    const table = tableTemplate.content.cloneNode(true);
    fillTable(table, stats, noteService, renderService)
    return table;
}

//fills table with data
const fillTable = (table, stats, noteService, renderService) => {
    const tableBody = table.querySelector(`#${tableBodyName}`);
    stats.forEach(stat => {
        const row = CategoryStatRowComponent.create(stat, noteService, renderService);
        tableBody.appendChild(row);
    })
}

//describes statistics table component
export const StatisticsTableComponent = {
    create: (noteService, renderService) => {
        const container = document.querySelector(`#${parentContainer}`);
        const table = createTable(noteService.getCategoriesStatistics(), noteService, renderService)
        container.appendChild(table);
    }
}