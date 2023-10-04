import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import { Route } from "../types/types";
import { writeData } from "../store/routesSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../types/types";
import { AppDispatch } from "../store/store";
const RouteForm: React.FC = () => {
  const [routeData, setRouteData] = useState<Route>({
    id: 1,
    name: "",
    shortDescription: "",
    fullDescription: "",
    markers: [1],
    length: "0",
    isFavorite: false,
  });
  const dispatch: AppDispatch = useDispatch();
  const routes = useSelector((state: RootState) => state.routes);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRouteData({ ...routeData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newData = [...routes, routeData];
     dispatch(writeData(newData));
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Name"
        name="name"
        value={routeData.name}
        onChange={handleInputChange}
        required
        fullWidth
      />
      <TextField
        label="Short description"
        name="shortDescription"
        value={routeData.shortDescription}
        onChange={handleInputChange}
        required
        fullWidth
      />
      <Button type="submit" variant="contained" color="primary">
       Add route
      </Button>
    </form>
  );
};

export default RouteForm;
