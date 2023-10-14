//formats div input for proper display
const inputBox = document.querySelector('.input-box');
const displayBox = document.querySelector('.formula-display');
const outputBox = document.querySelector('.output-box');

function formatInput(input, display, tag){
  display.innerHTML = '';
  let text = input;
  let displayHTML = '<' + tag + '>';
  let encounteredSub = false;
  for (let i = 0; i < text.length; i++){
    if ((Number(text.slice(i, i+1))%1 === 1 || Number(text.slice(i, i+1))%1 == 0) && text.slice(i, i+1) != ' '){ //is number
      if (i != 0 && !(Number(text.slice(i-1, i))%1 === 1 || Number(text.slice(i-1, i))%1 == 0) && text.slice(i-1,i) != '+' && text.slice(i-1,i) != '>' && text.slice(i-1,i) != '-' && text.slice(i-1,i) != '→' && text.slice(i-1,i) != ' '){
        displayHTML += '<sub>';
        encounteredSub = true;
      }
      displayHTML += text.slice(i, i+1);
      if (!(i >= text.length) && !(Number(text.slice(i+1, i+2))%1 === 1 || Number(text.slice(i+1, i+2))%1 == 0) || text.slice(i+1,i+2) === ' '){
        displayHTML += '</sub>';
      }
    }
    else if (!(Number(text.slice(i, i+1))%1 === 1 || Number(text.slice(i, i+1))%1 == 0) || text.slice === ' '){
      if (text.slice(i, i+1) === '-'){
        displayHTML += '→'
        i++;
        continue;
      }
      displayHTML += text.slice(i, i+1);
    }
  }
  displayHTML+='</' + tag + '>';
  if (displayHTML === '<h3></h3>')
    displayHTML = '<h3><em>Your formatted input appears here</em></h3>';
  display.innerHTML = displayHTML;
}

function textNodesUnder(node){
  var all = [];
  for (node=node.firstChild;node;node=node.nextSibling){
    if (node.nodeType==3) all.push(node);
    else all = all.concat(textNodesUnder(node));
  }
  return all;
}

function setCursor() {
  let pos = textNodesUnder(inputBox).length;
  var tag = inputBox;

  // Creates range object
  var setpos = document.createRange();

  // Creates object for selection
  var set = window.getSelection();

  // Set start position of range
  setpos.setStart(tag.childNodes[0], pos);

  // Collapse range within its boundary points
  // Returns boolean
  setpos.collapse(true);

  // Remove all ranges set
  set.removeAllRanges();

  // Add range with respect to range object.
  set.addRange(setpos);

  // Set cursor on focus
  tag.focus();
}

formatInput(inputBox.value, displayBox, 'h3');
inputBox.value = '';
displayBox.innerHTML = '<h3><em>Your formatted input appears here</em></h3>';
outputBox.innerHTML = '<h3><em>Your formatted solution appears here</em></h3>';
inputBox.addEventListener('input', function(){formatInput(inputBox.value, displayBox, 'h3')});
