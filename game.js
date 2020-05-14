// Play sound
function playSound(name)
{
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}
var started = false;
var level = 0 ;

// Variables
var userClickedPattern = [];
var gamePattern = [];

var buttonColours = ["red", "blue", "green","yellow" ];

// First playing sound



// Click playing sound

$(".btn").click(function(){
  var userChosenColour = $(this).attr("id");
  playSound(userChosenColour);
  userClickedPattern.push(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
});

// Check answer
function checkAnswer(currentLevel){
  if(userClickedPattern[currentLevel] === gamePattern[currentLevel])
  {
   console.log("success");
    if (userClickedPattern.length === gamePattern.length){

     //5. Call nextSequence() after a 1000 millisecond delay.
     setTimeout(function () {
       nextSequence();
     }, 1000);
   }

  }
  else{

    console.log("wrong");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");

    },200);

    setTimeout(function(){
      $("#level-title").text("Game over. Press any key to restart!");
      gamePattern =[];
      started = false;
      level = 0;
    },400);



  }
}

//random
function nextSequence()
{
  userClickedPattern = [];
  level ++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);

  playSound(randomChosenColour);
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
}

// Animation
function animatePress(currentColor){
  $("."+ currentColor).addClass("pressed");

  setTimeout(function(){
  $("."+ currentColor).removeClass("pressed");
  },100);
}
// Start game
$(document).keydown(function(){
  if(!started)
  {
    $("#level-title").text("Level " + level);
      nextSequence();
      started = true;
  }
});
