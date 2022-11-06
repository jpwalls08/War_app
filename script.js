import Deck from './deck.js'

const Card_Value_Map = {    
    "2" : 2,
    "3" : 3,
    "4" : 4,
    "5" : 5,
    "6" : 6,
    "7" : 7,
    "8" : 8,
    "9" : 9,
    "10" : 10,
    J : 11,
    Q : 12,
    K : 13,
    A : 14
}

const computerCardSlot = document.querySelector('.computer-card-slot')
const playerCardSlot = document.querySelector('.player-card-slot')
const computerDeckElement = document.querySelector(".computer-deck")
const playerDeckElement = document.querySelector('.player-deck')
const text = document.querySelector('.text')

let playerDeck, computerDeck, inRound, stop
// let inRound = false

document.addEventListener('click', () => {
    if (stop) {
        startGame()
        return
    }
    if (inRound) {
        cleanBeforeRound()
    }
    else {
        flipCards()
    }
})

startGame()
function startGame() {
    const deck = new Deck()
    deck.shuffle()

    const deckMidPoint = Math.ceil(deck.numberOfCards / 2)
    playerDeck = new Deck(deck.cards.slice(0, deckMidPoint))
    // computerDeck = new Deck([new Card('s', 2), new Card('s', 2)])
    computerDeck = new Deck(deck.cards.slice(deckMidPoint, deck.numberOfCards))
    inRound = false
    stop = false

    cleanBeforeRound()
}

function cleanBeforeRound() {
    inRound = false
    computerCardSlot.innerHTML = ''
    playerCardSlot.innerHTML = ''
    text.innerText = ''

    updateDeckCount()
}

function flipCards() {
    inRound = true

    const playerCard = playerDeck.pop() /*gives us the first card*/
    const computerCard = computerDeck.pop()

    playerCardSlot.appendChild(playerCard.getHtml()) /*renders card*/
    computerCardSlot.appendChild(computerCard.getHtml())

    updateDeckCount()

    if(isRoundWinner(playerCard, computerCard)) {
        text.innerText = "Win"
        playerDeck.push(playerCard)
        playerDeck.push(computerCard)
    }
    else if (isRoundWinner(computerCard, playerCard)) {
        text.innerText = "Lose"
        computerDeck.push(playerCard)
        computerDeck.push(computerCard)
    }
    else {
        text.innerText = "Draw"
        playerDeck.push(playerCard)
        computerDeck.push(computerCard)
    }
    if (isGameOver(playerDeck)) {
        text.innerText = "You Lose!"
        stop = true
    }
    else if (isGameOver(computerDeck)) {
        text.innerText = "You Win!"
        stop = true
    }
}

function updateDeckCount() {
    computerDeckElement.innerText = computerDeck.numberOfCards
    playerDeckElement.innerText = playerDeck.numberOfCards
}

function isRoundWinner(cardOne, cardTwo) {
    return Card_Value_Map[cardOne.value] > Card_Value_Map[cardTwo.value]
}

function isGameOver(deck) {
    return deck.numberOfCards === 0
}

// const deck = new Deck()
// deck.shuffle()
// console.log(deck.cards)

// computerCardSlot.appendChild(deck.cards[0].getHtml())