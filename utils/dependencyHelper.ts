import QuickChart from 'quickchart-js';

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
