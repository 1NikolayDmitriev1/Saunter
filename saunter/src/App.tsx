import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import RouteList from "../src/components/RouteList";
import RouteDetails from "./components/RouteDetails";
import RouteForm from "./components/RouteForm";
import { AppBar, Toolbar, Typography, Container, Button } from "@mui/material";

const App: React.FC = () => {
  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Routes
          </Typography>
          <Button color="inherit" component={Link} to="/">
            List of Routes
          </Button>
          <Button color="inherit" component={Link} to="/add">
            Add Route
          </Button>
        </Toolbar>
      </AppBar>
      <Container sx={{ marginTop: 2 }}>
        <Routes>
          <Route path="/" element={<RouteList />} />
          <Route path="/route/:id" element={<RouteDetails />} />
          <Route path="/add" element={<RouteForm />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
