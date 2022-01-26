/*
1. Главная страница. Содержит таблицу с результатами игр и кнопку "Старт".
2. Страница игры. Содержит 2 персонажа: голова, руки, тело, ноги. 
Их можно выбрать, максимум выбрать можно 3 единицы на каждом. 
С одной стороны персонаж игрока, где он выбирает, что ему защищать. 
С другой стороны персонаж противника, где игрок выбирает, куда атаковать. 
Когда выбор сделан, игрок нажимает кнопку и выполняется ход: надо, чтобы компьютер со своей стороны рандомно сделал такой же "выбор". 
Дальше за каждое "попадание" дается 1 балл, если в этом месте был блок - то балл не дается. 
После 5 ходов раунд завершается и сохраняются результаты.
*/

let selected = [];
let phase = 1;

function selectNode(event) {
  if (event.target.classList.contains("AI") && phase === 1)
    event.target.classList.toggle("selectedRed");
  else if (event.target.classList.contains("player") && phase === 2)
    event.target.classList.toggle("selectedGreen");
}

function fight() {
  let color = phase === 1 ? "Red" : "Green";
  let selectedNodes = document.querySelectorAll(`.selected${color}`);
  if (selectedNodes.length === 3) {
    for (let i = 0; i < 3; i++) selected.push(selectedNodes[i].classList[1]);
    selectedNodes.forEach((item) => item.classList.remove(`selected${color}`));
  } else {
    alert("Нужно выбрать три части тела!");
    return;
  }
  let AIFighter = ["head", "body", "lhand", "lleg", "rhand", "rleg"];
  let score = 0;

  for (let i = 1; i <= 3; i++) {
    let randNum = Math.floor(Math.random() * (5 - i - 0 + 1)) + 0;
    AIFighter.splice(randNum, 1);
  }

  let coincidence = 0;
  selected.forEach((item) => {
    for (let j = 0; j < AIFighter.length; j++) {
      if (item === AIFighter[j]) coincidence++;
    }
  });
  score = 3 - coincidence;
  selected = [];
  if (phase === 1) {
    document.querySelectorAll(".AI").forEach((item) => {
      AIFighter.forEach((elem) => {
        if (item.classList.contains(elem)) {
          item.classList.add("selectedGreen");
          setTimeout(() => item.classList.remove("selectedGreen"), 2000);
        }
      });
    });
    let oldScore = localStorage.getItem("firstFighter");
    localStorage.setItem("firstFighter", +oldScore + score);
    phase++;
  } else if (phase === 2) {
    document.querySelectorAll(".player").forEach((item) => {
      AIFighter.forEach((elem) => {
        if (item.classList.contains(elem)) {
          item.classList.add("selectedRed");
          setTimeout(() => item.classList.remove("selectedRed"), 2000);
        }
      });
    });
    let oldScore = localStorage.getItem("secondFighter");
    localStorage.setItem("secondFighter", +oldScore + score);
    phase--;
  }
}

addEventListener("click", selectNode);
document.querySelector("button").addEventListener("click", fight);
