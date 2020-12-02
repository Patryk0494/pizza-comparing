const add = document.getElementById("add");
const inpBox = document.getElementById("inputs-box");
const outpBox = document.getElementById("outputs-box");
const count = document.getElementById("count");
const erase = document.getElementById("erase")
const newContainer = document.createElement("div");
 
let index = 1;

add.addEventListener("click", function() {
    const outputs = document.getElementsByClassName("outputs");
    if (outputs.length>0) {
        delOutp();
        const newInput = document.createElement("div");
        newInput.id = `inputs-${index}`;
        newInput.innerHTML = `
            <span>${index+1}.<span>
            <input type="number" id="diameter-${index}" class="diameter" placeholder="diameter">
            <input type="number" id="price-${index}" class="price" placeholder="price">
            `;
        index++;
        inpBox.appendChild(newInput);
    } else {
        const newInput = document.createElement("div");
        newInput.id = `inputs-${index}`;
        newInput.innerHTML = `
            <span>${index+1}.<span>
            <input type="number" id="diameter-${index}" class="diameter" placeholder="diameter">
            <input type="number" id="price-${index}" class="price" placeholder="price">
            `;
        index++;
        inpBox.appendChild(newInput);
    }
})

let pizzaArr = [];

count.addEventListener("click", function() {
    let pizzaArrSorted;

    for (let i = 0; i < index; i++) {
        const diameterElem = document.getElementById(`diameter-${i}`);
        const priceElem = document.getElementById(`price-${i}`);

        const radius = (diameterElem.value)/2;
        const price = priceElem.value;
        const ordinal = i+1;
        let calculate = price/(Math.PI * (radius ** 2));

        const pizza = {
            index: ordinal,
            uPrice: calculate
        }

        pizzaArr.push(pizza);

        pizzaArrSorted = pizzaArr.sort(function compare(a, b) {
            return a.uPrice -  b.uPrice;
        });
    }
    
    pizzaArrSorted.forEach(function(elem){
        const newContainer = document.createElement("div");
        newContainer.classList = "outputs"
        newContainer.innerHTML = `<p>${elem.index}. ${elem.uPrice.toFixed(3)*10} zł/10cm${"2".sup()}</p>` 
        outpBox.appendChild(newContainer);
        console.log()
        for (let i = 1; i < index; i++) {
            const inputToDelete = document.getElementById(`inputs-${i}`);
            inputToDelete?.remove();
        }
    });
    index = 1;
    pizzaArr = [];
})

function delOutp() {
    outpBox.innerHTML = ``;
    index = 1;
    pizzaArr = [];
}

erase.addEventListener("click", delOutp);

