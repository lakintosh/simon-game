let gamePattern = [];
let userClickedPattern = [];
let buttonColors = ["red", "blue", "green", "yellow"];
let isGameStarted = false;
let level = 0;

// Level generation events.
function nextSequence() {
    let randomChosenColor = buttonColors[Math.floor(Math.random() * 4)];
    gamePattern.push(randomChosenColor);

    hideStartBtn(isGameStarted);
    animatePress(randomChosenColor);
    playSound(randomChosenColor);
    // Replaces the h1 with current level.
    $("h1").html(`Level ${level}`);
    level++;
}

// Start button event handlers
$('.start-button').mouseover(function() {
    $(this).html('Click me!');
});

$('.start-button').mouseout(function() {
    $(this).html('START');
});

function hideStartBtn(isGameStarted) {
    let startButton = $('.start-button');

    if (isGameStarted === false) {
        startButton.addClass('start-button-none');
    }
}

function showStartBtn(isGameStarted) {
    let startButton = $('.start-button');

    if (isGameStarted === false) {
        startButton.removeClass('start-button-none');
    }
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
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout( () => { $("body").removeClass("game-over")}, 200);
        $("h1").html("Game Over, try again ;)");
        startOver();
        showStartBtn(isGameStarted);
    }
}

function startOver() {
    level = 0;
    isGameStarted = false;
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
$('.start-button').click(function() {
   if (isGameStarted === false) {
    nextSequence();
    isGameStarted = true;
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
