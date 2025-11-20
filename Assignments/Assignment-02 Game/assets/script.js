var cardList = [
    "CARD-01",
    "CARD-02",
    "CARD-03",
    "CARD-04",
    "CARD-05",
    "CARD-06",
    "CARD-07",
    "CARD-08",
    "CARD-09",
    "CARD-10"
];

var cardSet = [];
var board = [];
var rows = 4;
var columns = 5;

var card1Selected = null;
var card2Selected = null;
var lockBoard = false;
var matchedCards = [];

function shuffleCards() {
    cardSet = cardList.concat(cardList);
    for (let i = 0; i < cardSet.length; i++) {
        let j = Math.floor(Math.random() * cardSet.length);
        [cardSet[i], cardSet[j]] = [cardSet[j], cardSet[i]];
    }
}

window.addEventListener("DOMContentLoaded", () => {
    const audio = document.getElementById("bg-music");
    document.body.addEventListener("click", () => {
        audio.muted = false;
        audio.play().catch(err => console.log(err));
    }, { once: true });
});

function startGame() {
    let pergamena = document.getElementById("pergamena");
    board = [];
    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
            let cardImg = cardSet.pop();
            row.push(cardImg);
            let card = document.createElement("img");
            card.id = r + "-" + c;
            card.src = "img/BACK-card.png";
            card.dataset.front = "img/" + cardImg + ".png";
            card.classList.add("card");
            card.addEventListener("click", selectCard);
            pergamena.appendChild(card);
        }
        board.push(row);
    }
}

function selectCard() {
    var sound = document.getElementById("card-sound");
    sound.currentTime = 0;
    sound.play();
    if (lockBoard) return;
    if (!this.classList.contains("flipped")) {
        this.classList.add("flipped");
        this.src = this.dataset.front;
        if (!card1Selected) {
            card1Selected = this;
        } else if (!card2Selected && this !== card1Selected) {
            card2Selected = this;
            lockBoard = true;
            setTimeout(update, 1000);
        }
    }
}

function update() {
    if (card1Selected.src !== card2Selected.src) {
        card1Selected.src = "img/BACK-card.png";
        card2Selected.src = "img/BACK-card.png";
    } else {

       
        var correctSound = document.getElementById("correct-cards");
        correctSound.currentTime = 0;
        correctSound.play();

        card1Selected.classList.add("matched");
        card2Selected.classList.add("matched");
        card1Selected.style.pointerEvents = "none";
        card2Selected.style.pointerEvents = "none";
        matchedCards.push(card1Selected, card2Selected);
        checkVictory();
    }

    card1Selected.classList.remove("flipped");
    card2Selected.classList.remove("flipped");
    card1Selected = null;
    card2Selected = null;
    lockBoard = false;
}

window.onload = function() {
    var restartBtn = document.getElementById("restart-btn");
    restartBtn.addEventListener("click", function() {
        matchedCards.forEach(card => {
            card.classList.remove("matched");
            card.style.pointerEvents = "auto";
            card.src = "img/BACK-card.png";
        });
        matchedCards = [];

        var pergamena = document.getElementById("pergamena");
        var cards = Array.from(pergamena.querySelectorAll(".card"));
        card1Selected = null;
        card2Selected = null;
        lockBoard = false;
        if (cards.length === 0) {
            shuffleCards();
            startGame();
            return;
        }
        let cardsProcessed = 0;
        cards.forEach(card => {
            if (card.classList.contains("flipped")) {
                card.classList.remove("flipped");
                card.addEventListener("transitionend", function handler() {
                    card.src = "img/BACK-card.png";
                    card.removeEventListener("transitionend", handler);
                    cardsProcessed++;
                    if (cardsProcessed === cards.length) {
                        cards.forEach(c => pergamena.removeChild(c));
                        shuffleCards();
                        startGame();
                    }
                });
            } else {
                cardsProcessed++;
            }
        });
        if (cardsProcessed === cards.length) {
            cards.forEach(c => pergamena.removeChild(c));
            shuffleCards();
            startGame();
        }
    });

    var charSelection = document.getElementById("char-selection");
    var selectedChar = document.getElementById("selected-character");
    charSelection.querySelectorAll("img").forEach(img => {
        img.addEventListener("click", function() {
            selectedChar.src = this.src;
            selectedChar.style.opacity = 1;
            charSelection.style.display = "none";
            document.body.style.transition = "background-color 0.5s";
            document.body.style.backgroundColor = "#111";
            shuffleCards();
            startGame();
        });
    });

    document.getElementById("char-selection").querySelectorAll("img").forEach(img => {
    img.addEventListener("click", function () {
        document.getElementById("click-sound").currentTime = 0;
        document.getElementById("click-sound").play();
    });
});



document.getElementById("restart-btn").addEventListener("click", function () {
    document.getElementById("click-sound").currentTime = 0;
    document.getElementById("click-sound").play();
});
}

function checkVictory() {
    if (matchedCards.length === 20) { 
        document.getElementById("victory-screen").style.display = "flex";
    }
}