let gamePattern = [];
let userClickedPattern = [];
let buttonColors = ["red", "blue", "green", "yellow"];
let gameStarted = 0;
let level = 0;

// Level generation events.
function nextSequence() {
    let randomChosenColor = buttonColors[Math.floor(Math.random() * 4)];
    gamePattern.push(randomChosenColor);

    animatePress(randomChosenColor);
    playSound(randomChosenColor);
    // Replaces the h1 with current level.
    $("h1").html(`Level ${level}`);
    level++;
}

// Validates users choose.
function checkAnswer(currentLevel) {
    // If correct.
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if (gamePattern.length === userClickedPattern.length) {
            setTimeout(nextSequence, 1000);
            userClickedPattern = [];
        }
    } else {
        // If wrong.
        let wrongSound = new Audio("sounds/wrong.mp3");
        wrongSound.play();
        $("body").addClass("game-over");
        setTimeout( () => { $("body").removeClass("game-over")}, 200);
        $("h1").html("Game Over, Press 'A' Key to Restart");
        startOver();
    }
}

function startOver() {
    level = 0;
    gameStarted = 0;
    gamePattern = [];
    userClickedPattern = [];
}

//Audio events.
function playSound(color) {
    let audioFile = new Audio(`sounds/${color}.mp3`);
    audioFile.play();
}

// Animates button press.
function animatePress(color) {
    $(`#${color}`).addClass("pressed");
    setTimeout( () => { $(`#${color}`).removeClass("pressed") }, 100);
}

// Starts the game.
$(document).keypress(function(event) {
    if (event.key === 'a') {
        if (gameStarted == false) {
            nextSequence();
            gameStarted++;
        }
    }
});

// User click events.
$(".btn").click(function() {
    let userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);

    checkAnswer(userClickedPattern.length - 1);
    animatePress(userChosenColor);
    playSound(userChosenColor);
});
