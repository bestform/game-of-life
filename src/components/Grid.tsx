import React from "react";
import Cell from "./Cell";
import { iterate } from "../lib/gridCalc";
import GridData from "../lib/gridData";

interface GridProps {
  saveHandler: () => void;
  clearHandler: () => void;
  grid: GridData;
  iterateHandler: () => void;
  randomHandler: () => void;
  updateCellHandler: (ind: number) => void;
  runHandler: () => void;
  running: boolean;
}

class Grid extends React.Component<GridProps> {
  state = {
    running: false
  };

  mouseIsDown: boolean = false;

  updateCellEnter = (ind: number) => {
    if (this.mouseIsDown) {
      if (this.props.grid.cells[ind] === 0) this.props.updateCellHandler(ind);
    }
  };

  render = () => {
    return (
      <>
        <div className="col s3 right-align">
          <button
            className="waves-effect waves-light btn"
            onClick={this.props.clearHandler}
          >
            Clear
          </button>
          <br />
          <br />
          <button
            className="waves-effect waves-light btn"
            onClick={this.props.randomHandler}
          >
            Random
          </button>
          <br />
          <br />
          <button
            className="waves-effect waves-light btn green"
            onClick={this.props.saveHandler}
          >
            Save to Library
          </button>
          <br />
          <br />
          <br />
          <br />
          <button
            className="waves-effect waves-light btn"
            onClick={this.props.iterateHandler}
          >
            Iterate
          </button>

          <br />
          <br />
          <button
            className="waves-effect waves-light btn red"
            onClick={this.props.runHandler}
          >
            {this.props.running ? "Stop" : "Run"}
          </button>
        </div>

        <div
          className="col s9"
          onMouseUp={() => (this.mouseIsDown = false)}
          onMouseDown={() => (this.mouseIsDown = true)}
        >
          {this.props.grid.cells.map((val, ind) => (
            <Cell
              key={ind}
              value={val}
              index={ind}
              rowBeginning={ind % this.props.grid.width === 0}
              firstRow={ind < this.props.grid.width}
              update={this.props.updateCellHandler}
              updateEnter={this.updateCellEnter}
            />
          ))}
        </div>
      </>
    );
  };
}

export default Grid;
