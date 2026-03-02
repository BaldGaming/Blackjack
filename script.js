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
const reset_btn = document.getElementById('reset_btn');


// -------------
function create_deck() {
    const suits = [
        { name: "hearts", symbol: "♥" },
        { name: "diamonds", symbol: "♦" },
        { name: "clubs", symbol: "♣" },
        { name: "spades", symbol: "♠" }
    ];

    const values = ["Ace", 2, 3, 4, 5, 6, 7, 8, 9, 10, "Jack", "Queen", "King"];
    const new_deck = [];

    suits.forEach(suit => {
        values.forEach(value => {
            new_deck.push({ 
                suit: suit.name, 
                symbol: suit.symbol, 
                value: value 
            });
        });
    });

    return new_deck;
}

// Fisher-Yates Shuffle for randomizing deck.
function shuffle_deck(deck) {

    for (let i = deck.length - 1; i > 0; i--) {

        // picks a random index before the current element
        const j = Math.floor(Math.random() * (i + 1));

        // swaps i and j
        [deck[i], deck[j]] = [deck[j], deck[i]];
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
            sum += value;
        }
    }

    sum += (aces * 11);

    while (sum > 21 && aces > 0) {
        sum -= 10;
        aces--;
    }
    return sum;
}

// This function updates the UI
// This function updates the UI
function update_ui() {
    // --- Render Player Area ---
    player_cards.innerHTML = "";
    
    // Create the "x + y + z" breakdown string
    const player_values = player_hand.map(card => get_card_value(card));
    const player_breakdown = player_values.join(" + ");
    const player_final_score = calculate_score(player_hand);

    player_hand.forEach(card => {
        const color_class = (card.suit === "hearts" || card.suit === "diamonds") ? "red" : "black";
        player_cards.innerHTML += `
            <div class="card ${color_class}">
                ${card.value}<br>${card.symbol}
            </div>`;
    });

    // Update Player Score with the breakdown format
    if (player_hand.length > 0) {
        player_score.textContent = `${player_breakdown} = ${player_final_score}`;
    } else {
        player_score.textContent = "0";
    }

    // --- Render Dealer Area ---
    dealer_cards.innerHTML = "";
    if (!game_over) {
        if (dealer_hand.length > 0) {
            const first_card = dealer_hand[0];
            const color_class = (first_card.suit === "hearts" || first_card.suit === "diamonds") ? "red" : "black";
            
            dealer_cards.innerHTML += `
                <div class="card ${color_class}">
                    ${first_card.value}<br>${first_card.symbol}
                </div>`;
            dealer_cards.innerHTML += `<div class="card hidden">?</div>`;
            
            const first_card_val = get_card_value(first_card);
            dealer_score.textContent = `${first_card_val} + ? = ?`;
        }
    } else {
        // Create the dealer breakdown for when the game is over
        const dealer_values = dealer_hand.map(card => get_card_value(card));
        const dealer_breakdown = dealer_values.join(" + ");
        const dealer_final_score = calculate_score(dealer_hand);

        dealer_hand.forEach(card => {
            const color_class = (card.suit === "hearts" || card.suit === "diamonds") ? "red" : "black";
            dealer_cards.innerHTML += `
                <div class="card ${color_class}">
                    ${card.value}<br>${card.symbol}
                </div>`;
        });
        dealer_score.textContent = `${dealer_breakdown} = ${dealer_final_score}`;
    }
}

/**
* Converts a card's face value into its numerical Blackjack point value.
* * @param {Object} card - The card object from the deck (e.g., { suit: "hearts", value: "King" }).
* @returns {number} The integer point value (Ace = 11, Face Cards = 10, Others = Face Value).
*/
function get_card_value(card) {
    if (card.value === "Ace") return 11; 
    if (["Jack", "Queen", "King"].includes(card.value)) return 10;
    return card.value;
}

// Function for checking end condition
function check_end_condition(score) {

    if (score == 0)
        return true;
    else
        return score > 21;
}

