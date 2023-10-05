import React from "react";
import { useDispatch } from "react-redux";
import { Route } from "../types/types";
import { IconButton, Grid, Paper, Typography, Box } from "@mui/material";
import { Favorite } from "@mui/icons-material";
import { AppDispatch } from "../store/store";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { styled } from "@mui/system";
import CallSplitIcon from "@mui/icons-material/CallSplit";
import { dataSlice } from "../store/routesSlice";

interface RouteItemProps {
  route: Route;
}

const StyledPaper = styled(Paper)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(1.5),
  borderRight: `${theme.spacing(0.2)} solid black`,
  height: "100%",
  marginTop: theme.spacing(1),
  cursor: "pointer",
  "&:hover": {
    boxShadow: `0 ${theme.spacing(0.2)} ${theme.spacing(5)} rgba(0, 0, 0, 0.1)`,
  },
  gap: theme.spacing(1),
}));

const RouteItem: React.FC<RouteItemProps> = ({ route }) => {
  const dispatch: AppDispatch = useDispatch();

  const selectRoute = dataSlice.actions.selectRoute;

  const handleRouteSelection = () => {
    dispatch(selectRoute(route));
  };

  return (
    <StyledPaper onClick={handleRouteSelection} elevation={3}>
      <CallSplitIcon fontSize="large" />
      <Grid
        container
        direction="column"
        justifyContent="space-between"
        alignItems="flex-start"
      >
        <Grid item>
          <Box display={"flex"} gap={"8px"} alignItems={"center"}>
            <Favorite color={route.isFavorite ? "secondary" : "action"} />
            <Typography variant="h6">{route.title}</Typography>
          </Box>
        </Grid>
        <Grid item>
          <Typography textAlign={"initial"} variant="body2">
            {route.shortDescription}
          </Typography>
        </Grid>
      </Grid>
      <Typography variant="body2">{route.length} km</Typography>
      <IconButton>
        <ArrowForwardIcon />
      </IconButton>
    </StyledPaper>
  );
};

export default RouteItem;
