console.log("sanity check");




$.get('kimonoData.json', function(data){

    var movie = data.results.collection1[$randNum()].property1.text;
    var sendee = movie.replace(/\s/g,"+");
    $.get('http://www.omdbapi.com/?t='+sendee+'&y=&plot=short&r=json', function(omdb){
      $(".container").append(omdb.Title);
      $(".container").append('<img class="choice1" src='+omdb.Poster+'>')
      console.log(omdb)
      var rating1 = omdb.imdbRating;
        //*******
      var movie2 = data.results.collection1[$randNum()].property1.text;
      var sendee2 = movie2.replace(/\s/g,"+");
      $.get('http://www.omdbapi.com/?t='+sendee2+'&y=&plot=short&r=json', function(omdb){
        $(".container").append(omdb.Title);
        $(".container").append('<img class ="choice2" src='+omdb.Poster+'>')
        var rating2 = omdb.imdbRating;
        var correct = 0;
        if(rating1>rating2){
        correct = 1;
        }else correct = 2;
      })
    })
})

// var userChoice = 0;
// $('.choice1').click(function(){
//   userChoice = 1;
//   console.log('choice 1')
// })
// $('.choice2').click(function(){
//   userChoice = 2;
//   console.log('choice 2')
// })



var $randNum =function(){
  return Math.floor(Math.random()*1000);
}
