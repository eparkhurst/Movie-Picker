console.log("sanity check");

var $score =0;
var $correct = 0;
var $choiceCount = 0;

run();
function run(){
  $.get('kimonoData.json', function(data){
      var movie = data.results.collection1[$randNum()].property1.text;
      var sendee = movie.replace(/\s/g,"+");
      $.get('http://www.omdbapi.com/?t='+sendee+'&y=&plot=short&r=json', function(omdb){
        $(".container").append(omdb.Title);
        $(".container").append('<img class="choice1" src='+omdb.Poster+'>')
        //console.log(omdb)
        var rating1 = omdb.imdbRating;
          //*******
        var movie2 = data.results.collection1[$randNum()].property1.text;
        var sendee2 = movie2.replace(/\s/g,"+");
        $.get('http://www.omdbapi.com/?t='+sendee2+'&y=&plot=short&r=json', function(omdb){
          $(".container").append(omdb.Title);
          $(".container").append('<img class ="choice2" src='+omdb.Poster+'>')
          var rating2 = omdb.imdbRating;
          if(rating1 === rating2){
            reset();
          }
          else if(rating1>rating2){
            $correct = 1;
          }else $correct = 2;
          //console.log($correct);
          //****************************
          var userChoice = 0;
          clickChoice();

        })
      })
  })
}

function clickChoice(){
var userChoice = 0;
  $('.choice1').click(function(){
    userChoice = 1;
    if(userChoice == $correct){
      $score +=1;
    }
    $choiceCount += 1;
    reset();
  })
  $('.choice2').click(function(){
    userChoice = 2;
    if(userChoice == $correct){
      $score +=1;
    }
    $choiceCount += 1;
    reset();
  })
}

function reset(){
  if($choiceCount == 10){
    alert("Your score is"+$score);
    $score = 0;
    $choiceCount = 0;
  }
  $('.container').empty();
  run();
}




var $randNum =function(){
  return Math.floor(Math.random()*1000);
}
