import React from "react";
import GridThumbnail from "./GridThumbnail";
import GridData from "../lib/gridData";

export interface GridLibraryProps {
  grids: GridData[];
  deleteHandler: (grid: GridData) => void;
  loadHandler: (grid: GridData) => void;
}

class GridLibrary extends React.Component<GridLibraryProps> {
  render() {
    return (
      <div>
        {this.props.grids.map((data, idx) => (
          <GridThumbnail
            key={idx + data.name}
            grid={data}
            deleteHandler={() => this.props.deleteHandler(data)}
            loadHandler={() => this.props.loadHandler(data)}
          />
        ))}
      </div>
    );
  }
}

export default GridLibrary;
