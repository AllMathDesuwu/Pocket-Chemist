//extracts information from a chemical equation input
//returns a 2D array which can be used to create an equivalent matrix object via setCol() method
function parseInput(chemEquation){
  let elementAra = findElements(chemEquation);
  let chemicalAra = Array(0);
  let lastSymbolInd = -1; //"symbols" define where "molecules" start and end, namely arrows and plus signs
  let curSymbolInd = -1; //also need to account for last item not having a "symbol" after
  let encounterArrow = false;
  let afterArrow = false;
  for (let i = 0; i < chemEquation.length; i++){
    if (chemEquation.slice(i, i+1) === '+' || chemEquation.slice(i, i+1) === '→' || i === chemEquation.length-1){
      if (encounterArrow){
        afterArrow = true;
      }
      if (chemEquation.slice(i,i+1) === '→')
        encounterArrow = true;
      let moleculeAra = Array(elementAra.length);
      for (j = 0; j < moleculeAra.length; j++)
        moleculeAra[j] = 0;
      curSymbolInd = i;
      if (i === chemEquation.length-1)
        curSymbolInd++;
      let moleculeString = chemEquation.slice(lastSymbolInd + 1, curSymbolInd).trim();
      while (Number(moleculeString.slice(0,1))%1 >= 0){
        moleculeString = moleculeString.slice(1);
      }
      let parenStartInd = 0;
      let parenEndInd = 0;
      let parenMultiplier;
      for (let j = 0;  j < moleculeString.length; j++){
        if (moleculeString.slice(j, j+1) === '('){
          parenStartInd = j;
          let k = 0;
          while (moleculeString.slice(j+k, j+k+1) != ')')
            k++;
          parenEndInd = j+k;
          let subscript = '';
          k = 1;
          while (Number(moleculeString.slice(parenEndInd+k, parenEndInd+k+1))%1 === 0 && moleculeString.slice(parenEndInd+k, parenEndInd+k+1) != ' ' && !(k >= moleculeString.length)){
            subscript+=moleculeString.slice(parenEndInd+k, parenEndInd+k+1);
            k++;
          }
          parenMultiplier = Number(subscript);
        }
        else if (moleculeString.slice(j,j+1) === moleculeString.slice(j,j+1).toUpperCase() && moleculeString.slice(j,j+1) != moleculeString.slice(j,j+1).toLowerCase()){
          let eleSymbol = moleculeString.slice(j,j+1);
          let k = 1;
          while (moleculeString.slice(j+k,j+k+1) === moleculeString.slice(j+k,j+k+1).toLowerCase() && moleculeString.slice(j+k,j+k+1) != moleculeString.slice(j+k,j+k+1).toUpperCase()){
            eleSymbol += moleculeString.slice(j+k,j+k+1);
            k++;
          }
          let eleEndInd = j+k;
          let subscript = '';
          k = 0;
          while (Number(moleculeString.slice(eleEndInd+k, eleEndInd+k+1))%1 === 0 && moleculeString.slice(eleEndInd+k, eleEndInd+k+1) != ' ' && !(k >= moleculeString.length)){
            subscript+=moleculeString.slice(eleEndInd+k, eleEndInd+k+1);
            k++
          }
          if (subscript.trim() === '')
            subscript = '1';
          let eleInd = 0;
          for (let l = 0; l < elementAra.length; l++){
            if (eleSymbol === elementAra[l]){
              if (j > parenStartInd && j < parenEndInd){
                moleculeAra[l] += Number(subscript)*parenMultiplier;
              }
              else
                moleculeAra[l] += Number(subscript);
            }
          }
        }
      }
      if (afterArrow){
        for (k = 0; k < moleculeAra.length; k++){
          moleculeAra[k] = -1*moleculeAra[k];
        }
      }
      chemicalAra.push(moleculeAra);
      lastSymbolInd = curSymbolInd;
    }
  }
  return chemicalAra;
}

//finds number of elements in a chemical equation and assigns their symbols to positions in an array
function findElements(chemEquation){
  let eleArray = Array(1);
  for (let i = 0; i < chemEquation.length; i++){
    let checkString = chemEquation.slice(i, i+3);
    //console.log(i);
    //console.log(checkString);

    //checks if first char is an uppercase letter; second condition in place to prevent numbers from being counted as uppercase letters; checks for uppercase letters b/c element symbols always begin with an uppercase letter
    if (checkString.slice(0,1) === checkString.slice(0,1).toUpperCase() && checkString.slice(0,1) != checkString.slice(0,1).toLowerCase()){
      for (let j = 1; j < checkString.length; j++){
        if (checkString.slice(j,j+1) === checkString.slice(j,j+1).toUpperCase()){
          checkString = checkString.slice(0,j);
          checkString = checkString.trim();
          //console.log(checkString);
          break;
        }
      }
      for (let j = 0; j < eleArray.length; j++){
        if (checkString === eleArray[j])
          break;
        else if (j === eleArray.length-1)
          eleArray.push(checkString);
      }
    }
    else {
      //console.log('TwT');
    }
  }
  eleArray = eleArray.slice(1, eleArray.length);
  return eleArray;
}

function findMolecules(chemEquation){
  let lastSymbolInd = -1;
  let curSymbolInd = -1;
  let molecules = Array(0);
  for (let i = 0; i < chemEquation.length; i++){
    if (chemEquation.slice(i, i+1) === '+' || chemEquation.slice(i, i+1) === '→' || i === chemEquation.length-1){
      curSymbolInd = i;
      if (i === chemEquation.length-1)
        curSymbolInd++;
      let moleculeString = chemEquation.slice(lastSymbolInd + 1, curSymbolInd).trim();
      while (Number(moleculeString.slice(0,1))%1 >= 0){
        moleculeString = moleculeString.slice(1);
      }
      molecules.push(moleculeString);
      lastSymbolInd = curSymbolInd;
    }
  }
  return molecules;
}

//console.log(findElements('2K + Ca(C2H3O2)2 ' + String.fromCharCode(8594) + ' 2KC2H3O2 + Ca'));
//console.log(findElements('Fe + Cu(NO3)2 ' + String.fromCharCode(8594) + ' Fe(NO3)2 + Cu'));

//console.log(parseInput('Fe + Cu(NO3)2 ' + String.fromCharCode(8594) + ' Fe(NO3)2 + Cu'));
//console.log(parseInput('2K + Ca(C2H3O2)2 ' + String.fromCharCode(8594) + ' 2KC2H3O2 + Ca'));
//console.log(parseInput('(NH4)3PO4 + Al(NO3)3 ' + String.fromCharCode(8594) + ' NH4NO3 + AlPO4'))
//console.log(String.fromCharCode(8594)) //logs arrow symbol →

//let chemEquations = new ChemEquations(parseInput('(NH4)3PO4 + Al(NO3)3 ' + String.fromCharCode(8594) + ' NH4NO3 + AlPO4'));
//let chemEquations2 = new ChemEquations(parseInput('Fe + Cu(NO3)2 ' + String.fromCharCode(8594) + ' Fe(NO3)2 + Cu'));
//let chemEquations3 = new ChemEquations(parseInput('2K + Ca(C2H3O2)2 ' + String.fromCharCode(8594) + ' 2KC2H3O2 + Ca'));
//let glucoseReaction = new ChemEquations(parseInput('H2O + CO2 ' + String.fromCharCode(8594) + ' C6H12O6 + O2'));
//let chemEquation4 = new ChemEquations(parseInput('Al + 3H2SO4 ' + String.fromCharCode(8594) + ' Al2(SO4)3 + 3H2'));
