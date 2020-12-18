"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateStatForColumn = exports.getStatistics = exports.createTableIfNotExist = void 0;
const database_1 = require("../database");
const dependencyHelper_1 = require("./dependencyHelper");
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function createTableIfNotExist(table, tableQuery) {
    const q = `CREATE TABLE IF NOT EXISTS ${table}(${tableQuery})`;
    return database_1.query(q);
}
exports.createTableIfNotExist = createTableIfNotExist;
async function getStatistics() {
    let chart = null;
    const q = 'SELECT * FROM statistics ORDER BY id ASC';
    const res = await database_1.query(q);
    if (res) {
        const { rows } = res;
        const data = {
            labels: [],
            datasets: [],
        };
        rows.forEach((obj) => {
            data.labels.push(obj.name);
            data.datasets.push(obj.count);
        });
        chart = await dependencyHelper_1.buildChart(data);
    }
    return chart;
}
exports.getStatistics = getStatistics;
async function updateStatForColumn(column) {
    await database_1.query('SELECT name from statistics');
    const q = `SELECT count FROM statistics WHERE name = '${column}'`;
    const res = await database_1.query(q);
    if (res && res.rows.length > 0) {
        const currentCount = res.rows[0].count;
        const updatedCount = currentCount + 1;
        const updateQuery = `UPDATE statistics SET count = ${updatedCount} WHERE name = '${column}'`;
        await database_1.query(updateQuery);
    }
}
exports.updateStatForColumn = updateStatForColumn;
