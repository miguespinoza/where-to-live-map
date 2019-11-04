/**
 * Miguel Espinoza
 * @miguespinoza
 */

import getWeight from "../getWeight";
import { HeatmapLayer } from "@deck.gl/aggregation-layers";

function makeCrimeHeatmap(crimeData, rules) {
  const layer = new HeatmapLayer({
    id: "heatmapLayer",
    data: crimeData,
    getPosition: d => {
      return [d.longitud, d.latitud];
    },
    getWeight: d => getWeight(d, rules),
    updateTriggers: {
      getWeight: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    }
  });
  return layer;
}

export default makeCrimeHeatmap;
