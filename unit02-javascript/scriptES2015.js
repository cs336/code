/**
 * This set of scripts upgrades the examples given in scripts.js as follows:
 *   - It uses strict mode.
 *   - It upgrades to ES 2015, including =>, let, and class.
 *
 * @author kvlinden
 * @version summer2016
 */

// 1. ----------------------------------
// Strict mode
"use strict";
let test;
test = 42;
test = "forty-two";
test = true;
console.log(test);

// 2. ----------------------------------
// no changes here...

// 3. ----------------------------------
// Using call() and apply()
function greetMe(names) {
    for (let name of names) {
        console.log("Hello, " + name + "!");
    }
}
let greetMe2 = function(names) {
    for (let name of names) {
        console.log("Hello, " + name + "!");
    }
}
greetMe2.apply(null, [["world", "galaxy", "universe"]]);
greetMe2.call(null, ["world", "galaxy", "universe"]);


// 4. ----------------------------------
// no changes here...

// 5. ----------------------------------
// => function definition notation
let myList = [1,2,3].map(x => x*2);
console.log(myList);

// 6. ----------------------------------
// no changes here...

// 7. ----------------------------------
// no changes here...

// 8. ----------------------------------
// Encapsulation
class Shape {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    move(newX, newY) {
        this.x = newX;
        this.y = newY;
    }
}
let s1 = new Shape(0, 0);
console.log(s1);
let s2 = new Shape(1, 2);
s2.move(2, 3);
console.log(s2);

// 9. ----------------------------------
// Inheritance
class Rectangle extends Shape {
    constructor(x, y, width, height) {
        super(x, y);
        this.width = width;
        this.height = height;
    }
    area() {
        return this.width * this.height;
    }
}
let r1 = new Rectangle(1, 2, 1, 1);
console.log(r1);
console.log(r1.area());
r1.move(2, 3);
console.log(r1);

// 10. ----------------------------------
// Polymorphism
class Circle extends Shape {
    constructor(x, y, radius) {
        super(x, y);
        this.radius = radius;
    }
    area() {
	return Math.PI * this.radius * this.radius;
    }
}
let c1 = new Circle(1, 2, 1);
console.log(c1.area());
