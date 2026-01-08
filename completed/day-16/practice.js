let fav="Hi Nanna";
let inp=prompt("Guess the movie:");
while((inp!=fav)&&(inp!="null")){
    alert("Wrong Guess");
    inp=prompt("Guess again:");
}
alert("Correct Guess");
