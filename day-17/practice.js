let max=prompt("Enter a max number");
let rand=Math.floor(Math.random()*max)+1;
console.log(`The random number was ${rand}`);
let guess=prompt("Guess the number");
console.log(`You entered ${guess}`);
console.log(`You entered ${max}`);

while(true){

    if (guess=="quit"){
        console.log("You quit the game");
        break;
    }
    if (guess==rand){
        console.log("You guessed it right");
        break;
    }
    guess=prompt("Guess again");
    // console.log(rand);
    if (guess>rand){
        console.log("Greater");
    }else{
        console.log("Smaller");
    }
    
}