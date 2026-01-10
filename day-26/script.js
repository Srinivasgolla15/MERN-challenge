
let url="https://catfact.ninja/fact";
let btn = document.querySelector("button");
let h1= document.querySelector("h1");



btn.addEventListener("click",async ()=>{
    let facts=await fetchurl();
    console.log(facts);
    h1.innerText=facts;
});
 

async function fetchurl() {
    try{
     let res = await axios.get(url);
     return res.data.fact;
    }
    catch (e){
        console.log(e)
        return "ERRORR"
    }
}