// -------------
function start_game() {
    // lowers game over flag
    game_over = false;

    // Resets the deck and shuffles it
    deck = create_deck();
    deck = shuffle_deck(deck);

    // Resets the scores
    player_hand = [];
    dealer_hand = [];

    // Deals two cards for each party
    player_hand.push(deck.pop());
    dealer_hand.push(deck.pop());
    player_hand.push(deck.pop());
    dealer_hand.push(deck.pop());

    // Enable/Disable buttons
    deal_btn.disabled = true;
    hit_btn.disabled = false;
    stand_btn.disabled = false;
    message.textContent = "Hit or Stand?";

    update_ui();
    // Updates local storage
    save_game_state(deck, player_hand, dealer_hand, game_over);
}

function reset_game() {
    // Clears LS
    clear_game_state();

    // Resets all global state variables
    deck = [];
    dealer_hand = [];
    player_hand = [];
    game_over = false;

    // Reset the UI elements
    message.textContent = 'Press "Deal" to start playing!';
    player_score.textContent = "0";
    dealer_score.textContent = "0";
    player_cards.innerHTML = "";
    dealer_cards.innerHTML = "";

    // Reset button states
    deal_btn.disabled = false;
    hit_btn.disabled = true;
    stand_btn.disabled = true;
}

function hit(hand) {
    if (game_over) return;

    // pops the last card from the deck and pushes it into a hand
    hand.push(deck.pop());

    // gets the latest scores
    const p_score = calculate_score(player_hand);
    const d_score = calculate_score(dealer_hand);

    // updates the UI
    update_ui();

    // checks for game ending conditions
    if (calculate_score(hand) > 21) {
        final_result(p_score, d_score);
    }

    // Updates local storage
    save_game_state(deck, player_hand, dealer_hand, game_over);
}

function stand() {
    if (game_over) return;

    game_over = true;

    // continuously hits the Dealer until his score is over 17
    while (calculate_score(dealer_hand) < 17) {
        dealer_hand.push(deck.pop());
    }

    const final_p_score = calculate_score(player_hand);
    const final_d_score = calculate_score(dealer_hand);

    update_ui();
    final_result(final_p_score, final_d_score);

    // Updates local storage
    save_game_state(deck, player_hand, dealer_hand, game_over);
}

// This function determines the outcome of the game
function final_result(p_score, d_score) {

    // resets game flag, buttons and text.
    game_over = true;
    hit_btn.disabled = true;
    stand_btn.disabled = true;
    deal_btn.disabled = false;

    // determines the winner
    if (p_score > 21)
        message.textContent = `Bust! You have ${p_score}. Dealer wins!`;

    else if (d_score > 21)
        message.textContent = `Dealer busts with ${d_score}! You win!`;

    else if (p_score > d_score)
        message.textContent = `You have ${p_score} vs Dealer's ${d_score}. You win!`;

    else if (p_score < d_score)
        message.textContent = `Dealer wins with ${d_score} vs your ${p_score}.`;

    else
        message.textContent = `It's a Push! Both have ${p_score}.`;

    // message.textContent = 'Press "Deal" to start playing!';
    update_ui();
}

// Event listeners
deal_btn.addEventListener('click', start_game);
hit_btn.addEventListener('click', () => hit(player_hand));
stand_btn.addEventListener('click', stand);
reset_btn.addEventListener('click', reset_game);

// Handles local storage
window.onload = () => {
    const saved_state = get_game_state();
    
    if (saved_state) {
        deck = saved_state.deck;
        player_hand = saved_state.player_hand;
        dealer_hand = saved_state.dealer_hand;
        game_over = saved_state.game_over;
        
        // If the game was already over, make sure buttons are correct
        if (game_over) {
            deal_btn.disabled = false;
            hit_btn.disabled = true;
            stand_btn.disabled = true;
        } else {
            deal_btn.disabled = true;
            hit_btn.disabled = false;
            stand_btn.disabled = false;
        }
        
        update_ui();
    }
};