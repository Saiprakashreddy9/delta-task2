const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
canvas.width = innerWidth * 0.99999;
canvas.height = innerHeight * 0.9;
const gravity = 0.2;
let bullets = [];
let enemies = [];
let survivors = [];
let blocks = [];
let score = 0;
let health = 10;
let angle;
let jump = document.getElementById('jump');
let left = document.getElementById('left');
let right = document.getElementById('right');
let xPos = canvas.width / 2 - 50;
let yPos = canvas.height - 100;
let startX = xPos + 50;
let startY = yPos;
let fighter;
let ispaused = false;
canvas.addEventListener('click', (e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    angle = Math.atan2(mouseY - startY, mouseX - startX);
    const speed = 12;
    bullets.push({
        x: startX,
        y: startY,
        vx: speed * Math.cos(angle),
        vy: speed * Math.sin(angle),
        radius: 7
    });

});

function collisionbulletenemy(bullet, jombie) {
    return (
        bullet.x < jombie.x + jombie.width &&
        bullet.x + bullet.radius > jombie.x &&
        bullet.y < jombie.y + jombie.height &&
        bullet.y + bullet.radius > jombie.y
    )
}
function collision(a, b) {
    return (
        a.x < b.x + b.width &&
        a.x + a.width > b.x &&
        a.y < b.y + b.height &&
        a.y + a.height > b.height
    )
}
blocks.push({
    x: canvas.width / 2 - 200,
    y: canvas.height - 100,
    width: 100,
    height: 100
})
blocks.push({
    x: canvas.width / 2 + 100,
    y: canvas.height - 100,
    width: 100,
    height: 100
})
function block(x, y) {
    c.beginPath()
    c.fillStyle = 'green'
    c.fillRect(x, y, 100, 100)
}
function Survivor() {
    let height = 100;
    let width = 100;

    // Declaring gravity
    const sgravity = 0.1;

    // Load the image
    const image = new Image();
    image.src = 'images/survivor1.png';
    const self = this;

    this.x = xPos;
    this.y = yPos;
    this.width = width;
    this.height = height;
    this.velocity = {
        x: 0,
        y: 0
    };

    image.onload = () => {
        // Draw the image only after it has loaded
        self.draw();
    };

    this.draw = function () {
        c.drawImage(image, self.x, self.y, self.width, self.height);
    };

    this.update = function () {
        if (this.y + this.height + this.velocity.y <= canvas.height) {
            this.velocity.y += sgravity;
            this.y += this.velocity.y;
            startY = this.y
        } else {
            // If character hits the ground, reset velocity
            this.y = canvas.height - this.height;
            startY = this.y
            this.velocity.y = 0;
        }
        this.draw();
    };
}
// fighter = new Survivor()
function Jombie(x, d) {
    // Load the image
    const image = new Image();
    image.src = 'images/jombie1.png';
    const self = this;
    this.x = x
    this.y = canvas.height - 100
    this.height = 100
    this.width = 100

    image.onload = function () {
        self.draw();
    };

    this.draw = function () {
        c.drawImage(image, self.x, canvas.height - 100, this.width, this.height);
    };

    this.update = function () {

        this.draw();
        if (score < 100) {
            if (d == 'right') {
                this.x += 2
            }
            else {
                this.x -= 2
            }
        }
        else if (score < 200) {
            if (d == 'right') {
                this.x += 4
            }
            else {
                this.x -= 4
            }
        }
        else {
            if (d == 'right') {
                this.x += 6
            }
            else {
                this.x -= 6
            }
        }

    };
}
function main() {
    c.clearRect(0, 0, canvas.width, canvas.height)
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)
    c.fillStyle = 'white'
    c.font = '40px Arial'
    c.fillText('GENERAL INSTRUCTIONS', canvas.width / 2 - 300, 100)
    c.font = '20px Arial'
    c.fillText('1 .click on screen to fire a bullet in that direction', canvas.width / 2 - 300, 150)
    c.fillText('2 .use spacebar to jump the fighter', canvas.width / 2 - 300, 180)
    c.fillText('3 .use arrow keys to movement of fighter', canvas.width / 2 - 300, 210)
    c.fillText('3 .speed of jombies increases with increase inscore ', canvas.width / 2 - 300, 240)
    c.fillText('3 .if health reaches zero game ends', canvas.width / 2 - 300, 270)
    c.fillText('3 .click start button to continue', canvas.width / 2 - 300, 300)
    document.querySelector('#controls').style.display = 'none'
    button = document.createElement('button')
    button.innerText = 'start game'
    button.id = 'start'
    button.style.left = `${canvas.width / 2 - 120}px`;
    button.style.top = `${canvas.height / 2 + 30}px`;
    // Append the button to the body
    document.body.appendChild(button);
    button.addEventListener('click', () => {
        fighter = new Survivor()
        button.remove()
        document.querySelector('#controls').style.display = 'flex'
        setInterval(() => {
            setTimeout(() => {
                const val = Math.random()
                const x = val > 0.5 ? -100 : canvas.width + 100
                const direction = val > 0.5 ? "right" : "left"

                enemies.push({
                    x: x,
                    jombie: new Jombie(x, direction)

                })
            }, (Math.random() * 3 + 1) * 1000);
        }, 2000);
        animate()
    })

}
main()


