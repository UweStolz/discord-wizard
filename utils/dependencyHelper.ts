import QuickChart from 'quickchart-js';
import osmsm from 'osm-static-maps';
import logger from '../logger';

// eslint-disable-next-line import/prefer-default-export
export async function buildChart(data: any): Promise<Buffer> {
  const chart = new QuickChart();
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

export async function buildMap(latitude: number, longitude: number, timestamp: number): Promise<Buffer | null> {
  let imageBinaryBuffer: null | Buffer = null;
  try {
    const currentTime = new Date(timestamp * 1000).toLocaleString('de-DE', {
      timeZone: 'Europe/Berlin',
    });

    imageBinaryBuffer = await osmsm({
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
  } catch (err) {
    logger.error('Could not build map!');
    logger.error(`MESSAGE: ${err.message}`);
  }
  return imageBinaryBuffer;
}
