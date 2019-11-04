/**
 * Miguel Espinoza
 * @miguespinoza
 */
import { GeoJsonLayer } from "@deck.gl/layers";

function makeGeoJsonLayer(data) {
  return new GeoJsonLayer({
    id: Math.random()
      .toString(36)
      .substring(2, 15),
    data
  });
}

export default makeGeoJsonLayer;
