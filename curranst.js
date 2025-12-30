const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdownsle = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("button");
const fromcurrn = document.querySelector(".from select");
const tocurrn = document.querySelector(".to select");
const msg = document.querySelector(".msg");
const exchange = document.querySelector("i");
for(let select of dropdownsle){
    for(currcode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currcode;
        newOption.value = currcode;
        if(select.name === "from" && currcode === "USD"){
            newOption.selected = "selected";
        }
        else if(select.name === "to" && currcode === "INR"){
            newOption.selected = "selected";//by defolt select value
        }
        select.append(newOption);
    }
    select.addEventListener("change" , (evt)=>{
        changFlage(evt.target);
    })
};

const changFlage = (element) =>{
    let currcode = element.value;
    let contryCode = countryList[currcode];
    let newScr = `https://flagsapi.com/${contryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newScr;

};

btn.addEventListener("click",async (evt)=>{
    evt.preventDefault();//automatic kam nahi hoga sirf user hi kam karva payenge
    let amount = document.querySelector("input");
    let amtval = amount.value;
    // console.log(amtval);
    if(amtval === "" || amtval<1){
        amtval = 1;
        amtval.value = "1"; 
    }
    // console.log(fromcurrn.value.toLowerCase() , tocurrn.value);
    const URL = `${BASE_URL}/${fromcurrn.value.toLowerCase()}.json`;
    let respons = await fetch(URL);
    let data = await respons.json();
    // 1. Get the 'from' currency key (e.g., "usd")
    let fromCurrency = fromcurrn.value.toLowerCase();

// 2. Get the 'to' currency key (e.g., "inr")
    let toCurrency = tocurrn.value.toLowerCase();

// 3. Access the data: data["usd"]["inr"]
    let Rate = data[fromCurrency][toCurrency];

     // This will print the number (e.g., 83.12)
    
    let finalamount = amtval * Rate;//here amount is user input value
    console.log(amtval);
    console.log(finalamount);
    
    msg.innerText = `${amtval}${fromcurrn.value} = ${finalamount}${tocurrn.value}`;
});
let temp = 0;
exchange.addEventListener("click", () => {
    // 1. Swap the values (the text inside the dropdowns)
    let tempCode = fromcurrn.value;
    fromcurrn.value = tocurrn.value;
    tocurrn.value = tempCode;

    // 2. Update the flags (since the values changed, flags must change too)
    changFlage(fromcurrn);
    changFlage(tocurrn);
    
    // 3. (Optional) Refresh the result immediately
    // btn.click(); // Uncomment this if you want the rate to update instantly
});


