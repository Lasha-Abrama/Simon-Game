let userClickedPattern = [];
const buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let level = 0;
let started = false;

function nextSequence(){
  userClickedPattern = [];
  level ++;
  $("h1").text(`level ${level}`)
  let randNum = Math.floor(Math.random() * 4);
  const randomChosenColour = buttonColours[randNum];
  gamePattern.push(randomChosenColour);
  $(`#${randomChosenColour}`).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  makeSound(randomChosenColour);
}

function makeSound (color){
  const audio = new Audio(`sounds/${color}.mp3`);
  audio.play();
}

$(".btn").click(function(){
  const userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  makeSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
})

function animatePress(currentColour){
  $(`#${currentColour}`).addClass("pressed");
  setTimeout(function(){
    $(`#${currentColour}`).removeClass("pressed");
  }, 100);
}

$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

function checkAnswer(currentLevel){
  if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
    console.log("success");
    if (userClickedPattern.length === gamePattern.length){
      setTimeout(function(){
        nextSequence();
      }, 1000);
    }
  }else{
    console.log("wrong");
    makeSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over, Press Any Key to Restart")
    startOver();
  }
}

function startOver(){
  started = false;
  level = 0;
  gamePattern = [];
}



