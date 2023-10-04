import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../types/types";
import { Typography } from "@mui/material";
import MapComponent from "./MapComponent";

const RouteDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const route = useSelector((state: RootState) =>
    state.routes.find((r) => r.id === parseInt(id || "1"))
  );

  if (!route) {
    return <Typography variant="h5">Route not found</Typography>;
  }

  return (
    <div>
      <Typography variant="h4">Detailed Route Information</Typography>
      <Typography variant="h5">{route.name}</Typography>
      <Typography variant="body1">{route.fullDescription}</Typography>
      <Typography variant="body1">Route length: {route.length} km</Typography>
      <MapComponent />
    </div>
  );
};

export default RouteDetails;
