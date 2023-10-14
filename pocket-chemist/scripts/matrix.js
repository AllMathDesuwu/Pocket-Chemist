//"columns" of matrix are arrays within main array-- number of rows is equal to length of arrays within main array
//must include augmented column as a "column"
//potential limitations: can only solve systems with one solution (or no solution)
class Matrix{
  constructor(matrixRows, matrixCols){
    this.matrix = Array(matrixCols);
    for (let i = 0; i < matrixCols; i++){
      this.matrix[i] = Array(matrixRows);
    }
  }

  //prints the matrix as one would write it mathematically; puts matrix into more readable form for programmers
  printMatrix(){
    let matrixString = '';
    for (let i = 0; i < this.matrix[0].length; i++){
      for (let j = 0; j < this.matrix.length; j++){
        matrixString += this.matrix[j][i];
        if (j === this.matrix.length-1)
          matrixString += '\n';
        else {
          matrixString += ' ';
        }
      }
    }
  }

  //takes the desired column and sets its values to those of an array's values
  setCol(col, values){
    for (let i = 0; i < this.matrix[col].length; i++){
      this.matrix[col][i] = values[i];
    }
  }

  //adds a multiple (otherScalar) of the items in this.matrix[n][otherRowInd] and adds them to those in this.matrix[n][targetRowInd]
  //only changes items in this.matrix[n][targetRowInd]
  addRows(targetRowInd, otherRowInd, otherScalar){
    for (let i = 0; i < this.matrix.length; i++){
      this.matrix[i][targetRowInd] += otherScalar*this.matrix[i][otherRowInd];
    }
  }

  //scales the row defined by this.matrix[n][targetRowInd] by a factor of scalar
  scaleRow(targetRowInd, scalar){
    for (let i = 0; i < this.matrix.length; i++){
      this.matrix[i][targetRowInd] *= scalar;
    }
  }

  //swaps the values in this.matrix[n][targetIndOne] with this.matrix[n][targetIndTwo]
  swapRows(targetIndOne, targetIndTwo){
    for (let i = 0; i < this.matrix.length; i++){
      let swap = this.matrix[i][targetIndOne];
      this.matrix[i][targetIndOne] = this.matrix[i][targetIndTwo];
      this.matrix[i][targetIndTwo] = swap;
    }
  }

  //to work, every column (except the last one) must have at least one entry
  solve(){
    for (let i = 0; i < this.matrix.length-1; i++){
      if (this.matrix[i][i] === 0){
        for (let j = 0; j < this.matrix[i].length; j++){
          if (this.matrix[i][j] != 0){
            this.swapRows(i, j);
          }
        }
      }
      this.scaleRow(i, 1/(this.matrix[i][i]));
      this.printMatrix();
      for (let j = 0; j < this.matrix[0].length; j++){
        if (j === i){
          continue;
        }
        else if (this.matrix[i][j] != 0){
          this.addRows(j, i, (-1*this.matrix[i][j]));
        }
      }
    }
    return this.matrix;
  }
}

//models chemical equations; takes input from parseInput and uses the resulting array to construct the appropriate matrix
class ChemEquations extends Matrix{
  constructor(chemArray){
    super(chemArray[0].length, chemArray.length);
    for (let i = 0; i < chemArray.length; i++){
      this.setCol(i, chemArray[i]);
    }
  }

  //ensures all solutions are whole numbers that do not share any common factors
  getReducedSolution(){
    let solutions = this.getChemSolutions();
    for (let i = 0; i < solutions.length; i++){
      if (solutions[i]%1 != 0){
        //console.log(solutions.toString());
        let remainder = solutions[i]%1;
        if (remainder < Math.pow(10,-9)){
          for (let j = 0; j < solutions.length; j++){
            solutions[j] = Number(solutions[j].toFixed(9));
          }
          continue;
        }
        for (let j = 0; j < solutions.length; j++){
          solutions[j] = solutions[j]*(1/remainder);
        }
      }
    }
    let gcf = this.getGCFofList(solutions);
    for (let i = 0; i < solutions.length; i++){
      solutions[i] *= (1/gcf);
    }
    return solutions;
  }

  getGCF(a, b){
    var R;
    while ((a % b) > 0)  {
      R = a % b;
      a = b;
      b = R;
    }
    return b;
  }

  getGCFofList(solutionList){
    return solutionList.reduce(this.getGCF);
  }

  //a class that uses the matrix class to represent chemical equations
  getChemSolutions(){
    this.solve(); //ensures matrix is ready to extract solutions
    let solutions = Array(this.matrix.length);
    for (let i = 0; i < this.matrix.length; i++){
      if (Math.abs(this.matrix[this.matrix.length-1][i]) < Math.pow(10,-9)){ //makes up for minute rounding error
        this.matrix[this.matrix.length-1][i] = 0;
      }
    }
    for (let i = 0; i < this.matrix.length; i++){
      if (this.matrix[this.matrix.length-1][i] != 0 && this.matrix[this.matrix.length-1][i] != undefined)
        solutions[i] = -1*this.matrix[this.matrix.length-1][i];
      else {
        solutions[i] = 1;
      }
    }
    return solutions;
  }
}

/*let matrix = new Matrix(3,3)
matrix.setCol(0, [1,4,7]);
matrix.setCol(1, [2,5,8]);
matrix.setCol(2, [3,6,9]);
console.log(matrix.matrix);

let newMatrix = new Matrix(2,3);
newMatrix.setCol(0, [1,25]);
newMatrix.setCol(1,[1,50]);
newMatrix.setCol(2,[6,200]);

let singDisp = new Matrix(5,4);
singDisp.setCol(0,[1,0,0,0,0]);
singDisp.setCol(1,[0,1,4,6,4]);
singDisp.setCol(2,[-1,0,-2,-3,-2]);
singDisp.setCol(3,[0,-1,0,0,0]);*/
