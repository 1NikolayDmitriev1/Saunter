import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, RootState } from "../types/types";
import { fetchData } from "../store/routesSlice";
import RouteItem from "./RouteItem";
import { AppDispatch } from "../store/store";
import RouteSearchForm from "./RouteSearchForm";

const RouteList: React.FC = () => {
  const state = useSelector((state: RootState) => state);
  const routes = state.routes;
  const searchKeyword = state.searchKeyword;
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
      <div>
        <RouteSearchForm />
        {sortedRoutes?.map((route: Route) => (
          <RouteItem key={route.id} route={route} />
        ))}
      </div>
    );
  } else {
    return <></>;
  }
};

export default RouteList;
