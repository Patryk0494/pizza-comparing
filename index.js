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
        creatInput();
    } else {
        creatInput();
    }

})

function creatInput(){
    const newInput = document.createElement("div");
    newInput.id = `inputs-${index}`;
    newInput.classList = `inputs`;
    newInput.innerHTML = `
        <span>${index+1}.<span>
        <input type="number" id="diameter-${index}" class="diameter" placeholder="diameter">
        <input type="number" id="price-${index}" class="price" placeholder="price">
        `;
    index++;
    inpBox.appendChild(newInput);
}

let pizzaArr = [];
let pizzaArrSorted;

count.addEventListener("click", function() {
    
    if (pizzaArr.length > 0) {
        for (let i = pizzaArr.length; i < index; i++){
            sorting(i);
        }
    } else {
        for (let i = 0; i < index; i++) {
            sorting(i);
    }}
    

    function sorting(i){
        const diameterElem = document.getElementById(`diameter-${i}`);
        const priceElem = document.getElementById(`price-${i}`);

        const diameter = diameterElem.value
        const radius = (diameter)/2;
        const price = priceElem.value;
        const ordinal = i+1;
        let calculate = price/(Math.PI * (radius ** 2));

        const pizza = {
            index: ordinal,
            price: price,
            uPrice: calculate,
            diameter: diameter
        }

        pizzaArr.push(pizza);

        pizzaArrSorted = pizzaArr.sort(function compare(a, b) {
            return a.uPrice -  b.uPrice;
        });
    }

    console.log(pizzaArrSorted);
    
    pizzaArrSorted.forEach(function(elem, index){
        const sortedInput = document.getElementById(`inputs-${index}`)
        sortedInput.classList= 'rotate inputs';
        setTimeout (function(){
            sortedInput.innerHTML = `
            <span>${elem.index}.</span>
            <input type="number" id="diameter-${elem.index}" value="${elem.diameter}" class="diameter" placeholder="diameter">
            <input type="number" id="price-${elem.index}" value="${elem.price}" class="price" placeholder="price">
            <p class="unityPrice">${elem.uPrice.toFixed(3)*10} zł/10cm${"2".sup()}</p>
            `;
        }, 300
        );
        
    });
    // index = 1;
    // pizzaArr = [];
})

function delInp() {
    inpBox.innerHTML= "";
    index = 0;
    creatInput();
    pizzaArr = [];
}

erase.addEventListener("click", delInp);

