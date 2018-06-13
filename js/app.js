// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = Math.random() * 505;
    this.y = 63 + (Math.round(Math.random() * 2) * 83);

    //speed of the enemy
    this.speed = (Math.random() * 150) + 75;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

    if (this.x >= 505) {
        this.y = 63 + (Math.round(Math.random() * 2) * 83);
        this.x = -50;
    }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.x = 202;
    this.y = 404;
    this.score = 0;
    //display player image
    this.sprite = 'images/char-cat-girl.png';
}


// checks if the player collides an enemy and resets player position 
Player.prototype.update = function() {
    this.checkCollision();
}

Player.prototype.checkCollision = function() {
    for (var i in allEnemies) {
        if (this.x < allEnemies[i].x + 80 &&
            this.x + 65 > allEnemies[i].x + 2 &&
            this.y + 135 > allEnemies[i].y + 140 &&
            this.y + 65 < allEnemies[i].y + 75) {
            this.score = 0;
            this.x = 202;
            this.y = 404;
            console.log('Start again!');
        }
    }

    if (this.y <= 0) {
        this.score += 1;
        this.x = 202;
        this.y = 404;
        console.log('You Win!');
    }

    // Display Score
    // ctx.fillRect(0, 0, 300, 150);
    ctx.clearRect(10, 10, 350, 50);
    ctx.fillStyle = '#0059b3';
    ctx.font = '28px Helvetica';
    ctx.fillText("Score: " + this.score, 202, 40);
}


// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

}

//Create function that allows to player to move on the screen
Player.prototype.handleInput = function(key) {
    if (key == 'left' && this.x - 101 >= 0)
        this.x -= 101;
    if (key == 'right' && this.x + 101 < 505)
        this.x += 101;
    if (key == 'up' && this.y - 83 >= -11)
        this.y -= 83;
    if (key == 'down' && this.y + 83 < 487)
        this.y += 83;
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
//Create array that holds all of the enemies
var allEnemies = [];

for (var addEnemies = 0; addEnemies < 4; addEnemies++) {
    var enemy = new Enemy();
    allEnemies.push(enemy);
};

//Display player
var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});