//  let msg="help!";
//  console.log(msg.toUpperCase().trim());

//  let name="ApnaCollege";
//  console.log(name.slice(4,9));
//  console.log(name.indexOf("na"))
//  console.log(name.replace("Apna","Our"))
// console.log(name.replace("l","t"))
// console.log(name.slice(4).replace("l","t").replace("l","t"))


// let arr=[['X',null,'O'],[null,'X',null],['O',null,'X']]
// arr[0][1]='O'
// console.log(arr)

// let start=['jan','jul','mar','aug'];
// start.shift();
// start.splice(1,0,'jun');
// console.log(start);

// let arr=[7,9,0,-2];
// let n=3;
// let arr1=[7,9,0,-2];
// console.log(arr.slice(0,n));
// console.log(arr.slice(-n));

// let ind=prompt();
// let str="hIgHer";
// if(str[ind]===str[ind].toLowerCase()){
//     console.log("yes");
// }else{
//     console.log("no");
// }

let arr=[1,2,3,4,5];
let num=3;
if (arr.indexOf(num)==-1){
    console.log("no");
}else{
    console.log("Yes");
}