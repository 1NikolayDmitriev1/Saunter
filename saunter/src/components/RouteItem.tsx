import React, { useState } from "react";
import { useDispatch } from "react-redux";

import {
  IconButton,
  Grid,
  Paper,
  Typography,
  Box,
  Collapse,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Favorite } from "@mui/icons-material";
import { styled } from "@mui/system";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import CallSplitIcon from "@mui/icons-material/CallSplit";
import { AppDispatch } from "../store/store";
import { dataSlice } from "../store/routesSlice";
import RouteDetails from "./RouteDetails";
import { Route } from "../types/types";

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
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const selectRoute = dataSlice.actions.selectRoute;
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleRouteSelection = () => {
    dispatch(selectRoute(route));
    if (isSmallScreen) {
      handleToggleDetails();
    }
  };

  const handleToggleDetails = () => {
    if (isSmallScreen) {
      setIsDetailsOpen(!isDetailsOpen);
    }
  };

  return (
    <Box>
      <StyledPaper onClick={handleRouteSelection} elevation={3}>
        <CallSplitIcon fontSize="large" />
        <Grid
          container
          direction="column"
          justifyContent="space-between"
          alignItems="flex-start"
        >
          <Grid item>
            <Box display={"flex"} gap={theme.spacing(1)} alignItems={"center"}>
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
          {isDetailsOpen ? <ArrowDownwardIcon /> : <ArrowForwardIcon />}
        </IconButton>
      </StyledPaper>
      {isSmallScreen && (
        <Collapse in={isDetailsOpen}>
          <Box marginTop={theme.spacing(3)}>
            <RouteDetails />
          </Box>
        </Collapse>
      )}
    </Box>
  );
};

export default RouteItem;
