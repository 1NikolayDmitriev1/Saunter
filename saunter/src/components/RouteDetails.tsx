import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useMediaQuery, useTheme } from "@mui/material";
import { Typography, Button, Box } from "@mui/material";
import { RootState, Route } from "../types/types";
import MapComponent from "./MapComponent";
import { dataSlice, deleteData } from "../store/routesSlice";
import { AppDispatch } from "../store/store";

const RouteDetails: React.FC = () => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("sm"));
  const selectedRoute = useSelector((state: RootState) => state.selectedRoute);
  const routes = useSelector((state: RootState) => state.routes);
  const dispatch: AppDispatch = useDispatch();

  const handleDelete = () => {
    const changedRouts = routes.filter(
      (elem: Route) => elem.id !== selectedRoute?.id
    );
    dispatch(deleteData(changedRouts));
    dispatch(dataSlice.actions.selectRoute(null));
  };

  if (!selectedRoute) {
    return <Typography variant="h4">Select a Path</Typography>;
  }

  return (
    <Box
      height={isDesktop ? "80vh" : "none"}
      overflow={isDesktop ? "auto" : "visible"}
      padding={theme.spacing(0, 1.5)}
    >
      <Box display={"flex"} justifyContent={"space-between"}>
        <Typography variant="h5">{selectedRoute.title}</Typography>
        <Typography variant="body1">{selectedRoute.length} km</Typography>
      </Box>
      <Typography
        textAlign={"initial"}
        marginBottom={theme.spacing(2)}
        variant="body1"
      >
        {selectedRoute.fullDescription}
      </Typography>
      <MapComponent
      
        showPropsMarkers={true}
        height={"450px"}
        markers={selectedRoute.markers}
      />
      <Button
        variant="contained"
        color="error"
        onClick={handleDelete}
        style={{ margin: theme.spacing(1) }}
      >
        Remove Path
      </Button>
    </Box>
  );
};

export default RouteDetails;
