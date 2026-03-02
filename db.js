const STORAGE_KEY = "blackjack_game_state";

/**
 * Retrieves the saved game state from localStorage.
 * @returns {Object|null} The state object or null if no game is saved.
 */
function get_game_state() {
    const data_str = localStorage.getItem(STORAGE_KEY);
    
    if (data_str) {
        return JSON.parse(data_str);
    }
    
    return null;
}

/**
 * Saves the current variables into a single state object in localStorage.
 * @param {Array} deck - Current remaining cards.
 * @param {Array} player_hand - Current player cards.
 * @param {Array} dealer_hand - Current dealer cards.
 * @param {boolean} game_over - Current status of the round.
 */
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

/**
 * Clears the saved game (usually called when a round ends or a new game starts).
 */
function clear_game_state() {
    // ניקיון פסח
    localStorage.removeItem(STORAGE_KEY);
}