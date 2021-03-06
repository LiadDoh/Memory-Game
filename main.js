function setAndGetDetails() { // set and get details from url
    var url_string = window.location.href;
    var url = new URL(url_string);
    var player1 = url.searchParams.get("player1");
    var player2 = url.searchParams.get("player2");
    var boardsize = url.searchParams.get("game_board_size");
    console.log(boardsize);
    const gameData = {
        player1: {
            name: player1,
            score: 0,
            gamesWon: 0
        },
        player2: {
            name: player2,
            score: 0,
            gamesWon: 0
        },
        game_board_size: boardsize

    }
    gameData.player1.name = player1;
    gameData.player2.name = player2;

    document.getElementById("player1").innerHTML = gameData.player1.name;
    document.getElementById("player2").innerHTML = gameData.player2.name;
    document.getElementById("score1").innerHTML = "Score:" + gameData.player1.score;
    document.getElementById("score2").innerHTML = "Score:" + gameData.player2.score;
    document.getElementById("gamesWon1").innerHTML = "Games Won:" + gameData.player1.gamesWon;
    document.getElementById("gamesWon2").innerHTML = "Games Won:" + gameData.player2.gamesWon;
}

function createCard(gameContainer, i) { // create card dynamically
    const cardDiv = document.createElement('div');
    const backDiv = document.createElement('div');
    const frontDiv = document.createElement('div');
    const frontCard = document.createElement('img');
    const backCard = document.createElement('img');
    backCard.classList.add("default");
    backCard.src = 'Images/default.png';
    backCard.classList.add("card-value");
    frontCard.src = 'Images/' + i + '.jpg';
    frontCard.classList.add('card-value');
    cardDiv.classList.add('card');
    backDiv.classList.add("card-back");
    backDiv.classList.add("card-face");
    backDiv.appendChild(backCard);
    frontDiv.classList.add("card-front");
    frontDiv.classList.add("card-face");
    frontDiv.appendChild(frontCard);
    cardDiv.appendChild(backDiv);
    cardDiv.appendChild(frontDiv);
    gameContainer.appendChild(cardDiv);
}

function createBoard(cards, boardsize) { // create the board
    let gameContainer = document.getElementById("yese").getElementsByClassName('game-container')[0]; // get game container

    for (let i = 0; i < cards.length; i++) { // create cards
        if (i == cards.length - 1 && boardsize == 5) // if boardsize is 5
            createCard(gameContainer, i);
        else
            for (let j = 0; j < 2; j++) { // create 2 cards
                createCard(gameContainer, i);
            }
    }
}

function ready(boardsize) { // ready the game
    var url_string = window.location.href;
    var url = new URL(url_string);
    var boardsize = url.searchParams.get("game_board_size");
    let cardsArray = [];
    let coin = new Coin();
    let gameContainer = document.getElementById("yese").getElementsByClassName('game-container')[0]; // get game container
    if (boardsize == 4) { // if boardsize is 4
        cardsArray = [0, 1, 2, 3, 4, 5, 6, 7];
        gameContainer.classList.add("game-container-4");
    } else if (boardsize == 5) { // if boardsize is 5
        cardsArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        gameContainer.classList.add("game-container-5");
    }
    createBoard(cardsArray, boardsize);
    let cards = Array.from(document.getElementsByClassName('card')); // get all cards
    let game = new Game(cards);
    coin.flipBtn.addEventListener("click", () => { // flip the coin and check if it is heads or tails
        coin.flipCoin(game, cards);
    }, 3000);
}

window.onload = setAndGetDetails(); // Set and get details after page load

if (document.readyState == 'loading') { // Wait for page to load
    document.addEventListener('DOMContentLoaded', ready(boardsize));
} else {
    ready();
}