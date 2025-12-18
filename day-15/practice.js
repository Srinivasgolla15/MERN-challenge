//  let msg="help!";
//  console.log(msg.toUpperCase().trim());

//  let name="ApnaCollege";
//  console.log(name.slice(4,9));
//  console.log(name.indexOf("na"))
//  console.log(name.replace("Apna","Our"))
// console.log(name.replace("l","t"))
// console.log(name.slice(4).replace("l","t").replace("l","t"))


let arr=[['X',null,'O'],[null,'X',null],['O',null,'X']]
arr[0][1]='O'
console.log(arr)

let start=['jan','jul','mar','aug'];
start.shift();
start.splice(1,0,'jun');
console.log(start);