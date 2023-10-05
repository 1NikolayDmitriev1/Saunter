import React from "react";
import { Grid, Paper } from "@mui/material";
import RouteList from "./RouteList";
import RouteDetails from "./RouteDetails";
import { styled, Box } from "@mui/system";

const StyledPaper = styled(Paper)({
  padding: 8,
  textAlign: "center",
  color: "black",
});
const RoutListContainer: React.FC = () => {
  return (
    <Box height={"100%"}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <StyledPaper>
            <RouteList />
          </StyledPaper>
        </Grid>
        <Grid item xs={6}>
          <StyledPaper>
            <RouteDetails />
          </StyledPaper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default RoutListContainer;
