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
        <button onClick={() => this.init(false)}>Clear</button>
        <button onClick={() => this.init(true)}>Random</button>
        <button onClick={this.iterate}>Iterate</button>
        <button onClick={this.run}>
          {this.state.running ? "Stop" : "Run"}
        </button>
        <div>
          {this.state.cells.map((val, ind) => (
            <Cell
              key={ind}
              value={val}
              index={ind}
              rowBeginning={ind % this.state.width === 0}
              update={this.updateCell}
            />
          ))}
        </div>
      </>
    );
  };
}

export default Grid;
