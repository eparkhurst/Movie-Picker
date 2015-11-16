console.log("sanity check");




$.get('kimonoData.json', function(data){
  var $rating1 =1
  var $rating2 =1
  for (var i = 0; i < 2; i++) {
    var movie = data.results.collection1[$randNum()].property1.text;
    var sendee = movie.replace(/\s/g,"+");
    $.get('http://www.omdbapi.com/?t='+sendee+'&y=&plot=short&r=json', function(omdb){
      if(i === 0){
        $rating1 = omdb.imdbRating;
        console.log($rating1)
      }else{
        $rating2 = omdb.imdbRating;
        console.log($rating2)
      }
      $(".container").append(omdb.Title);
      $(".container").append('<img src='+omdb.Poster+'>')
    })
  }
  console.log($rating1+" , "+$rating2 );
  if($rating1 > $rating2){
    console.log('1wins')
  }else console.log('2wins')
})

var $randNum =function(){
  return Math.floor(Math.random()*1000);
}
