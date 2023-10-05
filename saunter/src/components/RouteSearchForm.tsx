import React from "react";
import { TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { dataSlice } from "../store/routesSlice";
const RouteSearchForm: React.FC = () => {
  const dispatch = useDispatch();
  const setSearchKeyword = dataSlice.actions.setSearchKeyword;
  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchKeyword(e.target.value));
  };

  return (
    <TextField
      label="Search Routes"
      variant="outlined"
      fullWidth
      onChange={handleSearchInputChange}
    />
  );
};

export default RouteSearchForm;
