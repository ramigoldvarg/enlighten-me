import React from "react";
// import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material/styles";
import { Box, Container, CssBaseline } from "@mui/material";
import Home from "./components/Home";

const theme = createTheme({
  palette: {
    mode: "dark",
  },
});

const routes = [
  {
    link: "/",
    component: Home,
  },
];

const renderRoutes = () =>
  routes.map(({ link, component }, index) => (
    <Route key={index} path={link} element={component()} />
  ));

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <NavBar />
        <Container maxWidth="sm" className="main">
          <Routes>{renderRoutes()}</Routes>
        </Container>
      </Router>
    </ThemeProvider>
  );
}

export default App;
