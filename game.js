
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern=[];
var userClickedPattern = [];
var result;
var level;
var userChosenColour;


// рандомный цвет
function nextSequence() {
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+ randomChosenColour).addClass("pressed");
    setTimeout(function(){
        $("#"+ randomChosenColour).removeClass("pressed");
    }, 100);
    var audio = new Audio("sounds/" + randomChosenColour + ".mp3");
    audio.play();
    //level
    level = gamePattern.length;
    $("h1").text("Level " + level);        
    
    //очистка массива
    userClickedPattern.length = 0;
}

// клик
$(".container").on("click", ".btn", function(event) {
    userChosenColour = event.target.id;
    userClickedPattern.push(userChosenColour);
    var audio = new Audio("sounds/" + userChosenColour + ".mp3");
    audio.play();
    $("#"+ userChosenColour).addClass("pressed");
    setTimeout(function() {
        $("#"+ userChosenColour).removeClass("pressed");
    }, 100);
    // запуск проверки
    checkAnswer();
});

//start game
$(document).keypress(function() {
    if (gamePattern.length == 0) {
        nextSequence();
    }
});

// проверка 
function checkAnswer() {
    var q = userClickedPattern.length -1;
    if (userChosenColour !== gamePattern[q]) {
        result = "wrong";
        gamePattern.length = 0;
        level = 0;
        $("h1").text("Press A Key to Start");
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 100);
    } else {
        q + 1;
        result = "success";
        if (gamePattern.length == userClickedPattern.length) {
            setTimeout(nextSequence, 1000);
        }
    }
}

