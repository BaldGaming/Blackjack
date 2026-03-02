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

// 
function update_ui(p_score, d_score) {
    player_score.textContent = p_score;
    dealer_score.textContent = d_score;
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
    // TODO: Reset hands, create/shuffle deck, deal initial two cards to each

    // lowers game over flag
    game_over = false;

    // Resets the deck and shuffles it
    deck = create_deck(deck);
    deck = shuffle_deck(deck);

    // Resets the scores
    player_hand = [];
    dealer_hand = [];

    // Deals two cards for each party
    hit(player_hand);
    hit(dealer_hand);
    hit(player_hand);
    hit(dealer_hand);

    // Enable/Disable buttons
    deal_btn.disabled = true;
    hit_btn.disabled = false;
    stand_btn.disabled = false;
    message.textContent = "Hit or Stand?";
}

function hit(hand) {
    if (game_over) return;

    // pops the last card from the deck and pushes it into a hand
    const card = deck.pop();
    hand.push(card);

    let cur_p_score = calculate_score(player_hand);
    let cur_d_score = calculate_score(dealer_hand);

    // checks for game ending conditions
    if (check_end_condition(calculate_score(hand))) {
        const final_p_score = cur_p_score;
        const final_d_score = cur_d_score;
        final_result(final_p_score, final_d_score);

        return;
    }

    // updates the UI
    update_ui(cur_p_score, cur_d_score);

    return hand;
}

function stand() {
    if (game_over) return;
    // TODO: Dealer reveals hidden card, hits until score >= 17, then determine winner


    while (calculate_score(dealer_hand) < 17) {
        hit(dealer_hand);
    }

    const final_p_score = calculate_score(player_hand);
    const final_d_score = calculate_score(dealer_hand);

    final_result(final_p_score, final_d_score);
    return;
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

    return;
}

// Event listeners
deal_btn.addEventListener('click', start_game);
hit_btn.addEventListener('click', () => hit(player_hand));
stand_btn.addEventListener('click', stand);