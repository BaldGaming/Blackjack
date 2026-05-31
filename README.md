# Vanilla JS Blackjack — Play Classic 21 in the Browser

<img width="728.6" height="648.6" alt="image" src="https://github.com/user-attachments/assets/b3c1b8da-fc2a-47c2-8eb4-09690b035d1d" />

A clean, fully interactive web-based Blackjack game. Built entirely from scratch using Vanilla JavaScript, HTML, and CSS, this project handles all standard casino rules including dynamic Ace scoring, automated dealer logic, and win/loss/push evaluations. 

### Features
* **Complete Game Loop:** Full support for Deal, Hit, Stand, and Reset mechanics.
* **Dynamic Scoring Engine:** Automatically adjusts the value of Aces (1 or 11) on the fly to prevent early busts and maximize scoring potential.
* **Dealer AI:** The automated dealer draws cards strictly according to casino rules, hitting until reaching a minimum score of 17.
* **State Persistence:** Hooks into local storage to save the game state, allowing players to accidentally refresh the page without losing their current hand.
* **Smooth UI & Animations:** Features suit-specific coloring (red/black logic), a responsive layout, and custom CSS entry animations (`new_card_spin`) for newly dealt cards.

### Architecture
```text
blackjack/
    index.html          # UI layout, scoreboards, and game table
    style.css           # Table felt design, animations, and card styling
    script.js           # Core game loop, scoring algorithms, and DOM manipulation
```

### Setup & Installation
Because this project relies entirely on client-side rendering, there are no build tools, backend servers, or external dependencies required. 

1. Clone the repository to your local machine:
   ```bash
   git clone [https://github.com/your-username/blackjack.git](https://github.com/your-username/blackjack.git)
   ```
2. Navigate to the project folder.
3. Open `index.html` directly in any modern web browser to start playing.

### How It Works
The game operates entirely in the browser. Upon initialization, a fresh 52-card deck is programmatically generated and randomized using the Fisher-Yates shuffle algorithm. 

JavaScript acts as the controller, managing the game state arrays (`player_hand`, `dealer_hand`, `deck`). When a user interacts with the UI, the script recalculates the score and handles DOM manipulation to update the visual board in real-time. The final resolution checks the player's total against the dealer's logic to declare a Win, Loss, Bust, or Push.

### Tech Stack
* **JavaScript (ES6+)** — Core game logic, state management, and DOM manipulation.
* **HTML5** — Semantic structure of the interactive game board.
* **CSS3** — Custom styling, flexbox layouts, and keyframe animations.
