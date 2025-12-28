//  let i= [10,20,30,40].every(el=>
//     el%10==0);
//     console.log(i); // true

let i=[10,20,30,40].reduce((Min,el)=>{
    if(el<Min){
        return el;

    }else{
        return Min;
    };
});
console.log(i); // 10