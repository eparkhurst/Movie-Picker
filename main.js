console.log("sanity check");

//var Firebase = require("firebase");
//var myFirebaseRef = new Firebase("s://intense-heat-9278.firebaseio.com/")

var $score =0;
var $correct = 0;
var $choiceCount = 0;
var currentUser = "";
var userList = [];
var movies = [];


for ( var i = 0, len = localStorage.length; i < len; ++i ) {
  userList.push( JSON.parse(localStorage.getItem( localStorage.key( i ) )).user );
}




function run(){
  $.get('kimonoData.json', function(data){
      var movie = data.results.collection1[$randNum()].property1.text;
      var sendee = movie.replace(/\s/g,"+");
      console.log(sendee)
      $.get('https://www.omdbapi.com/?t='+sendee+'&y=&plot=short&r=json', function(omdb){
        var movieObj1 = new Movie(omdb.Title , omdb.Poster , omdb.imdbRating)
        if(!omdb.Title) {
          reset();
          return;
        }
        $(".leftChoice").append("<h1>"+omdb.Title+"</h1>");
        $(".leftChoice").append('<img class="choice1" src='+omdb.Poster+'>');
        var rating1 = omdb.imdbRating;
          //*******
        var movie2 = data.results.collection1[$randNum()].property1.text;
        var sendee2 = movie2.replace(/\s/g,"+");
        $.get('https://www.omdbapi.com/?t='+sendee2+'&y=&plot=short&r=json', function(omdb){
          var movieObj2 = new Movie(omdb.Title , omdb.Poster , omdb.imdbRating)
          if(!omdb.Title) {
            reset();
            return;
          }
          $(".rightChoice").append("<h1>"+omdb.Title+"</h1>");
          $(".rightChoice").append('<img class ="choice2" src='+omdb.Poster+'>')
          var rating2 = omdb.imdbRating;
          if(rating1 === rating2){
            reset();
          }
          else if(rating1>rating2){
            movieObj1.win = true;
            movies.push(movieObj1,movieObj2);
            $correct = 1;
          }else {
            $correct = 2;
            movieObj2.win = true;
            movies.push(movieObj1,movieObj2);
          }
          //console.log($correct);
          //****************************
          var userChoice = 0;
          clickChoice(movieObj1,movieObj2);

        })

      })
  })
}

function clickChoice(mov1, mov2){
var userChoice = 0;
  $('.choice1').click(function(){
    userChoice = 1;
    if(userChoice == $correct){
      $score +=1;
    }
    mov1.userCorrect = true;
    $choiceCount += 1;
    if($choiceCount == 5){                   //When a game is finished
      displayResults()
    }else reset();
  })
  $('.choice2').click(function(){
    userChoice = 2;
    if(userChoice == $correct){
      $score +=1;
    }
    mov2.userCorrect = true;
    $choiceCount += 1;
    if($choiceCount == 5){                   //When a game is finished
      displayResults()
    }else  reset();
  })
}

function reset(){

  //console.log($score);
  //console.log(movies);
  $('.leftChoice').empty();
  $('.rightChoice').empty();
  run();
}
function displayResults(){
  $(".resultBox").css('display','block');
  $(".overlay").css('display','block');
  $(".resultHeader").prepend("<h1>You're Score is "+$score+"/5</h1>")
  fillResults();
  //alert('your score is '+$score+'/5')
  storeScore();
  $score = 0;
  $choiceCount = 0;
}

var $randNum =function(){
  return Math.floor(Math.random()*1000);
}


var closeSubmitBox = function(){
  $(".overlay").css("display","none");
  $(".inputBox").css("display", "none");
  currentUser = $(".userName").val().toLowerCase();
  if($.inArray(currentUser, userList) === -1){
    var newObj = {
    'user' : currentUser,
    'history' : []
    }
    localStorage.setItem(currentUser, JSON.stringify(newObj))
  }
  run();
}

$(".submit").click(function(){
  closeSubmitBox();
})
$(".userName").keyup(function(e){
  if(e.keyCode === 13){
    closeSubmitBox();
  }
})
$(".return").click(function(){
  $(".overlay").css("display","none");
  $(".resultBox").css('display','none');
  $(".resultHeader, .resultBody").empty();
  movies = [];
  reset();
})


function storeScore(){                                     //Stores user scores
  var userObj = JSON.parse(localStorage.getItem(currentUser))
  userObj.history.push($score)
  localStorage.setItem(currentUser, JSON.stringify(userObj))
}

var Movie = function(titleg, posterg, ratingg){
  this.title = titleg;
  this.poster = posterg;
  this.rating = ratingg;
  this.win = false;
  this.userCorrect = false;
}



var fillResults = function(){
  for (var i = 0; i < movies.length; i++) {
    $('.resultBody').append('<div class = "mov'+i+'">'+movies[i].title+'</div>');
    if(movies[i].userCorrect && movies[i].win ){
      $('.mov'+i.toString()).css('background-color', '#00cc66');
    }else if (movies[i].userCorrect) {
      $('.mov'+i.toString()).css('background-color', '#ff3333');
    }
  }
}
