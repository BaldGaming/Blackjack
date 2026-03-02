// State variables
let deck = [];
let dealer_hand = [];
let player_hand = [];
let game_over = false;

// elements
const dealer_cards = document.getElementById('dealer_cards');
const player_cards = document.getElementById('player_cards');
const dealer_score = document.getElementById('dealer_score');
const player_score = document.getElementById('player_score');
const message = document.getElementById('game_message');

const deal_btn = document.getElementById('deal_btn');
const hit_btn = document.getElementById('hit_btn');
const stand_btn = document.getElementById('stand_btn');


// -------------
function create_deck() {
    const deck = [
        { suit: "hearts", value: "Ace" },
        { suit: "hearts", value: 2 },
        { suit: "hearts", value: 3 },
        { suit: "hearts", value: 4 },
        { suit: "hearts", value: 5 },
        { suit: "hearts", value: 6 },
        { suit: "hearts", value: 7 },
        { suit: "hearts", value: 8 },
        { suit: "hearts", value: 9 },
        { suit: "hearts", value: 10 },
        { suit: "hearts", value: "Jack" },
        { suit: "hearts", value: "Queen" },
        { suit: "hearts", value: "King" },

        { suit: "diamonds", value: "Ace" },
        { suit: "diamonds", value: 2 },
        { suit: "diamonds", value: 3 },
        { suit: "diamonds", value: 4 },
        { suit: "diamonds", value: 5 },
        { suit: "diamonds", value: 6 },
        { suit: "diamonds", value: 7 },
        { suit: "diamonds", value: 8 },
        { suit: "diamonds", value: 9 },
        { suit: "diamonds", value: 10 },
        { suit: "diamonds", value: "Jack" },
        { suit: "diamonds", value: "Queen" },
        { suit: "diamonds", value: "King" },

        { suit: "clubs", value: "Ace" },
        { suit: "clubs", value: 2 },
        { suit: "clubs", value: 3 },
        { suit: "clubs", value: 4 },
        { suit: "clubs", value: 5 },
        { suit: "clubs", value: 6 },
        { suit: "clubs", value: 7 },
        { suit: "clubs", value: 8 },
        { suit: "clubs", value: 9 },
        { suit: "clubs", value: 10 },
        { suit: "clubs", value: "Jack" },
        { suit: "clubs", value: "Queen" },
        { suit: "clubs", value: "King" },

        { suit: "spades", value: "Ace" },
        { suit: "spades", value: 2 },
        { suit: "spades", value: 3 },
        { suit: "spades", value: 4 },
        { suit: "spades", value: 5 },
        { suit: "spades", value: 6 },
        { suit: "spades", value: 7 },
        { suit: "spades", value: 8 },
        { suit: "spades", value: 9 },
        { suit: "spades", value: 10 },
        { suit: "spades", value: "Jack" },
        { suit: "spades", value: "Queen" },
        { suit: "spades", value: "King" },
    ];
    return deck;
}

// Fisher-Yates Shuffle for randomizing deck.
function shuffle_deck(deck) {

    for (let i = deck.length - 1; i > 0; i--) {

        // picks a random index before the current element
        const j = Math.floor(Math.random() * (i + 1));

        // swaps i and j
        [array[i], array[j]] = [array[j], array[i]];
    }

    return deck;
}

// calculates the total hand value.
function calculate_score(hand) {
    let sum = 0, aces = 0;

    // this loop sums the total hand value.
    for (let i = hand.length - 1; i >= 0; i--) {
        let value = hand[i].value;

        // counts how many aces exist
        if (value === "Ace") {
            aces++;
        }

        // adds the face cards
        else if (value === "Jack" || value === "Queen" || value === "King") {
            sum += 10;
        }
        
        // adds the normal cards
        else {
            sum += value
        }
    }

    sum += (aces*11);

    while (sum > 21 && aces > 0) {
        sum -= 10;
        aces--;
    }
    return sum;
}

// 
function update_ui() {
    // TODO: Render the cards to the DOM and update the score spans

}

// Function for checking end condition
function check_end_condition(d_score, p_score) {

    // TODO: Determine if someone busted or got 21, update message, and end game

    // checks the player score
    if ((d_score || p_score) > 21) {
        // END GAME!
    }

    if ()

}


// -------------
function start_game() {
    // TODO: Reset hands, create/shuffle deck, deal initial two cards to each

    // Enable/Disable buttons
    deal_btn.disabled = true;
    hit_btn.disabled = false;
    stand_btn.disabled = false;
    message_el.textContent = "Game on! Hit or Stand?";
}

function hit() {
    if (game_over) return;
    // TODO: Pop a card from deck, push to player_hand, calculate score, check for bust
}

function stand() {
    if (game_over) return;
    // TODO: Dealer reveals hidden card, hits until score >= 17, then determine winner

    game_over = true;
    hit_btn.disabled = true;
    stand_btn.disabled = true;
    deal_btn.disabled = false; // Allow playing again
}

// Event listeners
deal_btn.addEventListener('click', start_game);
hit_btn.addEventListener('click', hit);
stand_btn.addEventListener('click', stand);