import React from "react";
import Cell from "./Cell";
import { iterate } from "../lib/gridCalc";

class Grid extends React.Component {
  state = {
    width: 30,
    height: 30,
    cells: [],
    running: false
  };

  mouseIsDown: boolean = false;

  to: NodeJS.Timeout | undefined = undefined;

  init = (random: boolean) => {
    const cells = [];
    for (let y = 0; y < this.state.height; y++) {
      for (let x = 0; x < this.state.width; x++) {
        cells[x + y * this.state.width] = random
          ? Math.floor(Math.random() * 10) % 2
          : 0;
      }
    }

    this.setState({ cells });
  };

  componentDidMount = () => {
    this.init(false);
  };

  updateCell = (ind: number) => {
    const newCells = this.state.cells.map((val, index) => {
      if (index === ind) {
        return val === 1 ? 0 : 1;
      }

      return val;
    });

    this.setState({ cells: newCells });
  };

  updateCellEnter = (ind: number) => {
    if (this.mouseIsDown) {
      if (this.state.cells[ind] === 0) this.updateCell(ind);
    }
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

  iterate = () => {
    const newCells = iterate(
      this.state.width,
      this.state.height,
      this.state.cells
    );

    this.setState({ cells: newCells });
  };

  render = () => {
    return (
      <>
        <div className="col s3 right-align">
          <button
            className="waves-effect waves-light btn"
            onClick={() => this.init(false)}
          >
            Clear
          </button>
          <br />
          <br />
          <button
            className="waves-effect waves-light btn"
            onClick={() => this.init(true)}
          >
            Random
          </button>
          <br />
          <br />
          <button
            className="waves-effect waves-light btn"
            onClick={this.iterate}
          >
            Iterate
          </button>
          <br />
          <br />
          <button
            className="waves-effect waves-light btn red"
            onClick={this.run}
          >
            {this.state.running ? "Stop" : "Run"}
          </button>
        </div>

        <div
          className="col s9"
          onMouseUp={() => (this.mouseIsDown = false)}
          onMouseDown={() => (this.mouseIsDown = true)}
        >
          {this.state.cells.map((val, ind) => (
            <Cell
              key={ind}
              value={val}
              index={ind}
              rowBeginning={ind % this.state.width === 0}
              firstRow={ind < this.state.width}
              update={this.updateCell}
              updateEnter={this.updateCellEnter}
            />
          ))}
        </div>
      </>
    );
  };
}

export default Grid;
