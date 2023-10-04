import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, RootState } from "../types/types";
import { fetchData } from "../store/routesSlice";
import RouteItem from "./RouteItem";
import { AppDispatch } from "../store/store";
const RouteList: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

  const routes = useSelector((state: RootState) => state.routes);
  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);
  if (routes.length) {
    return (
      <div>
        <h2>List of Routes</h2>
        {routes?.map((route: Route) => (
          <RouteItem key={route.id} route={route} />
        ))}
      </div>
    );
  } else {
    return <></>;
  }
};

export default RouteList;
