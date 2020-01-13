import React from "react";
import "./App.css";
import "materialize-css/dist/css/materialize.min.css";
import Grid from "./components/Grid";
import GridLibrary from "./components/GridLibrary";
import GridData from "./lib/gridData";
import { iterate } from "./lib/gridCalc";
import defaultGrids from "./lib/defaultGrids";

interface AppState {
  grids: GridData[];
  activeGrid: GridData;
  running: boolean;
}

interface AppProps {}

class App extends React.Component<AppProps, AppState> {
  state: AppState = {
    grids: [],
    activeGrid: {
      width: 30,
      height: 30,
      cells: [],
      name: "unnamed",
      canDelete: true
    },
    running: false
  };

  to: NodeJS.Timeout | undefined = undefined;

  init = () => {
    const cells = [];
    for (let y = 0; y < this.state.activeGrid.height; y++) {
      for (let x = 0; x < this.state.activeGrid.width; x++) {
        cells[x + y * this.state.activeGrid.width] = 0;
      }
    }

    this.setState({
      activeGrid: {
        width: this.state.activeGrid.width,
        height: this.state.activeGrid.height,
        name: this.state.activeGrid.name,
        canDelete: this.state.activeGrid.canDelete,
        cells: cells
      }
    });
  };

  loadLibrary = () => {
    const defaults = defaultGrids;
    const lib = localStorage.getItem("library");
    if (lib) {
      const libGrids = JSON.parse(lib);
      defaults.push(...libGrids);
    }
    this.setState({ grids: defaults });
  };

  saveLibrary = () => {
    localStorage.setItem(
      "library",
      JSON.stringify(
        this.state.grids.filter(data => {
          return data.canDelete;
        })
      )
    );
  };

  componentDidMount = () => {
    this.init();
    this.loadLibrary();
  };

  handleSave = () => {
    const newGrids = this.state.grids;
    const newGrid = this.state.activeGrid;
    newGrid.name =
      Math.random()
        .toString(36)
        .substring(2, 15) +
      Math.random()
        .toString(36)
        .substring(2, 15);
    newGrid.canDelete = true;
    newGrids.push(newGrid);
    this.setState({ grids: newGrids });
    this.saveLibrary();
  };

  handleDelete = (grid: GridData) => {
    const newGrids = this.state.grids;
    const idx = newGrids.indexOf(grid);
    newGrids.splice(idx, 1);
    this.setState({ grids: newGrids });
    this.saveLibrary();
  };

  handleLoad = (grid: GridData) => {
    this.setState({ activeGrid: grid });
  };

  iterate = () => {
    const newCells = iterate(
      this.state.activeGrid.width,
      this.state.activeGrid.height,
      this.state.activeGrid.cells
    );

    this.setState({
      activeGrid: {
        width: this.state.activeGrid.width,
        height: this.state.activeGrid.height,
        name: this.state.activeGrid.name,
        canDelete: this.state.activeGrid.canDelete,
        cells: newCells
      }
    });
  };

  random = () => {
    const newCells = [];
    for (let y = 0; y < this.state.activeGrid.height; y++) {
      for (let x = 0; x < this.state.activeGrid.width; x++) {
        newCells[x + y * this.state.activeGrid.width] =
          Math.floor(Math.random() * 10) % 2;
      }
    }

    this.setState({
      activeGrid: {
        width: this.state.activeGrid.width,
        height: this.state.activeGrid.height,
        name: this.state.activeGrid.name,
        canDelete: this.state.activeGrid.canDelete,
        cells: newCells
      }
    });
  };

  updateCell = (ind: number) => {
    const newCells = this.state.activeGrid.cells.map((val, index) => {
      if (index === ind) {
        return val === 1 ? 0 : 1;
      }

      return val;
    });

    this.setState({
      activeGrid: {
        width: this.state.activeGrid.width,
        height: this.state.activeGrid.height,
        name: this.state.activeGrid.name,
        canDelete: this.state.activeGrid.canDelete,
        cells: newCells
      }
    });
  };

  run = () => {
    const running = !this.state.running;

    if (running) {
      this.to = setInterval(this.iterate, 200);
    } else {
      clearInterval(this.to as NodeJS.Timer);
    }

    this.setState({ running });
  };

  render() {
    return (
      <div className="App">
        <div className="row">
          <h2>Game Of Life</h2>
        </div>
        <div className="row">
          <div className="col s8 right-align">
            <Grid
              saveHandler={this.handleSave}
              grid={this.state.activeGrid}
              iterateHandler={this.iterate}
              randomHandler={this.random}
              updateCellHandler={this.updateCell}
              runHandler={this.run}
              clearHandler={this.init}
              running={this.state.running}
            ></Grid>
          </div>
          <div className="col s4 left-align">
            <GridLibrary
              grids={this.state.grids}
              deleteHandler={this.handleDelete}
              loadHandler={this.handleLoad}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
