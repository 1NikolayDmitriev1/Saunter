import React from "react";
import { Grid, Paper } from "@mui/material";
import { styled, Box } from "@mui/system";
import { useMediaQuery, useTheme } from "@mui/material";
import RouteList from "./RouteList";
import RouteDetails from "./RouteDetails";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1),
  textAlign: "center",
  color: "black",
}));

const RoutListContainer: React.FC = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box height={"100%"}>
      <Grid container spacing={2}>
        <Grid item xs={isSmallScreen ? 12 : 6}>
          <StyledPaper>
            <RouteList />
          </StyledPaper>
        </Grid>
        {!isSmallScreen && (
          <Grid item xs={6}>
            <StyledPaper>
              <RouteDetails />
            </StyledPaper>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default RoutListContainer;
