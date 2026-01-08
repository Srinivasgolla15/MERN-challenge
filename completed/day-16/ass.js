// let arr=[1,2,3,4,5,6,2,3];
// let arr=[ 2,1,2,2,3];
// let num=2;
// for(let i=0;i<arr.length;i++){
//     if (arr[i]===num){
//         arr.splice(i,1);
//         console.log("removed",arr[i]);
//     }
// }
// console.log(arr);


// let arr=[ 2,1,2,2,3];
// let num=2;
// for(let i=arr.length-1;i>=0;i--){
//     if (arr[i]===num){
//         arr.splice(i,1);
//         console.log("removed",arr[i]);
//     }
// }
// console.log(arr);

// let num=287152;
// count=0;

// // temp=num;
// while(num>0){
//     console.log(num%10);
//     num = Math.floor(num / 10);
//     count++;
// }
// console.log(count);

// let num=287152;
// sum=0;
// while (num>0){
//     console.log(num%10);
//     sum+=num%10;
//     num = Math.floor(num / 10);
// }
// console.log(sum);

// let n=7;
// fact=1;
// for (let i=1; i<=n;i++){
//     fact=i*fact;
//     console.log(fact);

// }
// console.log(fact);

let arr=[1,2,3,4,5,6,2,3,-1,-4];
max=arr[0];
for (let i=1;i<arr.length;i++){
    console.log("arr[i]",arr[i]);
    if(arr[i]>max){
        max=arr[i];
    }
    console.log("max",max);

}
console.log("max",max);
