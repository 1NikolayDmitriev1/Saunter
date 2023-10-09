import React, { useState, useMemo, useCallback, useEffect } from "react";
import ReactMapGL, {
  NavigationControl,
  Marker,
  Source,
  Layer,
  MapMouseEvent,
} from "react-map-gl";
import { useDispatch, useSelector } from "react-redux";
import * as turf from "@turf/turf";
import { Box } from "@mui/material";
import RoomIcon from "@mui/icons-material/Room";
import { dataSlice } from "../store/routesSlice";
import { RootState } from "../types/types";

interface MapComponentProps {
  markers?: number[][];
  putMarkersFlag?: boolean;
  height: string;
  showPropsMarkers?: boolean;
}

const MAPBOX_TOKEN =
  "pk.eyJ1IjoibmlreCIsImEiOiJjbG5oaW96cDgxMmtkMmtvaGkzbXI1bWd3In0.4aSP_XIJTpViXyquoh3dQQ";

const MapComponent: React.FC<MapComponentProps> = ({
  markers = [],
  height,
  showPropsMarkers = false,
  putMarkersFlag = false,
}) => {
  const dispatch = useDispatch();
  const [newMarkers, setNewMarkers] = useState<number[][]>([...markers]);
  const storeMarkers = useSelector((state: RootState) => state.markers);
  const [totalDistance, setTotalDistance] = useState<number>(0);
  const viewportData = {
    width: "100%",
    height,
    latitude: markers.length ? markers[0][1] : 50.4376933309521,
    longitude: markers.length ? markers[0][0] : 30.547403001481854,
    zoom: 10,
  };

  const [viewport, setViewport] = useState(viewportData);
  useEffect(() => {
    if (markers.length) {
      setViewport(viewportData);
    }
  }, [height, markers]);

  const calculateDistance = useMemo(() => {
    return (
      start: turf.helpers.Position,
      end: turf.helpers.Position
    ): number => {
      const startPoint = turf.point(start);
      const endPoint = turf.point(end);
      return turf.distance(startPoint, endPoint, { units: "kilometers" });
    };
  }, []);

  const handleMapClick = useCallback(
    (e: MapMouseEvent) => {
      if (!putMarkersFlag) return;
      const { lng, lat } = e.lngLat;
      if (newMarkers.length > 0) {
        const lastMarker = newMarkers[newMarkers.length - 1];
        const distance = calculateDistance(lastMarker, [lng, lat]);
        setTotalDistance((prevTotalDistance) => prevTotalDistance + distance);
        dispatch(
          dataSlice.actions.updateTotalDistance(
            (totalDistance + distance).toFixed(2)
          )
        );
      }
      dispatch(dataSlice.actions.addMarker([...storeMarkers, [lng, lat]]));
      setNewMarkers((prevMarkers) => [...prevMarkers, [lng, lat]]);
    },
    [
      putMarkersFlag,
      newMarkers,
      dispatch,
      storeMarkers,
      calculateDistance,
      totalDistance,
    ]
  );

  const renerMarkers = showPropsMarkers ? markers : newMarkers;
  const lineStringFeature = useMemo(() => {
    return {
      type: "Feature",
      geometry: {
        type: "LineString",
        coordinates: renerMarkers as [number, number][],
      },
      properties: null,
    };
  }, [renerMarkers]);

  return (
    <Box style={{ width: "100%", height }}>
      <ReactMapGL
        {...viewport}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        onClick={handleMapClick}
        //@ts-ignore
        onMove={(newViewport) => setViewport(newViewport)}
        mapboxAccessToken={MAPBOX_TOKEN}
      >
        <NavigationControl showZoom position="top-right" />
        {renerMarkers.map((marker, index) => (
          <Marker key={index} latitude={marker[1]} longitude={marker[0]}>
            <RoomIcon />
          </Marker>
        ))}
        {renerMarkers.length > 1 && (
          //@ts-ignore
          <Source id="line-source" type="geojson" data={lineStringFeature}>
            <Layer
              id="line-layer"
              type="line"
              paint={{
                "line-color": "red",
                "line-width": 2,
              }}
            />
          </Source>
        )}
      </ReactMapGL>
    </Box>
  );
};

export default MapComponent;
