// Give the container__inner and ID (set it to a variable)
// Make a loop which runs 8 times and adds to the innerHTML of the container__inner

const container   = document.getElementById('js-container');
const timer       = document.getElementById('js-timer');
const refresh     = document.getElementById('js-refresh');
const startButton = document.getElementById('js-start');
const name        = document.getElementById('js-name');

let timerInterval = false;
let flipped       = [];
let started       = false;
let startSeconds  = 30;
let seconds       = startSeconds;

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

function checkGame() {
    let cards     = document.getElementsByClassName('card');
    let completed = true;

    for (let card of cards) {
        if(card.classList.contains('hidden') === false){
            completed = false;
        }
    }

    if (completed === true) {
        let leaderboardItem = {
            name: name.value,
            score: getScore()
        };
        
        updateStorage(leaderboardItem);
    }
}

function setupStorage(){
    let storage = localStorage.getItem('leaderboard')

    if(storage === null) {
        localStorage.setItem('leaderboard', '[]');
    }
}

function getStorage() {
    return JSON.parse(localStorage.getItem('leaderboard'));
}

/**
 * Adds the specified leaderboard item to localStorage
 * 
 * @param leaderboard The object to add to localStorage
 * 
 * @returns void
 */
function updateStorage(leaderboard) {
    let storage = getStorage();

    storage.push(leaderboard);

    localStorage.setItem('leaderboard', JSON.stringify(storage));
}


  


function getScore() {
    return startSeconds - seconds;
}

function startGame(){
    setupStorage();
    updateLeaderboard();
    setupCards();

    started = false;
    clearInterval(timerInterval);

    seconds = startSeconds;
    timer.innerText = seconds;

    refresh.classList.add('spin');
    startButton.setAttribute('disabled', true)

    let cards = document.getElementsByClassName('card');

    for (let card of cards) {
        setTimeout(() => {
            card.classList.toggle('flipped');

            setTimeout(() => {
                card.classList.toggle('flipped');
                started = true;
                refresh.classList.remove('spin');

                startButton.removeAttribute('disabled'); 

            }, 2000);
        }, 20);

        timer.classList.remove('flash');

    }

    timerInterval = setInterval(() => {
        if (started === true && seconds > 0) {
            seconds--;
            timer.innerText = seconds;

            if(seconds % 5 === 0)
            {
                timer.classList.add('big');
            } else{
                timer.classList.remove('big');
            }

            if(seconds <= 10) {
                timer.classList.add('flash');
            }

            if (seconds === 0) {
                let cards = document.getElementsByClassName('card');

                for (let card of cards) {
                    card.classList.add('hidden');
                }
            }
        }
        
    }, 1000);
    
}

function flipCard(card){
    if (started === false) {
        return;
    }

    if (flipped.length !== 2) {
    if (flipped.length < 2) {
        card.classList.toggle('flipped');
        flipped.push(card);
    }

    if (flipped.length === 2) {
        if(
            flipped[0].getAttribute('data-icon') === flipped[1].getAttribute('data-icon')
            && flipped[0].getAttribute('data-index') !== flipped[1].getAttribute('data-index')
            ) {
            setTimeout(function () {
                flipped[0].classList.add('hidden');
                flipped[1].classList.add('hidden');
    
                flipped = [];

                checkGame();
            }, 500);
        } else {
            setTimeout(function () {
                flipped[0].classList.toggle('flipped');
                flipped[1].classList.toggle('flipped');
    
                flipped = [];
                checkGame();
            }, 500);
        }
    }
    }
}

setupCards();



