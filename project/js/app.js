import { dictionary } from "./dictionary.js";
let selectedWord;
let counter = 0;
const parentDiv = document.getElementById("parentDiv");
const childDivs = parentDiv.children;
selectedWord = dictionary[Math.floor(Math.random() * dictionary.length)];
console.log(selectedWord);
function resetgame() {
  location.reload();
}
function unlock() {
  const dog = Array.from(childDivs[counter].children);
  dog.forEach((elements) => (elements.readOnly = false));
}
function takediv() {
  const inputs = Array.from(childDivs[counter].children);
  const enteredWord = inputs.map((input) => input.value.toLowerCase()).join("");
  counter += 1;
  if (!dictionary.includes(enteredWord)) {
    alert("The entered word is not in the dictionary.");
    inputs.forEach((input) => {
      input.value = "";
    });
    counter -= 1;
  } else {
    const result = getResult(enteredWord);
    colorTable(result, inputs);
  }
  unlock();
}

function getResult(word) {
  let correctSpots = 0;
  let otherSpots = 0;

  for (let i = 0; i < word.length; i++) {
    if (word[i] === selectedWord[i]) {
      correctSpots++;
    } else if (selectedWord.includes(word[i])) {
      otherSpots++;
    }
  }

  return { correctSpots, otherSpots };
}

function colorTable(result, inputs) {
  inputs.forEach((input, index) => {
    const cell = input;
    cell.readOnly = true;
    const letter = input.value.toLowerCase();

    if (letter === selectedWord[index]) {
      cell.style.backgroundColor = "green";
    } else if (selectedWord.includes(letter)) {
      cell.style.backgroundColor = "yellow";
    } else {
      cell.style.backgroundColor = "gray";
    }
  });
  if (result.correctSpots === 5) {
    alert("Вітаю ви перемогли");
  }
}

document.getElementById("resetButton").addEventListener("click", resetgame);
document.getElementById("checkButton").addEventListener("click", takediv);
