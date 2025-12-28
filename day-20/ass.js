// let arr=[1,2,3,4,5];
// let newArr=arr.map(function(el){
//   return el+5;
// });
// console.log(newArr);

// let arr=[1,2,3,4,5];
// let newArr=arr.map((el)=>el*el);
// console.log(newArr);
// let summed=newArr.reduce((sum,el)=>sum=sum+el);
// console.log(summed);
// let average=summed/arr.length;
// console.log(average);

// let arr=["apple", "banana", "cherry"];
// console.log(arr.map((el)=>el.toUpperCase()));

// function doubleAndReturnArgs(arr,...args) {
//   return [...arr, ...args.map((el)=>el*2)];
// }
// console.log(doubleAndReturnArgs([1,2,3],4,5));

function mergeObjects(obj1,obj2){
  return {...obj1,...obj2};
}
let obj1={a:1,b:2};
let obj2={c:3,d:4};
console.log(mergeObjects(obj1,obj2));