function animate() {

    c.clearRect(0, 0, canvas.width, canvas.height);
    c.fillStyle = 'rgba(0,0,0,0.6599999)'
    c.fillRect(0, 0, canvas.width, canvas.height)
    c.font = '20px Arial'
    c.fillStyle = 'white'
    c.fillText(`your score is : ${score}`, canvas.width / 2 - 100, 30)
    c.fillText(`health : ${health} /10`, canvas.width / 2 + 100, 30)
    blocks.forEach((b) => {
        block(b.x, b.y)
    })
    fighter.update()
    for (let i = 0; i < bullets.length; i++) {
        const b = bullets[i];
        b.vy += gravity; // Apply gravity
        b.x += b.vx;
        b.y += b.vy;
        // Draw bullet
        c.beginPath();
        c.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
        c.fillStyle = 'red';
        c.fill();
        // Remove bullets that go off-screen
        if (b.y > canvas.height || b.x > canvas.width || b.y < 0 || b.x < 0) {
            bullets.splice(i, 1);
            i--;
        }
    }
    for (let j = 0; j < enemies.length; j++) {
        const e = enemies[j];
        e.jombie.update()
        //Remove enemies that go off-screen
        if (e.jombie.x > canvas.width + 100 || e.jombie.x < -100) {
            enemies.splice(j, 1);
            j--;
        }
    }
    enemies.forEach((enemy, enemyindex) => {
        bullets.forEach((bullet, bulletindex) => {
            if (collisionbulletenemy(bullet, enemy.jombie)) {
                score += 10
                console.log(score)
                enemies.splice(enemyindex, 1);
                bullets.splice(bulletindex, 1);
            }
        });
        blocks.forEach((b, blockindex) => {
            if (collision(enemy.jombie, b)) {
                console.log('collison with block')
                enemies.splice(enemyindex, 1)
                blocks.splice(blockindex, 1)
            }
        })
        if (collision(enemy.jombie, fighter)) {
            enemies.splice(enemyindex, 1)
            console.log('collision')
            health -= 1
        }
    });
    animationid = requestAnimationFrame(animate);
    if (health == 0) {
        cancelAnimationFrame(animationid)
        c.fillStyle = 'black'
        c.fillRect(0, 0, canvas.width, canvas.height)
        c.font = '50px Arial'
        c.fillStyle = 'red'
        c.fillText('! ! !  GAME OVER  ! ! !', canvas.width / 2 - 300, 150)
        c.font = '30px Arial'
        c.fillStyle = 'white'
        c.fillText(`YOUR SCORE IS : ${score}`, canvas.width / 2 - 200, 300)
        c.fillText('PLAY AGAIN', canvas.width / 2 - 150, 350)
        document.querySelector('#controls').remove()
        buttonstartnewgame()
    }
}
//adding keyBased movment for ease in PC
document.addEventListener('keydown', handleKeyPress);
function handleKeyPress(event) {
    switch (event.key) {

        case 'ArrowUp':
            if (fighter.y + fighter.height < canvas.height) return;
            fighter.velocity.y = -8
            break;

        case 'ArrowLeft':
            fighter.x += -10
            startX += -10
            blocks.forEach((b) => {
                if (b.x + b.width == fighter.x || fighter.x + fighter.width == b.x) {
                    fighter.x += 10
                    startX += 10
                }
            })
            break;
        case 'ArrowRight':
            fighter.x += 10
            startX += 10
            blocks.forEach((b) => {
                if (b.x + b.width == fighter.x || fighter.x + fighter.width == b.x) {
                    fighter.x += -10
                    startX += -10
                }
            })
            break;
        case ' ':
            if (fighter.y + fighter.height < canvas.height) return;
            fighter.velocity.y = -8
            break;

        default:
            return;

    }
}


jump.addEventListener('click', () => {
    if (fighter.y + fighter.height < canvas.height) return;
    fighter.velocity.y = -8
})
left.addEventListener('click', () => {
    fighter.x += -10
    startX += -10
    blocks.forEach((b) => {
        if (b.x + b.width == fighter.x || fighter.x + fighter.width == b.x) {
            fighter.x += 10
            startX += 10
        }
    })
})
right.addEventListener('click', () => {
    fighter.x += 10
    startX += 10
    blocks.forEach((b) => {
        if (b.x + b.width == fighter.x || fighter.x + fighter.width == b.x) {
            fighter.x += -10
            startX += -10
        }
    })
})

function buttonstartnewgame() {
    // Create the button
    const button = document.createElement('button');
    button.innerText = 'Start new game';
    button.id = 'newgame';
    // Position the button relative to the canvas
    button.style.left = `${canvas.width / 2 - 120}px`;
    button.style.top = `${canvas.height / 2 + 30}px`;
    // Append the button to the body
    document.body.appendChild(button);
    button.addEventListener('click', () => {
        location.reload()
    })
}

pause = document.getElementById('pause')
pause.addEventListener('click', () => {
    ispaused = !ispaused
    pause.innerText = ispaused ? 'resume' : 'pause'
    if (ispaused) {
        // Game is paused, so stop the animation loop
        cancelAnimationFrame(animationid);
    } else {
        // Game is resumed, so start the animation loop
        animate();
    }
})



