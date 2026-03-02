// State variables
let deck = [];
let dealer_hand = [];
let player_hand = [];
let game_over = false;

// DOM Elements
const dealer_cards = document.getElementById('dealer_cards');
const player_cards = document.getElementById('player_cards');
const dealer_score = document.getElementById('dealer_score');
const player_score = document.getElementById('player_score');
const message = document.getElementById('game_message');

const deal_btn = document.getElementById('deal_btn');
const hit_btn = document.getElementById('hit_btn');
const stand_btn = document.getElementById('stand_btn');
const reset_btn = document.getElementById('reset_btn');

// This function creates a fresh deck of 52 cards
function create_deck() {
    const suits = [
        { name: "hearts", symbol: "♥" },
        { name: "diamonds", symbol: "♦" },
        { name: "clubs", symbol: "♣" },
        { name: "spades", symbol: "♠" }
    ];

    const values = ["Ace", 2, 3, 4, 5, 6, 7, 8, 9, 10, "Jack", "Queen", "King"];
    const new_deck = [];

    // Loops through suits and values to build objects
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

// This function performs a Fisher-Yates shuffle
function shuffle_deck(deck) {
    for (let i = deck.length - 1; i > 0; i--) {

        // Picks a random index and swaps elements
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }

    return deck;
}

// This function calculates total points for a hand
function calculate_score(hand) {
    let sum = 0, aces = 0;

    // Checks each card value and identifies aces
    for (let i = hand.length - 1; i >= 0; i--) {
        let value = hand[i].value;

        if (value === "Ace") {
            aces++;
        } else if (["Jack", "Queen", "King"].includes(value)) {
            sum += 10;
        } else {
            sum += value;
        }
    }

    // Handles the flexible ace value
    sum += (aces * 11);

    while (sum > 21 && aces > 0) {
        sum -= 10;
        aces--;
    }

    return sum;
}

// This function refreshes the player and dealer areas
function update_ui() {
    render_hand_dynamic(player_hand, player_cards, player_score, "player");
    
    // Shows hidden card or full hand based on game state
    if (!game_over) {
        render_dealer_hidden();
    } else {
        render_hand_dynamic(dealer_hand, dealer_cards, dealer_score, "dealer");
    }
}

// This function draws new cards with animations
function render_hand_dynamic(hand, container, score_element, type) {
    const current_card_count = container.querySelectorAll('.card').length;

    // Appends new cards to the container
    for (let i = current_card_count; i < hand.length; i++) {
        const card = hand[i];
        const color_class = (card.suit === "hearts" || card.suit === "diamonds") ? "red" : "black";
        
        const card_div = document.createElement('div');
        card_div.className = `card ${color_class} new_card_spin`;
        card_div.innerHTML = `${card.value}<br>${card.symbol}`;
        
        container.appendChild(card_div);
    }

    // Updates the score breakdown text
    const values = hand.map(card => get_card_value(card));
    const breakdown = values.join(" + ");
    const final_score = calculate_score(hand);
    
    score_element.textContent = hand.length > 0 ? `${breakdown} = ${final_score}` : "0";
}

// This function handles the face-down dealer card
function render_dealer_hidden() {
    if (dealer_hand.length === 0) return;
    
    const current_elements = dealer_cards.querySelectorAll('.card');
    
    // Builds initial cards if container is empty
    if (current_elements.length === 0) {
        const first_card = dealer_hand[0];
        const color_class = (first_card.suit === "hearts" || first_card.suit === "diamonds") ? "red" : "black";
        
        const card_div = document.createElement('div');
        card_div.className = `card ${color_class} new_card_spin`;
        card_div.innerHTML = `${first_card.value}<br>${first_card.symbol}`;
        
        const hidden_div = document.createElement('div');
        hidden_div.className = "card hidden";
        hidden_div.textContent = "?";
        
        dealer_cards.appendChild(card_div);
        dealer_cards.appendChild(hidden_div);
    }
    
    // Shows the partial score breakdown
    const first_val = get_card_value(dealer_hand[0]);
    dealer_score.textContent = `${first_val} + ? = ?`;
}

// This function gets the numeric value for a card
function get_card_value(card) {
    if (card.value === "Ace") return 11; 
    
    if (["Jack", "Queen", "King"].includes(card.value)) return 10;
    
    return card.value;
}

// This function checks the bust or blackjack conditions
function check_end_condition(score) {
    if (score == 0)
        return true;
    else
        return score > 21;
}

// This function initializes a new round
function start_game() {
    game_over = false;

    // Resets deck and hands
    deck = create_deck();
    deck = shuffle_deck(deck);
    player_hand = [];
    dealer_hand = [];

    // Clears the table UI
    player_cards.innerHTML = "";
    dealer_cards.innerHTML = "";

    // Deals initial two cards
    player_hand.push(deck.pop());
    dealer_hand.push(deck.pop());
    player_hand.push(deck.pop());
    dealer_hand.push(deck.pop());

    // Updates buttons and message
    deal_btn.disabled = true;
    hit_btn.disabled = false;
    stand_btn.disabled = false;
    message.textContent = "Hit or Stand?";

    update_ui();
    save_game_state(deck, player_hand, dealer_hand, game_over);
}

// This function clears state and storage
function reset_game() {
    clear_game_state();

    // Wipes all current variables
    deck = [];
    player_hand = [];
    dealer_hand = [];
    game_over = false;

    // Clears the UI board
    player_cards.innerHTML = "";
    dealer_cards.innerHTML = "";
    player_score.textContent = "0";
    dealer_score.textContent = "0";
    message.textContent = 'Press "Deal" to start playing!';

    deal_btn.disabled = false;
    hit_btn.disabled = true;
    stand_btn.disabled = true;
}

// This function deals a card to the player
function hit(hand) {
    if (game_over) return;

    // Adds card and recalculates scores
    hand.push(deck.pop());
    const p_score = calculate_score(player_hand);
    const d_score = calculate_score(dealer_hand);

    update_ui();

    // Ends game if player busts
    if (calculate_score(hand) > 21) {
        final_result(p_score, d_score);
    }

    save_game_state(deck, player_hand, dealer_hand, game_over);
}

// This function triggers dealer logic
function stand() {
    if (game_over) return;

    game_over = true;

    // Dealer hits until reaching 17
    while (calculate_score(dealer_hand) < 17) {
        dealer_hand.push(deck.pop());
    }

    const final_p_score = calculate_score(player_hand);
    const final_d_score = calculate_score(dealer_hand);

    // Clears dealer area for the final reveal
    dealer_cards.innerHTML = ""; 
    update_ui();

    final_result(final_p_score, final_d_score);
    save_game_state(deck, player_hand, dealer_hand, game_over);
}

// This function determines and displays the winner
function final_result(p_score, d_score) {
    game_over = true;

    // Resets button states
    hit_btn.disabled = true;
    stand_btn.disabled = true;
    deal_btn.disabled = false;

    // Selects the win or loss message
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
}

// Event listeners
deal_btn.addEventListener('click', start_game);
hit_btn.addEventListener('click', () => hit(player_hand));
stand_btn.addEventListener('click', stand);
reset_btn.addEventListener('click', reset_game);

// This function loads saved game on startup
window.onload = () => {
    const saved_state = get_game_state();
    
    if (saved_state) {
        deck = saved_state.deck;
        player_hand = saved_state.player_hand;
        dealer_hand = saved_state.dealer_hand;
        game_over = saved_state.game_over;
        
        // Sets button state based on loaded flag
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