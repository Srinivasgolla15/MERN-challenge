// function one(){
//     return 1;

// }

// function two(){
//     return one()+one();
// }

// function three(){
//     let ans=two()+one();
//     console.log(ans);
// }

// three();

let h1=document.querySelector("h1");
function colorChange(color,delay){
    setTimeout(()=>{
        h1.style.color=color;
    },delay)
}

colorChange(red,1000)
    .then((result)=>{
        return colorChange(green,1000);
    })
    .then((result)=>{return colorChange(blue,1000);})
    .catch