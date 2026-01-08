// function CharacterData(str){
//     let str1=""
//     for(let i=0;i<str.length;i++){
//         if (!str1.includes(str[i])){
//             str1+=str[i];
//         }
//     }
//     console.log(str1);
// }

// CharacterData("abcdabcdefgggh");


// function longest(arr){
//     max=arr[0];
//     for(let i=0;i<arr.length;i++){
//         if(arr[i].length>arr[0].length){
//             max=arr[i];
//         }
//     }
//     console.log(max)   ;
// }

// country=["Australia","Germany","UnitedStatesofAmerica"];
// longest(country);

// function vowels(str){
//     let str1="aeiouAEIOU";
//     let count=0;
//     for(let i=0;i<str.length;i++){
//         if (str1.includes(str[i])){
//             count++;
//         }
//     }
//     console.log(count);
// }

// vowels("aeiou");

function randnum(start,end){
    let num=Math.floor(Math.random()*(end-start+1))+start;
    console.log(num);
}
randnum(5,15);