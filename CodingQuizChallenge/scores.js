// Variables definition

const scoresTable = document.getElementById("scores-table");
const clearScoresBtn = document.getElementById("clear-scores");

// Button event listener
clearScoresBtn.addEventListener("click", clearHighscores);

// Load table on page load
loadScores();

//Event listener
clearScoresBtn.addEventListener("click", clearHighscores);

//Loads table when page loaded

function loadScores() {
  let scores = localStorage.getItem("scores");
  if (scores) {
    insertRows(scores);
  }
}

//Highscore table generation
function insertRows(scores) {
  scores = JSON.parse(scores);

  scores.forEach(function (score, index) {
    const rankCell = createRankCell(index + 1);
    const scoreCell = insertCell(score.score);
    const initialsCell = createInitialsCell(score.initials);
    const highscoreTableRow = createTableRow(rankCell, scoreCell, initialsCell);
    scoresTable.appendChild(highscoreTableRow);
  });
}

function createRankCell(rank) {
  const rankCell = document.createElement("td");
  rankCell.textContent = `${rank}`;
  return rankCell;
}

function insertCell(score) {
  const scoreCell = document.createElement("td");
  scoreCell.textContent = score;
  return scoreCell;
}

function createInitialsCell(initials) {
  const initialsCell = document.createElement("td");
  initialsCell.textContent = `${initials.toUpperCase()} - `;
  return initialsCell;
}

function createTableRow(rankCell, scoreCell, initialsCell) {
  const tableRow = document.createElement("tr");
  tableRow.appendChild(rankCell);
  tableRow.appendChild(initialsCell);
  tableRow.appendChild(scoreCell);
  return tableRow;
}

//Clear table
function clearHighscores() {
  localStorage.setItem("scores", []);
  while (scoresTable.children.length >= 1) {
    scoresTable.removeChild(scoresTable.lastChild);
  }
}
