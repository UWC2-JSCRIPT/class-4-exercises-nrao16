/**
 * Returns an array of 52 Cards
 * @returns {Array} deck - a deck of cards
 */
const getDeck = () => {

  // 2 – 10 will have a val equal to the number
  // 'Jack', 'Queen', and 'King' will all have a val of 10
  // 'Ace' will have a val of 11
  const deck = [];
  const suits = ['hearts', 'spades', 'clubs', 'diamonds'];
  const royalCard = { 1: 'Ace', 11: 'Jack', 12: 'Queen', 13: 'King' };
  const isNumberedCard = n => n >= 2 && n <= 10;
  const isAce = n => n === 1; 

  for (let i=0; i < suits.length; i++) {
    for (let j = 1; j <= 13; j++) {
      const card =
      {
        val: isNumberedCard(j) ? j : isAce(j) ? 11 : 10,
        displayVal: isNumberedCard(j) ? j : royalCard[j],
        suit: suits[i]
      };
      // for testing
      //console.log(j, card);
      deck.push(card);
    }
  }
  return deck;
}



// CHECKS
const deck = getDeck();
console.log(`Deck length equals 52? ${deck.length === 52}`);

const randomCard = deck[Math.floor(Math.random() * 52)];
console.log(randomCard);
const cardHasVal = randomCard && randomCard.val && typeof randomCard.val === 'number';
console.log(`Random card has val? ${cardHasVal}`);

const cardHasSuit = randomCard && randomCard.suit && typeof randomCard.suit === 'string';
console.log(`Random card has suit? ${cardHasSuit}`);

const cardHasDisplayVal = randomCard &&
  randomCard.displayVal &&
  typeof randomCard.displayVal === 'string';
console.log(`Random card has display value? ${cardHasDisplayVal}`);