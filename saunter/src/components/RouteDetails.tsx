import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, Route } from "../types/types";
import { Typography, Button, Switch, Box } from "@mui/material";
import MapComponent from "./MapComponent";
import { deleteData, writeData } from "../store/routesSlice";
import { AppDispatch } from "../store/store";
import { styled } from "@mui/system";

const StyledBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginTop: theme.spacing(2),
  gap: theme.spacing(3),
}));

const RouteDetails: React.FC = () => {
  const state = useSelector((state: RootState) => state);
  const selectedRoute = state.selectedRoute;
  const routes = state.routes;
  const dispatch: AppDispatch = useDispatch();

  if (!selectedRoute) {
    return <></>;
  }

  const handleFavoriteToggle = () => {
    const changedRouts = routes.map((elem: Route) => {
      if (elem.id === selectedRoute?.id) {
        return { ...elem, isFavorite: !elem.isFavorite };
      }
      return elem;
    });

    dispatch(writeData(changedRouts));
  };

  const handleDelete = () => {
    const changedRouts = routes.filter(
      (elem: Route) => elem.id !== selectedRoute?.id
    );
    dispatch(deleteData(changedRouts));
  };

  return (
    <Box padding={"0 10px"}>
      <Box display={"flex"} justifyContent={"space-between"}>
        <Typography variant="h5">{selectedRoute.title}</Typography>
        <Typography variant="body1">{selectedRoute.length} km</Typography>
      </Box>
      <Typography textAlign={"initial"} marginBottom={"15px"} variant="body1">
        {selectedRoute.fullDescription}
      </Typography>
      <MapComponent />
      <StyledBox>
        <Typography>Favorite</Typography>
        <Switch
          checked={selectedRoute.isFavorite}
          name="isFavorite"
          onChange={handleFavoriteToggle}
        />
      </StyledBox>

      <Button
        variant="contained"
        color="error"
        onClick={handleDelete}
        style={{ margin: "8px" }}
      >
        Remove Path
      </Button>
    </Box>
  );
};

export default RouteDetails;
