import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import RoutListContainer from "../src/components/RoutListContainer";
import RouteForm from "./components/RouteForm";
import { AppBar, Toolbar, Typography, Container, Button } from "@mui/material";
import { Provider } from "react-redux";
import { store } from "./store/store";
import "mapbox-gl/dist/mapbox-gl.css";
const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Routes
            </Typography>
            <Button color="inherit" component={Link} to="/">
              List of Paths
            </Button>
            <Button color="inherit" component={Link} to="/add">
              Add Path
            </Button>
          </Toolbar>
        </AppBar>
        <Container sx={{ marginTop: 2 }}>
          <Routes>
            <Route path="/" element={<RoutListContainer />} />
            <Route path="/add" element={<RouteForm />} />
          </Routes>
        </Container>
      </Router>
    </Provider>
  );
};

export default App;
