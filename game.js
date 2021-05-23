var buttonColors=["red", "blue", "green", "yellow"];
var gamePattern=[];
var userClickedPattern=[];


var started = false;
var level = 0;

$(document).keydown(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    newSequence();
    started = true;
  }
});





$(".btn").click(function(){
  userClickedPattern.push(this.id);
  console.log(userClickedPattern);
  playSound(this.id);
  animatePress(this.id)
  checkAnswer(userClickedPattern.length-1);
});




function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          newSequence();
        }, 1000);
      }
    } else {
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startOver();
    }
}




function newSequence(){
  level++;
  userClickedPattern=[];
  $("#level-title").text("Level " + level);

  var randomChosenColor=buttonColors[Math.floor(Math.random()*4)];
  gamePattern.push(randomChosenColor);

  $("#"+ randomChosenColor).fadeOut(600).fadeIn(300);
  var audio = new Audio("sounds/"+randomChosenColor+".mp3");
  audio.play();
}



function playSound(name){
  var audio1 = new Audio("sound/"+name+".mp3");
  audio1.play();
}



function animatePress(currentColor){
  $("#"+currentColor).addClass("pressed");
  setTimeout(function(){
  $("#"+currentColor).removeClass("pressed");
},100);
}


function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
