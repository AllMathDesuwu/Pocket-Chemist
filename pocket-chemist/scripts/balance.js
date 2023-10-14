//will take input from form input and balance the inputted equation when submit is pressed
//include function to "proof-read" the input to ensure a reasonable answer from the calculator and prevent possible erors
const submit = document.querySelector('.submit');

function balanceInput(){
  let displayText = displayBox.textContent
  let chemEquations = new ChemEquations(parseInput(displayText));
  let solutions = chemEquations.getReducedSolution();
  let molecules = findMolecules(displayText);
  let moleculeSelector = 0;
  for (let i = 0; i < displayText.length; i++){
    if (displayText.slice(i, i+molecules[moleculeSelector].length) === molecules[moleculeSelector]){
      if (solutions[moleculeSelector] != 1)
        displayText = displayText.slice(0,i) + solutions[moleculeSelector] + displayText.slice(i);
      if (moleculeSelector >= molecules.length-1)
        break;
      moleculeSelector++;
    }
  }
  return displayText;
}

balanceInput();
submit.addEventListener('click', function(){
  if (displayBox.innerHTML === '<h3><em>Your formatted input appears here</em></h3>'){
    outputBox.innerHTML = '<h3><em>Your formatted solution appears here</em></h3>';
    return;
  }
  formatInput(balanceInput(), outputBox, 'h3');
})
