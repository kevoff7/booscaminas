export enum Matrix {
  B = "B",
}

export const cantBoxes = 8;
const matches = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
];

export const MATRIX = Array.from({length: cantBoxes}, () =>
  Array.from({length: cantBoxes}, () => 0 as string | number),
);

for (let cont = cantBoxes; cont > 0; cont--) {
  const randomGrid1 = Math.floor(Math.random() * MATRIX.length);
  const randomGrid2 = Math.floor(Math.random() * MATRIX.length);

  if (MATRIX[randomGrid1][randomGrid2] === Matrix.B) {
    cont++;
  } else {
    MATRIX[randomGrid1][randomGrid2] = Matrix.B;
  }
}

for (let rowIndex = 0; rowIndex < MATRIX.length; rowIndex++) {
  for (let cellIndex = 0; cellIndex < MATRIX[rowIndex].length; cellIndex++) {
    if (MATRIX[rowIndex][cellIndex] === Matrix.B) continue;
    let contPump = 0;

    for (let index = 0; index < matches.length; index++) {
      const row = matches[index][0];
      const cell = matches[index][1];

      if (MATRIX[rowIndex + row]?.[cellIndex + cell] === Matrix.B) {
        contPump++;
        MATRIX[rowIndex][cellIndex] = contPump;
      }
    }
  }
}
