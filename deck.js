const Suits = ["♠", "♣", "♥", "♦"]
const Values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]

export default class Deck {
    constructor(cards = freshDeck()) {
        this.cards = cards
    }

    get numberOfCards() {
        return this.cards.length
    }

    pop() {
        return this.cards.shift()
    }

    push(card) {
        this.cards.push(card)
    }

    shuffle() {
        //Below we use the sort() but the issue with this is it will not completely randomize our deck 
        //it will sort in an actual and not a random order thus it will make some of our cards a higher probabilty to be in the correct order instead of random
        // this.cards.sort((a,b) => Math.random() - .5)
        for (let i = this.numberOfCards - 1; i > 0; i--) {
            const newIndex = Math.floor(Math.random() * (i + 1))
            const oldValue = this.cards[newIndex]
            this.cards[newIndex] = this.cards[i]
            this.cards[i] = oldValue
        }
    }
}

class Card {
    constructor(suit, value) {
        this.suit =  suit
        this.value = value
    }

    get color() {
        return this.suit === "♣" || this.suit === "♠" ? 'black' : 'red'
    }

    getHtml() {
        const cardDiv = document.createElement('div')
        cardDiv.innerText = this.suit
        cardDiv.classList.add('card', this.color)
        cardDiv.dataset.value = `${this.value} ${this.suit}`
        return cardDiv
    }
}



function freshDeck() {
    //flatMap takes all arrays and puts them into 2 arrays
    return Suits.flatMap(suit => {
        return Values.map(value => {
            return new Card(suit, value)
        })
    })
}