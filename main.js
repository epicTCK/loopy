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
    circle.push(circle.pop() + tempVar) ک
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
commands.set("^", popToTemp);
commands.set("_", pushTemp);
commands.set("!", pop);
commands.set(".", popPrint);
commands.set(",", print);
commands.set(":", peekToTmp);
commands.set(">", rotate);
commands.set("+", add);
commands.set("-", subtract);
commands.set("*", multiply);
commands.set("/", divide);
commands.set("<", rotate2);
commands.set("&", toggleWhile);
commands.set("#", setForCounter);

function run(source, input) {
    circle = input ? Circle.from(input) : new Circle();
    interpret(source);
}

function interpret(source) {
    let sourceSplit = source.split("");
    for (let i = 0; i < sourceSplit.length; i++) {
        //While loops
        if (sourceSplit[i] === "[") {
            var x = sourceSplit.splice(sourceSplit.indexOf("["), sourceSplit.indexOf("]") - sourceSplit.indexOf("[") + 1);
            x.shift();
            x.pop();
            while (whileBool) {
                for (let char2 of x) {
                    commands.get(char2)();
                }
            }
        }
        //For loops
        if (sourceSplit[i] === "{") {
            var x = sourceSplit.splice(sourceSplit.indexOf("{"), sourceSplit.indexOf("}") - sourceSplit.indexOf("{") + 1);
            x.shift();
            x.pop();
            for (; forCounter > 0; forCounter--) {
                for (let char2 of x) {
                    commands.get(char2)();
                }
            }
        }
        if (sourceSplit[i] === "(") {
            var x = sourceSplit.splice(sourceSplit.indexOf("("), sourceSplit.indexOf(")") - sourceSplit.indexOf("(") + 1);
            x.shift();
            x.pop();
            if (circle.peek() === tempVar) {
                interpret(x.join(""));
            }
        }
        //String literals
        if (sourceSplit[i] === "\"") {
            var x = sourceSplit.splice(sourceSplit.indexOf("\""), sourceSplit.indexOf("\'") - sourceSplit.indexOf("\"") + 1);
            x.shift();
            x.pop();
            circle.push(x.join(""));
        }
        //Int literals
        if (sourceSplit[i].match(/[0-9]/)) {
            for (let j = 0;; j++) {
                if (!sourceSplit[i + j].match(/[0-9]/)) {
                    circle.push(Number(sourceSplit.splice(i, j - 1).join("")));
                    break;
                }
            }
            continue;
        }

        //Normal execution

        commands.get(sourceSplit[i])();

    }

}