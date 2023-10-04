import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, RootState } from "../types/types";
import {
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from "@mui/material";
import { Favorite, Delete } from "@mui/icons-material";
import { AppDispatch } from "../store/store";
import { deleteData } from "../store/routesSlice";
interface RouteItemProps {
  route: Route;
}

const RouteItem: React.FC<RouteItemProps> = ({ route }) => {
  const dispatch: AppDispatch = useDispatch();
  const routes = useSelector((state: RootState) =>
    state.routes.filter((elem: Route) => elem.id === route.id)
  );
  const handleFavoriteToggle = () => {};

  const handleDelete = () => {
    dispatch(deleteData(routes));
  };

  return (
    <ListItem>
      <ListItemText primary={route.name} secondary={route.shortDescription} />
      <ListItemSecondaryAction>
        <IconButton edge="end" onClick={handleFavoriteToggle}>
          <Favorite color={route.isFavorite ? "secondary" : "action"} />
        </IconButton>
        <IconButton edge="end" onClick={handleDelete}>
          <Delete color="action" />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default RouteItem;
