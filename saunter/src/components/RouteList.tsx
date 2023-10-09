import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, RootState } from "../types/types";
import { fetchData } from "../store/routesSlice";
import RouteItem from "./RouteItem";
import { AppDispatch } from "../store/store";
import RouteSearchForm from "./RouteSearchForm";
import { Box, useMediaQuery, useTheme } from "@mui/material";

const RouteList: React.FC = () => {
  const routes = useSelector((state: RootState) => state.routes);
  const searchKeyword = useSelector((state: RootState) => state.searchKeyword);
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("sm"));
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  if (routes.length) {
    const filteredRoutes: Route[] = routes.filter((route) =>
      route.fullDescription.toLowerCase().includes(searchKeyword.toLowerCase())
    );
    const sortedRoutes = filteredRoutes.sort((a, b) =>
      a.isFavorite === b.isFavorite ? 0 : a.isFavorite ? -1 : 1
    );
    return (
      <Box
        maxHeight={isDesktop ? "80vh" : "none"}
        overflow={isDesktop ? "auto" : "visible"}
      >
        <RouteSearchForm />
        {sortedRoutes?.map((route: Route) => (
          <RouteItem key={route.id} route={route} />
        ))}
      </Box>
    );
  } else {
    return <></>;
  }
};

export default RouteList;
