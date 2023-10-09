import React, { useRef, useState, useEffect } from "react";
import mapboxgl, { Map } from "mapbox-gl";
import * as turf from "@turf/turf";
import { useDispatch } from "react-redux";
import { dataSlice } from "../store/routesSlice";
import { Box } from "@mui/material";

mapboxgl.accessToken =
  "pk.eyJ1IjoibmlreCIsImEiOiJjbG5oaW96cDgxMmtkMmtvaGkzbXI1bWd3In0.4aSP_XIJTpViXyquoh3dQQ";

interface MapComponentProps {
  markers?: number[][];
  putMarkersFlag?: boolean;
  height: string;
}

const MapComponent: React.FC<MapComponentProps> = ({
  markers = [],
  putMarkersFlag = false,
  height,
}) => {
  const dispatch = useDispatch();
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<Map | null>(null);
  const lineSource = useRef<mapboxgl.GeoJSONSource | null>(null);
  const [newMarkers, setNewMarkers] = useState<number[][]>([]);
  const [totalDistance, setTotalDistance] = useState<number>(0);

  useEffect(() => {
    if (!map.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current!,
        style: "mapbox://styles/mapbox/streets-v11",
        center: markers.length
          ? (markers[0] as [number, number])
          : [30.547403001481854, 50.4376933309521],
        zoom: 10,
      });

      map.current.on("load", () => {
        map.current?.addControl(new mapboxgl.NavigationControl(), "top-right");
        if (putMarkersFlag) {
          map.current?.on("click", handleMapClick);
        }

        if (markers.length) {
          markers.forEach((marker) => {
            new mapboxgl.Marker()
              .setLngLat(marker as [number, number])
              .addTo(map.current!);
          });
          setNewMarkers(markers);
        }
      });
    }

    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, []);

  useEffect(() => {
    if (newMarkers.length > 1) {
      const lastMarker = newMarkers[newMarkers.length - 2];
      const distance = calculateDistance(
        lastMarker,
        newMarkers[newMarkers.length - 1]
      );

      setTotalDistance((prevTotalDistance) => prevTotalDistance + distance);

      const lineString = turf.lineString(newMarkers);
      if (lineSource.current) {
        lineSource.current.setData(lineString);
      } else {
        map.current?.addSource("line-source", {
          type: "geojson",
          data: lineString,
        });

        map.current?.addLayer({
          id: "line-layer",
          type: "line",
          source: "line-source",
          layout: {
            "line-join": "round",
            "line-cap": "round",
          },
          paint: {
            "line-color": "black",
            "line-width": 2,
          },
        });

        lineSource.current = map.current?.getSource(
          "line-source"
        ) as mapboxgl.GeoJSONSource;
      }

      dispatch(dataSlice.actions.addMarker(newMarkers));
      dispatch(dataSlice.actions.updateTotalDistance(totalDistance.toFixed(1)));
    }
  }, [newMarkers]);

  const calculateDistance = (start: number[], end: number[]) => {
    const startPoint = turf.point(start);
    const endPoint = turf.point(end);
    return turf.distance(startPoint, endPoint, { units: "kilometers" });
  };

  const handleMapClick = (e: mapboxgl.MapMouseEvent) => {
    const { lng, lat } = e.lngLat;

    setNewMarkers((prevMarkers) => [...prevMarkers, [lng, lat]]);
    new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map.current!);
  };

  return (
    <Box style={{ width: "100%", height }}>
      <Box ref={mapContainer} style={{ width: "100%", height: "100%" }} />
    </Box>
  );
};

export default MapComponent;
