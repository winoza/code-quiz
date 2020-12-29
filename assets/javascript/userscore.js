var allScores = JSON.parse(window.localStorage.getItem("savedScore")) || [];

allScores.forEach(function(score) {
    var listScore = document.createElement("li");
    listScore.textContent = score.initials + " - " + score.score
    console.log(listScore.textContent)

    var scoreOrder = document.querySelector("#highscores")
    scoreOrder.appendChild(listScore)
})

function clearScores() {
    window.localStorage.removeItem("savedScore");
    window.location.reload();
}

document.querySelector("#clear").onclick = clearScores;