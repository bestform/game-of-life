export function leftOf(ind: number, width: number) {
  return ind % width === 0 ? ind + width - 1 : ind - 1;
}

export function rightOf(ind: number, width: number) {
  return (ind + 1) % width === 0 ? ind - width + 1 : ind + 1;
}

export function aboveOf(ind: number, width: number, height: number) {
  let above = ind - width;
  if (above < 0) {
    above += width * height;
  }

  return above;
}

export function belowOf(ind: number, width: number, height: number) {
  return (ind + width) % (width * height);
}

export function iterate(width: number, height: number, cells: number[]) {
  let newCells = [];
  for (let y = 0; y < width; y++) {
    for (let x = 0; x < height; x++) {
      const ind = x + y * height;
      const n = numberOfNeighbours(ind, width, height, cells);
      if (cells[ind] === 0 && n === 3) {
        newCells[ind] = 1;
        continue;
      }

      if (cells[ind] === 1 && n < 2) {
        newCells[ind] = 0;
        continue;
      }

      if (cells[ind] === 1 && (n === 2 || n === 3)) {
        newCells[ind] = 1;
        continue;
      }

      if (cells[ind] === 1 && n > 3) {
        newCells[ind] = 0;
        continue;
      }

      newCells[ind] = cells[ind];
    }
  }

  return newCells;
}

function numberOfNeighbours(
  ind: number,
  width: number,
  height: number,
  cells: number[]
) {
  const leftInd = leftOf(ind, width);
  const rightInd = rightOf(ind, width);
  const aboveInd = aboveOf(ind, width, height);
  const belowInd = belowOf(ind, width, height);
  const upperLeftInd = leftOf(aboveInd, width);
  const upperRightInd = rightOf(aboveInd, width);
  const lowerLeftInd = leftOf(belowInd, width);
  const lowerRightInd = rightOf(belowInd, width);

  return (
    cells[leftInd] +
    cells[rightInd] +
    cells[aboveInd] +
    cells[belowInd] +
    cells[upperLeftInd] +
    cells[upperRightInd] +
    cells[lowerLeftInd] +
    cells[lowerRightInd]
  );
}
