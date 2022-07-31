// Our Keyboard has keyCode and in js we have onkeydown function to control keyboard navigation
score = 0;
cross = true;
audiogo = new Audio('gameover.mp3');
audio = new Audio('music.mp3');
audio.play();
setTimeout(() => {
    audio.play();
}, 1000);
document.onkeydown = function (e) {
    console.log("Key Code is:", e.key);
    // KeyCode is deprecated use key instead.
    if (e.keyCode == 38) {
        dino = document.querySelector('.dino');
        dino.classList.add('animateDino');

        setTimeout(() => {
            dino.classList.remove('animateDino');
        }, 700);
    }
    if (e.keyCode == 39) {
        dino = document.querySelector('.dino');
        dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        dino.style.left = (dinoX + 112) + 'px';
    }
    if (e.keyCode == 37) {
        dino = document.querySelector('.dino');
        dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        dino.style.left = (dinoX - 112) + 'px';
    }
}
setInterval(() => {
    dino = document.querySelector('.dino');
    gameOver = document.querySelector('.gameOver');
    obstacle = document.querySelector('.obstacle');

    dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
    dy = parseInt(window.getComputedStyle(dino, null).getPropertyValue('top'));
    ox = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('left'));
    oy = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('top'));

    offsetX = Math.abs(dx - ox);
    offsetY = Math.abs(dy - oy);
    if (offsetX < 83 && offsetY < 52) {
        gameOver.innerHTML = "Game Over- Reload to start Over";
        obstacle.classList.remove('obstacleani');
        audiogo.play();
        setTimeout(() => {
            audiogo.pause();
            audio.pause();
        }, 1000);
    }
    else if (offsetX < 144 && cross) {
        score += 1;
        updateScore(score);
        cross = false;
        setTimeout(() => {
            cross = true;
        }, 1000);
        setTimeout(() => {
            aniDur = parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue('animation-duration'));
            newDur = aniDur - 0.3;
            obstacle.style.animationduration = newDur + 's';
        }, 500);

    }
}, 100);

function updateScore(score) {
    scoreCont.innerHTML = "Your Score: " + score;
}