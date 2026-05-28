"use strict"
const prompt = require('prompt-sync')({sigint:true});

// User input 5 products and store them in a set. Make sure if user re-enters the product it should not be added to Set. 
const products = new Set();

console.log("Enter 5 unique products.");
let item;
while(products.size < 5) {
    item = prompt(`Item ${products.size + 1}: `);
    if (products.has(item)) console.log('This product already exists');
    else products.add(item.toLowerCase());
}

console.clear();


// Use a loop to display every product and ask user to enter the price for it. Store the product and price in a Map.
console.log('Please enter the price for each product (a positive number).');

const inventory = new Map();
let price;

for(const i of products) {
    do {
        price = Number(prompt(`Price for ${i}: `)); 
    } while(Number.isNaN(price) || price < 0 );

    inventory.set(i, price);
}

// Design a menu to display all product names and price from the map
// Once product is selected – ask for the quantity
// Then calculate the total cost of the product.
// Check if the user wants to proceed to purchase again or to check out.
// If purchase is selected repeat task 2
let input ='';
let quantity;
const shoppingCart = new Map(); // (Key: product)  (Value: Number of bought items)

while(true) {
    console.clear();
    console.log('---------- Enter the product you want to buy ----------');
    for(const i of inventory.keys()) {
        console.log(`Item: ${i}\t\tPrice: ${inventory.get(i)}`);
    }
    input = prompt('Enter item ("quit" to finish): ').toLowerCase();
    

    if (input === 'quit') {
        console.clear();
        break;
    }
    else if (inventory.has(input)) {
        quantity = Number(prompt(`How many ${input} do you want?: `));
        while(Number.isNaN(quantity) || quantity < 0) {
            quantity = Number(prompt(`Please enter a non negative number!: `));
        }

        if(shoppingCart.has(input)) {
            let originalValue = shoppingCart.get(input);
            shoppingCart.set(input, originalValue + quantity);
        }
        else {
            shoppingCart.set(input, quantity);
        }

        console.log(`You have ordered ${shoppingCart.get(input)} of ${input}. Total cost: ${shoppingCart.get(input) * inventory.get(input)}`);
        input = prompt('Press any key to continue');
    }
    else {
        input = prompt('Product not found. Press any key');
    }

}


// If the checkout option is selected display the total price of all purchases.
let totalPrice = 0;
console.log('---------- Your purchases ----------')
for (const i of shoppingCart.keys()) {
    console.log(`${i} x ${shoppingCart.get(i)} = ${shoppingCart.get(i) * inventory.get(i)}`);
    totalPrice += shoppingCart.get(i) * inventory.get(i);
}
console.log(`\nTotal price: ${totalPrice}`);


// Ask user to enter the price to pay.
input = Number(prompt('How much will you pay?: '));
while(Number.isNaN(input) || input < totalPrice) {
    console.log('That is not a valid payment!');
    input = Number(prompt('How much will you pay?: '));
}

// In case the user has paid more than the total purchase price then display the return amount.
// ### Optional: display the return cost in following format based on the return price
// 1000  X  number of bills/coins (1, 2 or more)  
// 500 X number of bills/coins  
// 200 X number of bills/coins  
// 100 X number of bills/coins  
// 50 X number of bills/coins  
// 20 X number of bills/coins  
// 10 X number of bills/coins  
// 5 X number of bills/coins  
// 2 X number of bills/coins  
// 1 X number of bills/coins  

// For ex. Return amount is 3543   
// (2000  X  2 , 1000  X  1, 500  X  1, 20  X  2, 2 X 1, 1 X 1)
let change = input - totalPrice;
let output = '(';

if(change >= 1000) {
    output += `1000 x ${Math.floor(change / 1000)}, `;
    change %= 1000;
}

if(change >= 500) {
    output += `500 x ${Math.floor(change / 500)}, `;
    change %= 500;
}

if(change >= 200) {
    output += `200 x ${Math.floor(change / 200)}, `;
    change %= 200;
}

if(change >= 100) {
    output += `100 x ${Math.floor(change / 100)}, `;
    change %= 100;
}

if(change >= 50) {
    output += `50 x ${Math.floor(change / 50)}, `;
    change %= 50;
}

if(change >= 20) {
    output += `20 x ${Math.floor(change / 20)}, `;
    change %= 20;
}

if(change >= 10) {
    output += `10 x ${Math.floor(change / 10)}, `;
    change %= 10;
}

if(change >= 5) {
    output += `5 x ${Math.floor(change / 5)}, `;
    change %= 5;
}

if(change >= 2) {
    output += `2 x ${Math.floor(change / 2)}, `;
    change %= 2;
}

if(change >= 1) {
    output += `1 x ${change}, `;
}

output += ')';

console.log(`Your change is ${input - totalPrice} ${output}`);
input = prompt('Press any key');


// Display the most expensive product and the least expensive product from purchased products
if(shoppingCart.size === 0) {
    console.log('Shopping cart is empty. Can not calculate cheapest and most expensive object');
    input = prompt('Press any key');
}
else {
    let low = null;     // [Item, Price]
    let high = null;    // [Item, Price]

    for (const i of shoppingCart.keys()) {
        if ( low === null) {
            low = [i, inventory.get(i)]; 
            high = [i, inventory.get(i)]; 
        }
        else {
            if (inventory.get(i) > high[1]) high = [i, inventory.get(i)];  
            if (inventory.get(i) < low[1])  low = [i, inventory.get(i)];  
        }
    }

    console.log(`Most expensive product: ${high[0]}\tPrice: ${high[1]}`);
    console.log(`Least expensive product: ${low[0]}\tPrice: ${low[1]}`);
} 

console.clear();
console.log('\n\n');
