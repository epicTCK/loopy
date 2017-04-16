var circle;
var tempVar;
var whileBool = true;
var forCounter = 0;
var commands = new Map();
var inputs;

function popToTemp() {
    tempVar = circle.pop();
}

function pushTemp() {
    circle.push(tempVar);
}

function pop() {
    circle.pop();
}

function popPrint() {
    console.log(circle.pop());
}

function print() {
    console.log(circle.peek());
}

function peekToTemp() {
    tempVar = circle.peek();
}

function rotate() {
    circle.rotate();
}

function rotate2() {
    circle.rotate2();
}

function add() {
    circle.push(circle.pop() + tempVar);
}

function subtract() {
    if (typeof Number(circle.peek()) !== "number" &&
        typeof Number(tempVar) !== "number")
        throw "attempted to preform subtraction on non-numbers";
    circle.push(circle.pop() - tempVar); //TODO: try this program: @^#@{-,} it gives wierd results
}

function multiply() {
    if (typeof Number(circle.peek()) !== "number" &&
        typeof Number(tempVar) !== "number")
        throw "attempted to preform multiplication on non-numbers";
    circle.push(circle.pop() * tempVar);
}

function divide() {
    if (typeof Number(circle.peek()) !== "number" &&
        typeof Number(tempVar) !== "number")
        throw "attempted to preform division on non-numbers";
    circle.push(circle.pop() / tempVar);
}

function toggleWhile() {
    whileBool = !whileBool;
}

function setForCounter() {
    forCounter = tempVar;
}

function pushForLoopCounter() {
    circle.push(forCounter);
}
commands.set("^", popToTemp);
commands.set("_", pushTemp);
commands.set("!", pop);
commands.set(".", popPrint);
commands.set(",", print);
commands.set(":", peekToTemp);
commands.set(">", rotate);
commands.set("+", add);
commands.set("-", subtract);
commands.set("*", multiply);
commands.set("/", divide);
commands.set("<", rotate2);
commands.set("&", toggleWhile);
commands.set("#", setForCounter);
commands.set("~", pushForLoopCounter);

function run(source, input) {
    circle = input ? Circle.from(input) : new Circle();
    interpret(source);
}

function interpret(source) {
    let sourceSplit = source.split("");
    while (sourceSplit.length > 0) {
        //While loops
        if (sourceSplit[0] === "[") {
            var x = sourceSplit.splice(0, sourceSplit.indexOf("]") + 1);
            x.shift();
            x.pop();
            while (whileBool) {
                interpret(x.join(""));
            }
            continue;
        }
        //For loops
        if (sourceSplit[0] === "{") {
            var x = sourceSplit.splice(0, sourceSplit.indexOf("}") + 1);
            x.shift();
            x.pop();
            for (; forCounter > 0; forCounter--) {
                interpret(x.join(""));
            }
            continue;
        }
        if (sourceSplit[0] === "(") {
            var x = sourceSplit.splice(0, sourceSplit.indexOf(")") + 1);
            x.shift();
            x.pop();
            if (circle.peek() === tempVar) {
                interpret(x.join(""));
            }
            continue;
        }
        //String literals
        if (sourceSplit[0] === "\"") {
            var x = sourceSplit.splice(0, sourceSplit.indexOf("\'") + 1);
            x.shift();
            x.pop();
            circle.push(x.join(""));
            continue;
        }
        //Int literals
        if (sourceSplit[0].match(/[0-9]/)) {
            let currentInt = sourceSplit.shift();
            while (sourceSplit.length > 0) {
                if (sourceSplit[0].match(/[0-9]/)) {
                    currentInt += sourceSplit.shift();
                } else {
                    break;
                }
            }
            circle.push(parseInt(currentInt));
            continue;
        }
        //Normal execution
        commands.get(sourceSplit.shift())();
    }
}