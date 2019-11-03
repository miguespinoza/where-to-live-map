import { useGet } from "restful-react";
import MAPBOX_ACCESS_TOKEN from "../../configuration";

/**
 * Miguel Espinoza
 * @miguespinoza
 */

const useIsochroneLayer = (
  latitude: number,
  longitude: number,
  minutes: number = 20,
  type: "driving" | "cycling" | "walking" = "driving"
) => {
  let profile = `mapbox/${type}`;
  const { data } = useGet(
    `https://api.mapbox.com/isochrone/v1/${profile}/${longitude},${latitude}?${minutes}&polygons=true&access_token=${MAPBOX_ACCESS_TOKEN}`
  );

  return data;
};

export default useIsochroneLayer;
