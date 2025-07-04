import * as ChartGeo from "chartjs-chart-geo";
import {
  Chart,
  CategoryScale,
  Tooltip,
  Title,
  Legend,
  ChartItem,
  ChartConfiguration,
  PointElement
} from "chart.js";

interface GeoChartOptions {
  canvasId: string;
  dataUrl?: string;
}

class GeoChart {
  private canvasId: string;
  private dataUrl: string;

  constructor(options: GeoChartOptions) {
    this.canvasId = options.canvasId || 'myChart';
    this.dataUrl = "https://raw.githubusercontent.com/markmarkoh/datamaps/master/src/js/data/bra.topo.json";
  }

  public async handle(): Promise<void> {
    Chart.register(
      Title,
      Tooltip,
      Legend,
      CategoryScale,
      ChartGeo.ChoroplethController,
      ChartGeo.ProjectionScale,
      ChartGeo.ColorScale,
      ChartGeo.GeoFeature,
      ChartGeo.BubbleMapController,
      ChartGeo.SizeScale,
      PointElement
    );

    try {
      let ctx = document.getElementById(this.canvasId) as HTMLCanvasElement | null;

      if (!ctx) {
        throw new Error(`Canvas element with ID '${this.canvasId}' not found`);
      }

      const chartItem = ctx?.getContext('2d') as ChartItem;

      const response = await fetch(this.dataUrl);
      const value = await response.json();

      let data = (ChartGeo.topojson.feature(value, value.objects.bra) as any).features;


      const config: ChartConfiguration = {
        type: 'choropleth' as any,
        data: {
          labels: data.map((d: any) => d.properties.name),
          datasets: [
            {
              outline: data,
              label: "Brasil",
              data: data.map((d: any) => {
                if(["Rio de Janeiro", "Alagoas", "Bahia"].includes(d.properties.name)) {
                  return ({
                    feature: d,
                    value: 10
                  })
                }
                return ({
                  feature: d,
                  value: 0
                })
              })
            },
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          // @ts-ignore - These are valid options for chartjs-chart-geo but not in Chart.js types
          showOutline: true,
          showGraticule: true,
          plugins: {
            legend: {
              display: true
            },
            tooltip: {
              callbacks: {
                label: (context: any) => {
                  if (context.datasetIndex === 1) { // Paraíba regions dataset
                    const name = context.raw.name;
                    const value = context.raw.value.toFixed(1);
                    return `${name}: ${value}`;
                  } else { // Countries dataset
                    const country = context.raw?.feature?.properties?.name || 'Unknown';
                    return country;
                  }
                }
              }
            },
            title: {
              display: true,
              text: 'Regiões do Brasil',
            }
          },
          hover: {
            mode: "nearest"
          },
          scales: {
            xy: {
              projection: "mercator",
            }
          }
        }
      };
      new Chart(chartItem, config);

    } catch (error) {
      console.error("Error creating geo chart:", error);
    }
  }
}

const GeoChartJs = {
  GeoChart
};

export { GeoChart };
export default GeoChartJs;