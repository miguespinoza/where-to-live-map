import styled from "styled-components";
import React, { useState, useEffect, useMemo } from "react";
import { useGet } from "restful-react";

import MAPBOX_ACCESS_TOKEN from "../../configuration";

/**
 * Miguel Espinoza
 * @miguespinoza
 */

const Container = styled.div`
  position: relative;
  box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12);
  border-radius: 4px;
  padding: 24px 16px;
  background-color: #fff;
`;

const SearchInput = styled.input`
  width: 100%;
  border-radius: 4px;
`;

const PlaceRow = styled.div<{ selected: boolean }>`
  width: 100%;
  display: flex;
  margin: 5px;
`;

const DeleteButton = styled.button`
  width: 50px;
  border-radius: 25px;
  position: absolute;
  right: 0;
  top: 0;
`;
type Props = {
  place?: any;
  onClose: () => void;
  onSelect: (place: any) => void;
};

const PlaceSearch: React.FC<Props> = ({ place, onClose, onSelect }) => {
  const [query, setquery] = useState("");
  const [selectedPlace, setselectedPlace] = useState(place);

  const { data, refetch } = useGet(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=${MAPBOX_ACCESS_TOKEN}&country=MX`,
    {
      lazy: true,
      debounce: 1000
    }
  );

  useEffect(() => {
    if (selectedPlace == null) {
      refetch();
    }
  }, [query]);

  const places = useMemo(() => JSON.parse(data), [data]);

  return (
    <Container>
      <DeleteButton onClick={onClose}>X</DeleteButton>
      {selectedPlace == null && (
        <SearchInput
          placeholder="Cuitlahuac 2245"
          onChange={e => setquery(e.target.value)}
          value={query}
          type="text"
        ></SearchInput>
      )}
      {selectedPlace && (
        <PlaceRow selected>{selectedPlace.place_name}</PlaceRow>
      )}
      {selectedPlace == null &&
        places &&
        places.features &&
        places.features.map((f: any) => {
          return (
            <PlaceRow
              selected={false}
              onClick={() => {
                onSelect(f);
                setselectedPlace(f);
              }}
            >
              {f.place_name}
            </PlaceRow>
          );
        })}
    </Container>
  );
};

export default PlaceSearch;
