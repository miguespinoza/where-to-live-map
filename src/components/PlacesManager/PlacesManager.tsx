import React, { useState } from "react";
import PlaceSearch from "../PlaceSearch";

/**
 * Miguel Espinoza
 * @miguespinoza
 */

const PlacesManager: React.FC<{
  title: string;
  lugares: any[];
  setLugares: (a: any) => void;
}> = ({ title, lugares, setLugares }) => {
  return (
    <>
      <h2>{title}</h2>
      <button onClick={() => setLugares((lugares: any) => [...lugares, null])}>
        Agregar Lugar
      </button>
      {lugares.map(l => (
        <PlaceSearch
          place={l}
          onClose={() => {}}
          onSelect={p =>
            setLugares((lugares: any) => {
              const i = lugares.findIndex((d: any) => d == null);
              lugares[i] = p;
              return [...lugares];
            })
          }
        ></PlaceSearch>
      ))}
    </>
  );
};

export default PlacesManager;
