import React from "react";
import "./App.css";
import { AppBar, Box, Button, Toolbar } from "@mui/material";
import About from "./pages/About";
import Photography from "./pages/Photography";
import Projects from "./pages/Projects";

enum Page {
  PROJECTS,
  PHOTOGRAPHY,
  ABOUT,
}

function App() {
  const [page, setPage] = React.useState<Page>(Page.ABOUT);

  return (
    <div className="App">
      <Box sx={{ flexGrow: 1, marginBottom: 1 }}>
        <AppBar position="static">
          <Toolbar sx={{ justifyContent: "center" }}>
            <Button color="inherit" onClick={() => setPage(Page.PROJECTS)}>
              Projects
            </Button>
            <Button color="inherit" onClick={() => setPage(Page.PHOTOGRAPHY)}>
              Photography
            </Button>
            <Button color="inherit" onClick={() => setPage(Page.ABOUT)}>
              About
            </Button>
          </Toolbar>
        </AppBar>
      </Box>

      {page === Page.ABOUT && <About />}
      {page === Page.PHOTOGRAPHY && <Photography />}
      {page === Page.PROJECTS && <Projects />}
    </div>
  );
}

export default App;
