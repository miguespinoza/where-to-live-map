import MAPBOX_ACCESS_TOKEN from "../../configuration";
import { useEffect, useState } from "react";
import makeGeoJsonLayer from "../../makeGeoJsonLayer";

/**
 * Miguel Espinoza
 * @miguespinoza
 */
type Place = {
  center: number[];
};

const commuteTypes: { [id: string]: string } = {
  Conduciendo: "driving",
  Caminando: "walking",
  Bicicleta: "cycling"
};

const useIsochroneLayers = (places: Place[], type: string) => {
  const [layers, setlayers] = useState<any[]>([]);
  useEffect(() => {
    for (let place of places) {
      if (place != null) {
        fetch(
          `https://api.mapbox.com/isochrone/v1/mapbox/${commuteTypes[type]}/${place.center[0]},${place.center[1]}?polygons=true&access_token=${MAPBOX_ACCESS_TOKEN}&contours_minutes=5,10&contours_colors=6706ce,04e813`
        )
          .then(r => r.json())
          .then(r => {
            setlayers((lay: any) => {
              return [...lay, makeGeoJsonLayer(r)];
            });
          });
      }
    }
  }, [places, setlayers, type]);

  return layers;
};

export default useIsochroneLayers;
