import { ArchiveNoteTableComponent } from "./ArchiveNoteTable.component.js";

const templateName = "category-stat-row-template";
const tableContainer = "archived-table-container"

//fills table cells with data
const setData = (row, stat) => {
    row.querySelector("#category-row-").id += stat.category.id
    row.querySelector("#collapse-table-").id += stat.category.id
    row.querySelector("#symbol > i").className += ` bi bi-${stat.category.symbol}`;
    row.querySelector("#name").textContent = stat.category.name;
    row.querySelector("#active").textContent = stat.active;
    row.querySelector("#archived").textContent = stat.archived;
    let collapse = row.querySelector(`#category-row-${stat.category.id}`);
    collapse.setAttribute("href", `#collapse-table-${stat.category.id}`)
    collapse.setAttribute("aria-controls", `#collapse-table-${stat.category.id}`)
}

//sets archived notes table for category
const setNotesTable = (row, stat, noteService, renderService) => {
    const container = row.querySelector(`#collapse-table-${stat.category.id} > #${tableContainer}`);
    const table = ArchiveNoteTableComponent.create(stat.notes, noteService, renderService);
    container.appendChild(table);
}

//describes row of the Statistics table
export const CategoryStatRowComponent = {
    create: (stat, noteService, renderService) => {
        const rowTemplate = document.querySelector(`#${templateName}`);
        const row = rowTemplate.content.cloneNode(true);
        setData(row, stat);
        setNotesTable(row, stat, noteService, renderService)
        return row;
    }
}