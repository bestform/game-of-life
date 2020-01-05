import React from "react";
import "./App.css";
import "materialize-css/dist/css/materialize.min.css";
import Grid from "./components/Grid";

const App: React.FC = () => {
  return (
    <div className="App">
      <div className="row">
        <h2>Game Of Life</h2>
      </div>
      <div className="row">
        <Grid></Grid>
      </div>
    </div>
  );
};

export default App;
