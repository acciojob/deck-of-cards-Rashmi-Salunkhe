//your code here

// Get references to elements
const deck = document.getElementById('deck');
const cardHolders = document.querySelectorAll('.typesOfCards .placed');
const shuffleBtn = document.getElementById('shuffle');
const resetBtn = document.getElementById('reset');
const wonScreen = document.getElementById('won');

// Card information: mapping card ID to cardholder
const cardMap = {
    '0': '103', // Spades
    '1': '100', // Clubs
    '2': '100', // Clubs
    '3': '101', // Diamonds
    '4': '103', // Spades
};

// Keep track of correctly placed cards
let placedCards = JSON.parse(localStorage.getItem('placedCards')) || {};

// Load game state if present
function loadGame() {
    for (const cardId in placedCards) {
        const holderId = placedCards[cardId];
        const cardElement = document.getElementById(cardId);
        const holderElement = document.getElementById(holderId);
        holderElement.appendChild(cardElement);
    }

    // Check if all cards have been placed correctly
    checkWinCondition();
}

// Allow cards to be dragged
deck.addEventListener('dragstart', (event) => {
    event.dataTransfer.setData('text/plain', event.target.id);
});

// Enable cardholders to accept drops
cardHolders.forEach((holder) => {
    holder.addEventListener('dragover', (event) => {
        event.preventDefault();
    });

    holder.addEventListener('drop', (event) => {
        event.preventDefault();
        const cardId = event.dataTransfer.getData('text/plain');
        const cardElement = document.getElementById(cardId);

        // Check if the card can be placed in the correct holder
        if (cardMap[cardId] === event.target.id) {
            event.target.appendChild(cardElement);
            placedCards[cardId] = event.target.id; // Save placement
            localStorage.setItem('placedCards', JSON.stringify(placedCards));
            checkWinCondition();
        }
    });
});

// Check if all cards are placed correctly
function checkWinCondition() {
    if (Object.keys(placedCards).length === Object.keys(cardMap).length) {
        wonScreen.style.display = 'block'; // Show "You Won" screen
    }
}

// Shuffle cards back to deck
shuffleBtn.addEventListener('click', () => {
    const allCards = document.querySelectorAll('.whitebox2');
    allCards.forEach((card) => {
        deck.appendChild(card); // Move all cards back to the deck
    });

    placedCards = {}; // Reset placed cards
    localStorage.setItem('placedCards', JSON.stringify(placedCards));
    wonScreen.style.display = 'none'; // Hide "You Won" screen
});

// Reset the game
resetBtn.addEventListener('click', () => {
    const allCards = document.querySelectorAll('.whitebox2');
    allCards.forEach((card) => {
        deck.appendChild(card); // Move all cards back to the deck
    });

    placedCards = {}; // Clear placed card data
    localStorage.setItem('placedCards', JSON.stringify(placedCards));
    wonScreen.style.display = 'none'; // Hide the win screen
});

// Load game state on page load
window.addEventListener('load', loadGame);
