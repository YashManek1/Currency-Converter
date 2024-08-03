const URL =
  "https://api.currencyapi.com/v3/latest?apikey=cur_live_PBnFt0RfNSec3dQ2YMViMUJiGsOILnDBLMHviGdB";

const dropdowns = document.querySelectorAll(".dropdown-menu select");
let btn = document.querySelector("#submit");
let fromCurr = document.querySelector(".from select");
let toCurr = document.querySelector(".to select");
let msg = document.querySelector(".msg-container");

for (let select of dropdowns) {
  for (Currcode in countryList) {
    let newOpt = document.createElement("option");
    newOpt.innerText = Currcode;
    newOpt.value = Currcode;
    select.append(newOpt);
    if (select.name == "from" && Currcode == "USD") {
      newOpt.selected = "selected";
    } else if (select.name == "To" && Currcode == "INR") {
      newOpt.selected = "selected";
    }
  }
  select.addEventListener("change", (evt) => {
    UpdateFlag(evt.target);
  });
}

const UpdateFlag = (element) => {
  let Currcode = element.value;
  let CountryCode = countryList[Currcode];
  let image = element.parentElement.querySelector("img");
  image.src = `https://flagsapi.com/${CountryCode}/flat/64.png`;
};

btn.addEventListener("click", async (evt) => {
  evt.preventDefault();
  let amount = document.querySelector(".input input");
  let amtVal = amount.value;
  if (amtVal == "" || amtVal < 1) {
    amount.value = 1;
    amtVal = 1;
  }
  let fromVal = fromCurr.value;
  let toVal = toCurr.value;
  let response = await fetch(URL);
  let logs = await response.json();
  let fromRate = logs.data[fromVal].value;
  let toRate = logs.data[toVal].value;
  let ans = (amtVal * toRate) / fromRate;
  msg.innerText = `${amtVal} ${fromVal} = ${ans} ${toVal}`;
});
