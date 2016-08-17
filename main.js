var circle = new Circle();
var tempVar;
var commands = new Map();
commands.set("^", popToTemp);
commands.set("_", pushTemp);
commands.set("!", pop);
commands.set("?", input);
commands.set(".", popPrint);
commands.set(",", print);
commands.set(":", peekToTemp);
commands.set(">", rotate);
commands.set("+", add);
commands.set("-", subtract);
commands.set("*", multiply);
commands.set("/", divide);


function interpret(source){
    for(let char of source.split``){
        commands.get(char)();
    }
}
function popToTemp(){
    tempVar = circle.pop();
}
function pushTemp(){
    circle.push(tempVar);
}
function pop(){
    circle.pop();
}
function input(){
    circle.push(prompt());//TODO: prompt is not the best way to get input, what other way?
}
function popPrint(){
    console.log(circle.pop());
}
function print(){
    console.log(circle.peek());
}
function peekToTemp(){
    tempVar = circle.peek();
}
function rotate(){
    circle.rotate();
}
function add(){
    circle.push(circle.pop() + tempVar);
}
//TODO: check type and add error handling
function subtract(){
    circle.push(circle.pop() - tempVar);
}
function multiply(){
    circle.push(circle.pop() * tempVar);
}
function divide(){
    circle.push(circle.pop() / tempVar);
}