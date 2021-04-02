"use strict";

/** Memory game: find matching pairs of cards and flip both of them. */

const FOUND_MATCH_WAIT_MSECS = 1000;
const COLORS = [
  "red", "blue", "green", "orange", "purple",
  "red", "blue", "green", "orange", "purple",
];
const gameBoard = document.getElementById("game");
let lockBoard = false;
// const click = gameBoard.addEventListener('click', function(e){
  
//   let cardColor = e.target.innerText
//    console.log(e.target.innerText);
//    e.target.classList.toggle('white');
//    set.push(cardColor)
//    console.log(set)
   
// })
const colors = shuffle(COLORS);

createCards(colors);


/** Shuffle array items in-place and return shuffled array. */

function shuffle(items) {
  // This algorithm does a "perfect shuffle", where there won't be any
  // statistical bias in the shuffle (many naive attempts to shuffle end up not
  // be a fair shuffle). This is called the Fisher-Yates shuffle algorithm; if
  // you're interested, you can learn about it, but it's not important.

  for (let i = items.length - 1; i > 0; i--) {
    // generate a random index between 0 and i
    let j = Math.floor(Math.random() * i);
    // swap item at i <-> item at j
    [items[i], items[j]] = [items[j], items[i]];
  }

  return items;
}

/** Create card for every color in colors (each will appear twice)
 *
 * Each div DOM element will have:
 * - a class with the value of the color
 * - an click listener for each card to handleCardClick
 */
 
function createCards(colors) {
  
  console.log(gameBoard)

  for (let color of colors) {
    const card = document.createElement('div')
    card.addEventListener('click', handleCardClick)
    card.classList.add(color, 'flex-child');
    card.classList.add('white');
    card.setAttribute('id', color);
    console.log(card)
    gameBoard.appendChild(card)
  }
}

/** Flip a card face-up. */
let hasFlipped =false;
let firstCard; 
let secondCard;

function flipCard(card) {
  
  card.target.classList.remove('white');
  if (!hasFlipped) {
    hasFlipped = true;
    firstCard = card.target;
    firstCard.removeEventListener('click', handleCardClick)
  } else {
    hasFlipped = false;
    secondCard =card.target;
    secondCard.removeEventListener('click', handleCardClick)
    lockBoard = true;
    if(firstCard.id == secondCard.id){
      console.log('you got a match!');
      lockBoard = false;
      firstCard.setAttribute('id', true)
      secondCard.setAttribute('id', true)
    } 
    else {
      unFlipCard(card)
    }
  }
}

/** Flip a card face-down. */

function unFlipCard(card) {
  setTimeout (function(){
    firstCard.classList.add('white');
    secondCard.classList.add('white');
    firstCard.addEventListener('click', handleCardClick);
    secondCard.addEventListener('click', handleCardClick);
    lockBoard = false;
  }, 1000)
  
  
}



function reload() {
  window.location.reload();
};


function handleWin(){
  const button = document.createElement('button');
  button.innerText = 'Restart';
  button.addEventListener('click', reload)
  gameBoard.innerHTML = '<br><br><h2>CONGRATULATIONS!</h2><h2>YOU WON!!!!</h2><br>'
  gameBoard.classList.add('syne')
  gameBoard.appendChild(button);
}


/** Handle clicking on a card: this could be first-card or second-card. */
function handleCardClick(evt) {  
  if(lockBoard) {
    return;
  }
  flipCard(evt);
  let completed =document.querySelectorAll('#true');
  console.log(completed.length)
  if (completed.length == 10){
    setTimeout(function(){
      for( let complete of completed){
        complete.remove()
      }
      handleWin()
    }, 1000);
    
  }
}
