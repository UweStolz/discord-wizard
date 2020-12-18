"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildChart = void 0;
const tslib_1 = require("tslib");
const quickchart_js_1 = tslib_1.__importDefault(require("quickchart-js"));
// eslint-disable-next-line import/prefer-default-export
async function buildChart(data) {
    const chart = new quickchart_js_1.default();
    chart
        .setConfig({
        type: 'bar',
        data: {
            labels: data.labels,
            datasets: [
                { label: 'Command - Count', data: data.datasets },
            ],
        },
    })
        .setWidth(800)
        .setHeight(400)
        .setBackgroundColor('transparent');
    const chartBuffer = chart.toBinary();
    return chartBuffer;
}
exports.buildChart = buildChart;
