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
let h2 = document.querySelector("h2");
function colorChange(color,delay){
    return new Promise ((resolve,reject)=>{
        setTimeout(()=>{
        h1.style.color=color;
        resolve( )
    },delay)
    });
    
}

colorChange("red",1000)
    .then((result)=>{
        return colorChange("green",1000);
    })
    .then((result)=>{return colorChange("blue",1000);})
    .catch((error)=>{
        console.log("error");
    })

// function h2color(color,delay){
//     return new Promise((resolve,reject)=>{
//         setInterval(()=>{
//             setTimeout(()=>{
//             h2.style.color=color;
//             resolve()
//         },delay)
//         })
//     })
// }

// h2color("green",1000)
//     .then((result)=>{
//         return h2color("blue",1000);
//     })
//     .then((result)=>{
//         return h2color("red",1000);
//     })
//     .catch((error)=>{
//         console.log(error)
//     })

// async function colors(col, delay) {
//     await new Promise(resolve =>
//         setTimeout(resolve, delay)
//     );
//     h2.style.color = col;
// }

// async function colors(col,delay){
//     setTimeout(()=>{
//         h2.style.color=col;
//     },delay)
// }


// async function demo() {
//     await colors("red", 1000);
//     await colors("blue", 1000);
//     await colors("green", 1000);
//     await colors("red", 1000);
// }

// demo();

let url="https://catfact.ninja/fact";

// fetch(url)
//     .then((res)=>{
//         console.log(res);
//         return res.json()
//     })
//     .then((data)=>{
//         console.log(data.fact);
//         return fetch(url)
//     })
//     .then((res)=>{
//         console.log(res);
//         return res.json()
//     })
//     .then((data1)=>{
//         console.log(data1.fact);
         
//     })
//     .catch((err)=>{
//         console.log(err)
//     })

async function fetchurl() {
    try{
    let res1=await fetch(url);
    let data1=await res1.json()
    console.log(data1.fact)

    let res2=await fetch(url);
    let data2=await res2.json()
    console.log(data2.fact)
    }
    catch (e){
        console.log(e)
    }
}



