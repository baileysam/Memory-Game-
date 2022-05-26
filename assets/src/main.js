const container   = document.getElementById('js-container');


 /**
 * Creates randomized cards
 * 
 * @returns void
 */
function setupCards() {
   let icons = ['ball', 'bolt', 'carrot', 'code', 'dice', 'fish', 'jedi', 'vase']
   icons     = icons.concat(icons);
   
   //clearing out container
   container.innerHTML = '';

   //add cards to container
   for (let i = 0; i < 16; i++) {
       let icon = Math.floor(Math.random() * icons.length);

       let card = `<div class="card flipped" onclick="flipCard(this)" data-icon="${ icons[icon] }" data-index="${i}">
                       <div class="card__face card__face--front">
                           <img class="card__face__image" src="assets/images/card-front.svg" alt="front">
                           <img class="card__face__image card__face__image__icon" draggable="false" src="assets/images/${ icons[icon] }.svg">
                       </div>
                       <div class="card__face card__face--back">
                           <img src="assets/images/card-back.svg" alt="back">
                       </div>
                   </div>`;

       icons.splice(icon, 1);

       container.innerHTML += card;
   }
}

setupCards();


