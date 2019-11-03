/**
 * Miguel Espinoza
 * @miguespinoza
 */
import { useGet } from "restful-react";
import makeCrimeHeatmap from "../../makeCrimeHeatmap";

const defaultRules = {
  "ALLANAMIENTO DE MORADA": 100,
  ROBO: 50,
  "SIN VIOLENCIA": 2,
  "ABUSO SEXUAL": 30,
  VIOLACION: 100
};

function useCrimeHeatmapLayer() {
  const { data } = useGet(
    "https://crimencdmx2019.s3.us-east-2.amazonaws.com/dataGz.json"
  );
  const layer = makeCrimeHeatmap(data || [], defaultRules);
  return layer;
}

export default useCrimeHeatmapLayer;
