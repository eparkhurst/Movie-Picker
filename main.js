console.log("sanity check");

var $score =0;
var $correct = 0;
var $choiceCount = 0;
var currentUser = "";
var userList = [];
var Movies = [];

for ( var i = 0, len = localStorage.length; i < len; ++i ) {
  userList.push( JSON.parse(localStorage.getItem( localStorage.key( i ) )).user );
}



run();
function run(){
  $.get('kimonoData.json', function(data){
      var movie = data.results.collection1[$randNum()].property1.text;
      var sendee = movie.replace(/\s/g,"+");
      $.get('http://www.omdbapi.com/?t='+sendee+'&y=&plot=short&r=json', function(omdb){
        $(".leftChoice").append("<h1>"+omdb.Title+"</h1>");
        $(".leftChoice").append('<img class="choice1" src='+omdb.Poster+'>')
        //console.log(omdb)
        var rating1 = omdb.imdbRating;
      //  console.log("1 is "+rating1);
          //*******
        var movie2 = data.results.collection1[$randNum()].property1.text;
        var sendee2 = movie2.replace(/\s/g,"+");
        $.get('http://www.omdbapi.com/?t='+sendee2+'&y=&plot=short&r=json', function(omdb){
          $(".rightChoice").append("<h1>"+omdb.Title+"</h1>");
          $(".rightChoice").append('<img class ="choice2" src='+omdb.Poster+'>')
          var rating2 = omdb.imdbRating;
        //  console.log('2 is '+rating2);
          if(rating1 === rating2){
            $choiceCount -=1;
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
  if($choiceCount == 1){                   //When a game is finished
    $(".resultBox").css('display','block');
    $(".overlay").css('display','block');
    $(".resultBox").append("<h1>You're Score is "+$score+"/10</h1>")
    storeScore();
    $score = 0;
    $choiceCount = 0;
  }
  //console.log($score);
  $('.leftChoice').empty();
  $('.rightChoice').empty();
  run();
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
}

$(".submit").click(function(){
  closeSubmitBox();
})
$(".userName").keyup(function(e){
  if(e.keyCode === 13){
    closeSubmitBox();
  }
})
$(".result").click(function(){
  $(".resultBox").css('display','none');
  $(".overlay").css('display','none');
})


function storeScore(){                                     //Stores user scores
  var userObj = JSON.parse(localStorage.getItem(currentUser))
  userObj.history.push($score)
  localStorage.setItem(currentUser, JSON.stringify(userObj))
}

var Movie = function(){
  title:"",
  poster:"",
  rating:'',
  win:false
}
