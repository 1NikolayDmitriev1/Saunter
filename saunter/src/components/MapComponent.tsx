import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useSelector } from "react-redux";
import { RootState } from "../types/types";

const MapComponent: React.FC = () => {
  const routes = useSelector((state: RootState) => state.routes);
  const defaultCenter = { lat: 48.3358856, lng: 31.1788196 };

  const getMarkers = () => {
    return routes.map(() => {
      return {
        position: { lat: 48.3358856, lng: 31.1788196 },
        title: "Title",
      };
    });
  };

  return (
    <LoadScript googleMapsApiKey="490bc95b0074261d">
      <GoogleMap
        mapContainerStyle={{
          width: "100%",
          height: "385px",
        }}
        center={defaultCenter}
        zoom={10}
      >
        {getMarkers().map((marker, index) => (
          <Marker key={index} position={marker.position} title={marker.title} />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;
