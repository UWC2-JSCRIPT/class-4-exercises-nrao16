const blackjackDeck = getDeck();

/**
 * Represents a card player (including dealer).
 * @constructor
 * @param {string} name - The name of the player
 */
class CardPlayer {
  constructor(name) {
    this.name = name;
    this.hand = [];
    this.drawCard = () => {
      const randomCard = blackjackDeck[Math.floor(Math.random() * 52)];
      this.hand.push(randomCard);
    }
  }
};

// CREATE TWO NEW CardPlayers
const dealer = new CardPlayer('Dealer');
const player = new CardPlayer('Player')

/**
 * Calculates the score of a Blackjack hand
 * @param {Array} hand - Array of card objects with val, displayVal, suit properties
 * @returns {Object} blackJackScore
 * @returns {number} blackJackScore.total
 * @returns {boolean} blackJackScore.isSoft
 */
const calcPoints = (hand) => {
  // CREATE FUNCTION HERE
  let total = 0;
  let isSoft = false;
  let isAceFound = false;

  hand.forEach(card => {
    // found an Ace
    if (card.displayVal === 'Ace') {
      // Is this the 1st Ace
      if (!isAceFound) {
        // 1st ace gets 11 points and isSoft is true
        isAceFound = true;
        total += card.val;
        isSoft = true;
      } else {
        // if there is already an ace then add 1 for all other aces
        total++;
      }
    } else {
      // Not an Ace 
      total += card.val;
    }
  });

  // If we have an ace and total over 21 - reduce 10 points so that 1st Ace is now counted at 1 instead of 11
  // Reset isSoft back to false
  if (isAceFound && total > 21) {
    total -= 10;
    isSoft = false;
  }

  let blackJackScore = {
    total,
    isSoft
  }

  return blackJackScore;
}

/**
 * Determines whether the dealer should draw another card.
 * 
 * @param {Array} dealerHand Array of card objects with val, displayVal, suit properties
 * @returns {boolean} whether dealer should draw another card
 */
const dealerShouldDraw = (dealerHand) => {
  // CREATE FUNCTION HERE
  let dealerBlackJackScore = calcPoints(dealerHand);

  if (dealerBlackJackScore.total <= 16 ||
    (dealerBlackJackScore.total === 17 && dealerBlackJackScore.isSoft)) {
    return true;
  }

  return false;

}

/**
 * Determines the winner if both player and dealer stand
 * @param {number} playerScore 
 * @param {number} dealerScore 
 * @returns {string} Shows the player's score, the dealer's score, and who wins
 */
const determineWinner = (playerScore, dealerScore) => {
  // CREATE FUNCTION HERE
  const result = playerScore > dealerScore ? 'PLAYER WINS!' : dealerScore > playerScore ? 'DEALER WINS!' : 'TIE!'
  return `Player's score: ${playerScore}, Dealer's score: ${dealerScore}, ${result}`;

}

/**
 * Creates user prompt to ask if they'd like to draw a card
 * @param {number} count 
 * @param {string} dealerCard 
 */
const getMessage = (count, dealerCard) => {
  return `Dealer showing ${dealerCard.displayVal}, your count is ${count}.  Draw card?`
}

/**
 * Logs the player's hand to the console
 * @param {CardPlayer} player 
 */
const showHand = (player) => {
  const displayHand = player.hand.map((card) => card.displayVal);
  const displayMessage = `${player.name}'s hand is ${displayHand.join(', ')} (${calcPoints(player.hand).total})`;
  const fontColor = player.name === 'Player' ? 'Green' : 'Navy'
  console.log(displayMessage);
  document.body.innerHTML += `<h3 style='color:${fontColor};'>${displayMessage}</h3>`;
}

/**
 * Runs Blackjack Game
 */
const startGame = function () {
  player.drawCard();
  dealer.drawCard();
  player.drawCard();
  dealer.drawCard();

  let playerScore = calcPoints(player.hand).total;
  if(playerScore === 21) {
    showHand(player);
    return 'Player wins by getting 21 in first 2 cards!';
  }

  let dealerScore = calcPoints(dealer.hand).total;
  if(dealerScore === 21) {
    showHand(dealer);
    return 'Dealer wins by getting 21 in first 2 cards!';
  }

  showHand(player);

  while (playerScore < 21 && confirm(getMessage(playerScore, dealer.hand[0]))) {
    player.drawCard();
    playerScore = calcPoints(player.hand).total;
    showHand(player);
  }
  if (playerScore > 21) {
    return 'You went over 21 - you lose!';
  }
  console.log(`Player stands at ${playerScore}`);

  while (dealerScore < 21 && dealerShouldDraw(dealer.hand)) {
    dealer.drawCard();
    dealerScore = calcPoints(dealer.hand).total;
    showHand(dealer);
  }
  if (dealerScore > 21) {
    return 'Dealer went over 21 - you win!';
  }
  console.log(`Dealer stands at ${dealerScore}`);

  return determineWinner(playerScore, dealerScore);
}
console.log(startGame());