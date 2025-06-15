# Zombie Fighter Game

A 2D survival shooter game built with HTML5 Canvas and JavaScript where you fight against waves of zombies (jombies) while managing your health and score.

## 🎮 Game Overview

Fight against endless waves of zombies in this side-scrolling survival game. Use your shooting skills and movement abilities to survive as long as possible while the difficulty increases with your score.

## 🚀 Getting Started

### Prerequisites
- Modern web browser with HTML5 Canvas support
- Local web server (recommended for image loading)

### File Structure
```
zombie-fighter/
├── index.html          # Main HTML file
├── style.css           # Game styling
├── main.js             # Game logic (paste the provided JavaScript code)
└── images/
    ├── survivor1.png    # Player character sprite
    └── jombie1.png      # Zombie enemy sprite
```

### Setup Instructions

1. **Create the project folder** and add the files above
2. **Paste the JavaScript code** into `main.js`
3. **Add sprite images** to the `images/` folder:
   - `survivor1.png` - Player character (100x100px recommended)
   - `jombie1.png` - Zombie enemy (100x100px recommended)
4. **Start a local server** to avoid CORS issues with image loading:
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Using Node.js (if you have http-server installed)
   npx http-server
   ```
5. **Open your browser** and navigate to `http://localhost:8000`

## 🎯 How to Play

### Objective
Survive as long as possible by shooting zombies and avoiding contact with them.

### Controls

#### Desktop (Keyboard)
- **Arrow Keys**: Move left/right
- **Arrow Up / Spacebar**: Jump
- **Mouse Click**: Aim and shoot bullets

#### Mobile/Touch (On-screen buttons)
- **Left Button**: Move left
- **Jump Button**: Jump
- **Right Button**: Move right
- **Pause Button**: Pause/resume game
- **Touch Screen**: Tap to aim and shoot

### Game Mechanics

1. **Health System**: Start with 10 health points
   - Lose 1 health when touched by a zombie
   - Game ends when health reaches 0

2. **Scoring**: Earn 10 points for each zombie eliminated

3. **Difficulty Scaling**:
   - Score 0-99: Zombies move at speed 2
   - Score 100-199: Zombies move at speed 4
   - Score 200+: Zombies move at speed 6

4. **Physics**:
   - Gravity affects both player and bullets
   - Player can jump and move horizontally
   - Bullets arc due to gravity

5. **Environmental Elements**:
   - Green blocks provide cover and can block zombies
   - Blocks are destroyed when hit by zombies

## 🔧 Technical Details

### Technologies Used
- **HTML5 Canvas** for rendering
- **JavaScript ES6** for game logic
- **CSS3** for styling and layout

### Game Architecture

#### Main Components
- **Survivor Class**: Player character with movement and gravity
- **Jombie Class**: Zombie enemies with AI movement
- **Bullet System**: Projectile physics with gravity
- **Collision Detection**: AABB collision detection for all entities
- **Game Loop**: RequestAnimationFrame for smooth animation

#### Key Functions
- `animate()`: Main game loop
- `collisionbulletenemy()`: Bullet-zombie collision detection
- `collision()`: General AABB collision detection
- `handleKeyPress()`: Keyboard input handling

### Performance Considerations
- Efficient sprite removal when off-screen
- Optimized collision detection
- Smooth 60 FPS animation loop

## 🎨 Customization

### Adding New Features
1. **Power-ups**: Add special abilities or weapons
2. **Different Enemy Types**: Create zombies with unique behaviors
3. **Level System**: Add different backgrounds or obstacles
4. **Sound Effects**: Integrate Web Audio API for immersive audio

### Modifying Difficulty
Edit these values in the code:
```javascript
// Zombie spawn rate (currently every 2-4 seconds)
setInterval(() => { /* spawn logic */ }, 2000);

// Zombie speeds by score range
if (score < 100) { speed = 2; }
else if (score < 200) { speed = 4; }
else { speed = 6; }

// Player health (currently 10)
let health = 10;
```

### Styling Changes
Modify `style.css` to change:
- Button appearance and positioning
- Canvas border and background
- Control layout and responsiveness

## 🐛 Known Issues

1. **Image Loading**: Sprites may not load without a local server due to CORS restrictions
2. **Mobile Responsiveness**: Game may need adjustments for different screen sizes
3. **Block Collision**: Block collision detection could be more precise

## 🔄 Game States

1. **Main Menu**: Instructions and start button
2. **Playing**: Active gameplay with enemies spawning
3. **Paused**: Game temporarily stopped
4. **Game Over**: Score display and restart option

## 🎯 Future Improvements

- Add sound effects and background music
- Implement different weapon types
- Create multiple levels with varying backgrounds
- Add particle effects for explosions
- Implement a high score system
- Add mobile touch controls optimization
- Create different zombie types with unique abilities

## 📱 Browser Compatibility

- Chrome 60+ ✅
- Firefox 55+ ✅
- Safari 11+ ✅
- Edge 79+ ✅

## 🤝 Contributing

Feel free to fork this project and submit pull requests for improvements!

## 📄 License

This project is open source and available under the MIT License.
