import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Typography,
  Switch,
  Grid,
  Box,
  Paper,
} from "@mui/material";
import { Route } from "../types/types";
import { writeData, fetchData } from "../store/routesSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../types/types";
import { AppDispatch } from "../store/store";
import { v4 as uuidv4 } from "uuid";
import MapComponent from "./MapComponent";
import { styled } from "@mui/system";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: "center",
  color: "black",
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginTop: theme.spacing(5),
}));

const StyledBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginTop: theme.spacing(2),
  gap: theme.spacing(1),
}));

const RouteForm: React.FC = () => {
  const emptyRout = {
    id: "",
    title: "",
    shortDescription: "",
    fullDescription: "",
    markers: [],
    length: "0",
    isFavorite: false,
  };
  const [routeData, setRouteData] = useState<Route>(emptyRout);
  const dispatch: AppDispatch = useDispatch();
  const routes = useSelector((state: RootState) => state.routes);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRouteData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSwitchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setRouteData((prevData) => ({
      ...prevData,
      [name]: checked,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newRoute: Route = {
      ...routeData,
      id: uuidv4(),
    };
    const newData = [...routes, newRoute];
    dispatch(writeData(newData));
    setRouteData(emptyRout);
  };

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <StyledPaper>
            <form onSubmit={handleSubmit}>
              <TextField
                label="Title"
                name="title"
                value={routeData.title}
                onChange={handleInputChange}
                required
                fullWidth
              />
              <StyledTextField
                label="Short description"
                name="shortDescription"
                value={routeData.shortDescription}
                onChange={handleInputChange}
                required
                fullWidth
                multiline
                rows={3}
                inputProps={{ maxLength: 170 }}
              />
              <StyledTextField
                label="Description"
                name="fullDescription"
                value={routeData.fullDescription}
                onChange={handleInputChange}
                required
                fullWidth
                rows={6}
                multiline
              />
              <StyledBox>
                <AddLocationAltIcon />
                <Typography>{routeData.length} km</Typography>
              </StyledBox>
              <StyledBox>
                <Typography>Favorite</Typography>
                <Switch
                  checked={routeData.isFavorite}
                  name="isFavorite"
                  onChange={handleSwitchChange}
                />
              </StyledBox>
              <Button
                style={{ margin: "16px" }}
                type="submit"
                variant="outlined"
                color="primary"
                size="large"
              >
                Add Path
              </Button>
            </form>
          </StyledPaper>
        </Grid>
        <Grid item xs={6}>
          <StyledPaper>
            <MapComponent />
          </StyledPaper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default RouteForm;
