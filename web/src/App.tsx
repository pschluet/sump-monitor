import "./App.css";
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { HistoryPlot } from "./HistoryPlot/HistoryPlot";
import React from "react";

function App() {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className="title">
            Sump Pump Monitor
          </Typography>
        </Toolbar>
      </AppBar>
      <HistoryPlot date={new Date()}></HistoryPlot>
    </>
  );
}

export default App;
