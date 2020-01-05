import React from "react";

class Cell extends React.Component {
  props = {
    value: 0,
    index: 0,
    rowBeginning: false,
    update: function(ind: number) {}
  };

  getClassName = () => {
    return "cell" + this.props.value;
  };

  getStyles = () => {
    const styles = {
      width: "20px",
      height: "20px",
      border: "1px solid #cccccc",
      float: "left" as const,
      backgroundColor: this.props.value === 0 ? "#ffffff" : "#000000",
      clear: this.props.rowBeginning ? ("both" as const) : ("none" as const)
    };

    return styles;
  };

  render = () => {
    return (
      <div
        style={this.getStyles()}
        className={this.getClassName()}
        onClick={() => {
          this.props.update(this.props.index);
        }}
      ></div>
    );
  };
}

export default Cell;
