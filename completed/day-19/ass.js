// arrayAverage=(arr) =>{
//     let sum=0;
//     for (let i=0;i<arr.length;i++){
//         sum+=arr[i];
//     }
//     let avg=sum/arr.length;
//     return avg;
// }

// let avg=arrayAverage([2,3,4,5]);
// console.log(avg);


// let num=4;
// const isEven=(num)=>num%2==0;
// console.log(isEven(num));

// const object = {
//   message: 'Hello, World!',

//   logMessage() {
//     console.log(this.message);
//   }
// };
// console.log(object.logMessage);

// setTimeout(object.logMessage(), 1000);

let length = 4;

function callback() {
  console.log(this.length);
}

const object = {
  length: 5,
  method(callback) {
    callback();
  },
};

object.method(callback, 1, 2);
