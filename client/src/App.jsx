// App.jsx
import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Navigate from "./components/navigation/Navigate";
import Header from "./components/navigation/Header";
import ThemeToggle from "./components/theme/ThemeToggle";
import ThemeProviderWrapper from "./components/theme/ThemeProviderWrapper";
import {Footer} from "./components/navigation/Footer";

function App() {
  return (
    <>
      <ThemeProviderWrapper>
        <CssBaseline />
        <Header />
        <Container maxWidth="lg">
          <div style={{ display: "flex" }}>
            <ThemeToggle />
          </div>
          <Navigate />
        </Container>
       <Footer/>
      </ThemeProviderWrapper>
    </>
  );
}

export default App;
