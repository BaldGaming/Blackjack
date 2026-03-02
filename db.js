const STORAGE_KEY = "blackjack_game_state";

// This function loads game state from storage
function get_game_state() {
    const data_str = localStorage.getItem(STORAGE_KEY);

    if (data_str) {
        return JSON.parse(data_str);
    }

    return null;
}

// This function saves game state to storage
function save_game_state(deck, player_hand, dealer_hand, game_over) {
    const state = {
        deck: deck,
        player_hand: player_hand,
        dealer_hand: dealer_hand,
        game_over: game_over,
        last_updated: new Date().toISOString()
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

// This function removes game state from storage
function clear_game_state() {
    // ניקיון פסח
    localStorage.removeItem(STORAGE_KEY);
}