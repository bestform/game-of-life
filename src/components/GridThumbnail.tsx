import React from "react";
import GridData from "../lib/gridData";

export interface GridThumbnailProps {
  grid: GridData;
  deleteHandler: () => void;
  loadHandler: () => void;
}

export interface GridThumbnailState {
  showDelete: boolean;
  showInput: boolean;
}

class GridThumbnail extends React.Component<
  GridThumbnailProps,
  GridThumbnailState
> {
  state: GridThumbnailState = {
    showDelete: false,
    showInput: false
  };

  canvasRef = React.createRef<HTMLCanvasElement>();

  componentDidMount = () => {
    const ctx = this.canvasRef.current?.getContext("2d");
    if (ctx) {
      ctx.clearRect(0, 0, 30, 30);
      ctx.fillStyle = "#008080";
      for (let i = 0; i < this.props.grid.cells.length; i++) {
        if (this.props.grid.cells[i] !== 1) {
          continue;
        }
        ctx.fillRect(
          (i % this.props.grid.width) * 2,
          Math.floor(i / this.props.grid.height) * 2,
          2,
          2
        );
      }
    }
  };

  render() {
    return (
      <div style={this.getStyle()}>
        {!this.props.grid.canDelete && <label>{this.props.grid.name}</label>}
        <canvas
          ref={this.canvasRef}
          width={60}
          height={60}
          style={this.getImageStyle()}
        />
        <i
          className="material-icons icon-image-preview"
          style={this.getInputButtonStyle()}
          onClick={this.props.loadHandler}
          onMouseEnter={() => this.setState({ showInput: true })}
          onMouseLeave={() => this.setState({ showInput: false })}
        >
          done
        </i>
        <i
          className="material-icons icon-image-preview"
          style={this.getDeleteButtonStyle()}
          onClick={this.props.deleteHandler}
          onMouseEnter={() => this.setState({ showDelete: true })}
          onMouseLeave={() => this.setState({ showDelete: false })}
        >
          highlight_off
        </i>
      </div>
    );
  }
  getImageStyle(): React.CSSProperties | undefined {
    return { display: "block", marginBottom: 8 };
  }

  getDeleteButtonStyle(): React.CSSProperties | undefined {
    if (!this.props.grid.canDelete) {
      return {
        display: "none"
      };
    }

    return {
      cursor: "pointer",
      textAlign: "center",
      margin: 2,
      width: 24,
      height: 24,
      borderRadius: 5,
      background: this.state.showDelete ? "#F44336" : "transparent"
    };
  }

  getInputButtonStyle(): React.CSSProperties | undefined {
    return {
      textAlign: "center",
      cursor: "pointer",
      margin: 2,
      width: 24,
      height: 24,
      borderRadius: 5,
      backgroundColor: this.state.showInput ? "#4CAF50" : "transparent"
    };
  }

  getStyle(): React.CSSProperties | undefined {
    return {
      float: "left",
      padding: "5px",
      margin: "2px",
      border: "3px solid teal",
      borderRadius: 5,
      width: 77
    };
  }
}

export default GridThumbnail;
