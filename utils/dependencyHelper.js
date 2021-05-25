"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildMap = exports.buildChart = void 0;
const tslib_1 = require("tslib");
const quickchart_js_1 = tslib_1.__importDefault(require("quickchart-js"));
const osm_static_maps_1 = tslib_1.__importDefault(require("osm-static-maps"));
const logger_1 = tslib_1.__importDefault(require("../logger"));
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
async function buildMap(latitude, longitude, timestamp) {
    let imageBinaryBuffer = null;
    try {
        const currentTime = new Date(timestamp * 1000).toLocaleString('de-DE', {
            timeZone: 'Europe/Berlin',
        });
        imageBinaryBuffer = await osm_static_maps_1.default({
            geojson: {
                type: 'Point',
                markerIconOptions: {
                    iconSize: [50, 30],
                    iconUrl: 'http://open-notify.org/Open-Notify-API/map/ISSIcon.png',
                },
                coordinates: [
                    longitude,
                    latitude,
                ],
            },
            center: `${longitude}, ${latitude}`,
            type: 'jpeg',
            attribution: `Current ISS Location: ${currentTime}`,
            zoom: 2,
        });
    }
    catch (err) {
        logger_1.default.error('Could not build map!');
        logger_1.default.error(`MESSAGE: ${err.message}`);
    }
    return imageBinaryBuffer;
}
exports.buildMap = buildMap;
